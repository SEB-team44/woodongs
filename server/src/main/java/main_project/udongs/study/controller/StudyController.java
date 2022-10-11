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
import main_project.udongs.member.entity.Member;
import main_project.udongs.member.service.MemberService;
import main_project.udongs.oauth2.oauth.entity.UserPrincipal;
import main_project.udongs.study.dto.SingleResponseStudyDto;
import main_project.udongs.study.dto.StudyCommentDto;
import main_project.udongs.study.dto.StudyDto;
import main_project.udongs.study.entity.Study;
import main_project.udongs.study.entity.StudyComment;
import main_project.udongs.study.mapper.StudyMapper;
import main_project.udongs.study.repository.StudyRepository;
import main_project.udongs.study.service.StudySearchService;
import main_project.udongs.study.service.StudyService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
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

        //위치정보가 안들어올시 예외 처리
        try {
            requestBody.setLatitude(member.getLatitude());
            requestBody.setLongitude(member.getLongitude());
        }  catch (Exception e) {
            e.printStackTrace();
            log.error("Exception ERROR: {} ", e.getMessage());
            throw e;}

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
    public ResponseEntity getStudy(@Valid @PathVariable("study-id") Long studyId, @AuthenticationPrincipal UserPrincipal userPrincipal) {
        log.debug("GET STUDY");

        Study study = studyService.findVerifiedStudy(studyId);

        return ResponseEntity.ok(mapper.studyToStudyResponse(study));
    }

    //무한스크롤
    //검색기능 (필터링) 기능 추가
    @Operation(summary = "전체 스터디 조회")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK", content = @Content(array = @ArraySchema(schema = @Schema(implementation = MultiResponseDto.class))))})
    @GetMapping
    public ResponseEntity getStudies(Long cursorId, Integer size, String titleKeyword, String cityKeyword, String categoryKeyword) {
        log.debug("GET ALL STUDIES");

        Pageable pageable = PageRequest.of(0,size,Sort.by("studyId").descending());
        // 클라에서 size에 초기값을 넣고 스크롤이 다 내려가면 size를 증가해서 다시 요청하는식으로??
        Slice<Study> searchedStudies = studyService.searchFunction(cursorId, pageable, titleKeyword, cityKeyword, categoryKeyword);
        List<Study> studies = searchedStudies.getContent();
        Long lastIdx;
        if (studies.size() >= 1) {
            lastIdx = studies.get(studies.size() - 1).getStudyId();
        } else {
            lastIdx = 0L;
        }
        return new ResponseEntity<>(new MultiResponseDto<>(mapper.studiesToStudyResponse(studies), searchedStudies, lastIdx),HttpStatus.OK);
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
    public ResponseEntity getAroundStudy(
            Long cursorId, Integer size, String titleKeyword, String cityKeyword, String categoryKeyword,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        Pageable pageable = PageRequest.of(0,size,Sort.by("studyId").descending());

        return studyService.getAroundStudy(cursorId, pageable, titleKeyword, cityKeyword, categoryKeyword,
                userPrincipal.getMember().getLatitude(), userPrincipal.getMember().getLongitude());
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

        Member member = userPrincipal.getMember();
        studyService.deleteStudyComment(commentId, member);
        String ans = "Deletion completed";

        return new ResponseEntity<>(ans,HttpStatus.OK);
    }


    @Operation(summary = "스터디 더미데이터 삽입")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "CREATED")})
    @PostMapping("/recruit/dummy")
    public ResponseEntity insertData(@RequestBody StudyDto.Post requestBody, @AuthenticationPrincipal UserPrincipal userPrincipal) {
        log.debug("POST STUDY");
        //등록시 스터디장의 위치정보, 스터디장 id번호 반환
        Member member = userPrincipal.getMember();

        //위치정보가 안들어올시 예외 처리
        try {
            requestBody.setLatitude(member.getLatitude());
            requestBody.setLongitude(member.getLongitude());
        }  catch (Exception e) {
            e.printStackTrace();
            log.error("Exception ERROR: {} ", e.getMessage());
            throw e;
        }

        for (int i = 0; i < 50; i++) {
            Study study = Study.builder()
                    .title(requestBody.getTitle() + i)
                    .body(requestBody.getBody() + i)
                    .category(requestBody.getCategory())
                    .longitude(requestBody.getLongitude())
                    .latitude(requestBody.getLatitude())
                    .headCount(requestBody.getHeadCount())
                    .build();


            studyService.createStudy(study, member);
//            StudyDto.Response response = mapper.studyToStudyResponse(savedStudy);
        }


        return new ResponseEntity<>("스터디 50개 생성 완료", HttpStatus.CREATED);
    }

}
