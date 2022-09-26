package main_project.udongs.study.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import main_project.udongs.apply.service.StudyApplyService;

import main_project.udongs.globaldto.MultiResponseDto;

import main_project.udongs.member.dto.MemberDto;
import main_project.udongs.member.entity.Member;
import main_project.udongs.member.service.MemberService;

import main_project.udongs.study.dto.SingleResponseStudyDto;

import main_project.udongs.oauth2.oauth.entity.UserPrincipal;

import main_project.udongs.study.dto.StudyCommentDto;
import main_project.udongs.study.dto.StudyDto;
import main_project.udongs.study.entity.Study;
import main_project.udongs.study.entity.StudyComment;
import main_project.udongs.study.mapper.StudyMapper;
import main_project.udongs.study.repository.StudyRepository;
import main_project.udongs.study.service.StudySearchService;
import main_project.udongs.study.service.StudyService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@Slf4j
@Tag(name = "STUDY", description = "스터디 관련 API")
@RequestMapping("/study")
@RequiredArgsConstructor
public class StudyController {

    private final StudyService studyService;
    private final StudyApplyService studyApplyService;
    private final StudyMapper mapper;
    private final MemberService memberService;
    private final StudyRepository studyRepository;
    private final StudySearchService studySearchService;

    @Operation(summary = "스터디 모집 등록")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "CREATED", content = @Content(array = @ArraySchema(schema = @Schema(implementation = StudyDto.Response.class))))})
    @PostMapping("/recruit")
    public ResponseEntity postStudy(@RequestBody StudyDto.Post requestBody, @AuthenticationPrincipal UserPrincipal userPrincipal) {
        log.debug("POST STUDY");
        //등록시 스터디장의 위치정보, 스터디장 id번호 반환
        Member member = userPrincipal.getMember();
        requestBody.setLatitude(member.getLatitude());
        requestBody.setLongitude(member.getLongitude());

        Study study = mapper.studyPostToStudy(requestBody);



        Study savedStudy = studyService.createStudy(study, member);
        StudyDto.Response response = mapper.studyToStudyResponse(savedStudy);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }


    @Operation(summary = "스터디 모집 내용 수정")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK", content = @Content(array = @ArraySchema(schema = @Schema(implementation = StudyDto.Response.class))))})
    @PatchMapping("/{study-id}")
    public ResponseEntity patchStudy(@Valid @PathVariable("study-id") Long studyId, @RequestBody StudyDto.Patch requestBody) {
        log.debug("PATCH STUDY");

        Study findStudy = studyService.findVerifiedStudy(studyId);
        Study study = studyService.patchStudy(findStudy, requestBody);

        return ResponseEntity.ok(new SingleResponseStudyDto<>(List.of(mapper.studyToStudyResponse(study))));
    }




    @Operation(summary = "단일 스터디 조회")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK", content = @Content(array = @ArraySchema(schema = @Schema(implementation = StudyDto.Response.class))))})
    @GetMapping("/{study-id}")
    public ResponseEntity postStudy(@Valid @PathVariable("study-id") Long studyId, @AuthenticationPrincipal UserPrincipal userPrincipal) {
        log.debug("GET STUDY");

        Study study = studyService.findVerifiedStudy(studyId);

        return ResponseEntity.ok(mapper.studyToStudyResponse(study));
    }


    //무한스크롤
    //일단 페이지네이션 적용
    //검색기능 (필터링) 기능 추가
    @Operation(summary = "전체 스터디 조회")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK", content = @Content(array = @ArraySchema(schema = @Schema(implementation = MultiResponseDto.class))))})
    @GetMapping
    public ResponseEntity getStudies(@PageableDefault(size = 15, sort = "studyId", direction = Sort.Direction.DESC)Pageable pageable, String titleKeyword, String cityKeyword, String categoryKeyword ) {
        log.debug("GET ALL STUDIES");

        //Page<Study> pageStudies = studyService.getStudies(pageable);

        //검색 메서드 맨 아래쪽에 있음
        Page<Study> searchedStudies = searchFunction(pageable, titleKeyword, cityKeyword, categoryKeyword);

        List<Study> studies = searchedStudies.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(mapper.studiesToStudyResponse(studies),searchedStudies), HttpStatus.OK);
    }


    @Operation(summary = "해당 스터디 삭제")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK")})
    @DeleteMapping("/{study-id}")
    public ResponseEntity deleteStudy(@Valid @PathVariable("study-id") Long studyId) {
        log.debug("DELETE STUDY");

        studyService.deleteStudy(studyId);

        return new ResponseEntity<>("스터디가 삭제 되었습니다.",HttpStatus.OK);
    }


    @Operation(summary = "스터디 모집에 대한 질문 작성")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK")})
    @PostMapping("/{study-id}/comment")
    public ResponseEntity postComment(@Valid @PathVariable("study-id") Long studyId,
                                      @RequestBody StudyCommentDto.Post studyCommentDto,
                                      @AuthenticationPrincipal UserPrincipal userPrincipal) {
        log.debug("POST STUDY COMMENTS");

        StudyComment comment = mapper.commentPostToComment(studyCommentDto);
        Member member = userPrincipal.getMember();

        StudyComment savedComment = studyService.createStudyComment(comment, member, studyId);
        StudyCommentDto.Response response = mapper.commentToCommentResponse(savedComment);

        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @Operation(summary = "주변 스터디 조회")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK")})
    @GetMapping("/around")
    public ResponseEntity<List<StudyDto.Response>> getAroundStudy(
//            @PageableDefault(size = 15, sort = "studyId", direction = Sort.Direction.DESC) Pageable pageable,
//            @RequestParam Long page, @RequestParam(required = false) Long lastId,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
//        List<Study> studies = studyService.getAroundStudy(userPrincipal.getMember().getLatitude(),
//                userPrincipal.getMember().getLongitude(),page,lastId);
        List<Study> studies = studyService.getAroundStudy(userPrincipal.getMember().getLatitude(),
                userPrincipal.getMember().getLongitude());
        List<StudyDto.Response> response = mapper.studiesToStudyResponse(studies);

        return ResponseEntity.ok().body(response);
    }



    //스터디 질문 수정기능
    @Operation(summary = "스터디 모집에 대한 질문 수정")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK")})
    @PatchMapping("/{study-id}/{comment-id}")
    public ResponseEntity patchComment(@Valid @PathVariable("study-id") Long studyId, @PathVariable("comment-id") Long commentId,
                                       @RequestBody StudyCommentDto.Patch requestBody,
                                      @AuthenticationPrincipal UserPrincipal userPrincipal) {
        log.debug("PATCH STUDY COMMENTS");

        StudyComment comment = mapper.commentPatchToComment(requestBody);
        StudyComment patchedComment = studyService.patchStudyComment(comment, commentId);

        StudyCommentDto.Response response = mapper.commentToCommentResponse(patchedComment);

        return new ResponseEntity<>(response,HttpStatus.OK);
    }


    //스터디 질문 삭제기능
    @Operation(summary = "스터디 모집에 대한 질문 삭제")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK")})
    @DeleteMapping("/{study-id}/{comment-id}")
    public ResponseEntity deleteComment(@Valid @PathVariable("study-id") Long studyId, @PathVariable("comment-id") Long commentId,
                                      @AuthenticationPrincipal UserPrincipal userPrincipal) {
        log.debug("DELETE STUDY COMMENTS");

        studyService.deleteStudyComment(commentId);
        String ans = "Deletion completed";

        return new ResponseEntity<>(ans,HttpStatus.OK);
    }

    //조건 검색하는 메서드
    private Page<Study> searchFunction(Pageable pageable, String titleKeyword, String cityKeyword, String categoryKeyword) {

        Page<Study> searchedStudies = null;
        //검색 키워드가 전부 없는경우
        if(titleKeyword == null && cityKeyword == null && categoryKeyword == null){
            searchedStudies = studyService.getStudies(pageable);
        } else if(titleKeyword !=null && cityKeyword == null && categoryKeyword == null) { //제목으로만 검색
            searchedStudies = studySearchService.getStudyByTitle(pageable, titleKeyword);
        } else if(titleKeyword == null && cityKeyword != null && categoryKeyword == null) { //도시이름으로만 검색
            searchedStudies = studySearchService.getStudyByCity(pageable, cityKeyword);
        } else if(titleKeyword == null && cityKeyword == null && categoryKeyword != null) { //카테고리로만 검색
            searchedStudies = studySearchService.getStudyByCategory(pageable, categoryKeyword);
        } else if(titleKeyword != null && cityKeyword != null && categoryKeyword == null) {//제목 + 도시로 검색
            searchedStudies = studySearchService.getStudyByTitleAndCity(pageable, titleKeyword, cityKeyword);
        } else if(titleKeyword != null && cityKeyword == null && categoryKeyword !=null) { //제목 + 카테고리로 검색
            searchedStudies = studySearchService.getStudyByTitleAndCategory(pageable, titleKeyword, categoryKeyword);
        } else if(titleKeyword == null && cityKeyword != null && categoryKeyword !=null) { //도시 + 카테고리로 검색
            searchedStudies = studySearchService.getStudyByCityAndCategory(pageable, cityKeyword, categoryKeyword);
        } else { //전부 필터링 할때
            searchedStudies = studySearchService.getStudyByAllFilter(pageable, titleKeyword, cityKeyword, categoryKeyword);
        }

        return searchedStudies;
    }

}
