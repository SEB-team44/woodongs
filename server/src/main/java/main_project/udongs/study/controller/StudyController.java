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

import main_project.udongs.study.dto.SingleResponseStudyDto;

import main_project.udongs.oauth2.oauth.entity.UserPrincipal;

import main_project.udongs.study.dto.StudyCommentDto;
import main_project.udongs.study.dto.StudyDto;
import main_project.udongs.study.entity.Study;
import main_project.udongs.study.entity.StudyComment;
import main_project.udongs.study.mapper.StudyMapper;
import main_project.udongs.study.repository.StudyRepository;
import main_project.udongs.study.service.StudyService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

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

    @Operation(summary = "스터디 모집 등록")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK", content = @Content(array = @ArraySchema(schema = @Schema(implementation = StudyDto.Response.class))))})
    @PostMapping("/recruit")
    public ResponseEntity postStudy(@AuthenticationPrincipal UserPrincipal userPrincipal, @RequestBody StudyDto.Post requestBody) {
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
    public ResponseEntity postStudy(@Valid @PathVariable("study-id") Long studyId) {
        log.debug("GET STUDY");

        Study study = studyService.findVerifiedStudy(studyId);

        return ResponseEntity.ok(mapper.studyToStudyResponse(study));
    }


    //무한스크롤
    //일단 페이지네이션 적용
    @Operation(summary = "전체 스터디 조회")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK", content = @Content(array = @ArraySchema(schema = @Schema(implementation = MultiResponseDto.class))))})
    @GetMapping
    public ResponseEntity getStudies(@PageableDefault(size = 15, sort = "studyId", direction = Sort.Direction.DESC)Pageable pageable) {
        log.debug("GET ALL STUDIES");

        Page<Study> pageStudies = studyService.getStudies(pageable);
        List<Study> studies = pageStudies.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(mapper.studiesToStudyResponse(studies),pageStudies), HttpStatus.OK);
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
                                      @AuthenticationPrincipal UserPrincipal userPrincipal,
                                      @RequestBody StudyCommentDto.Post studyCommentDto) {
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
    public ResponseEntity<List<StudyDto.Response>> getAroundStudy(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<Study> studies = studyService.getAroundStudy(userPrincipal.getMember().getLatitude(),
                userPrincipal.getMember().getLongitude());
        List<StudyDto.Response> response = mapper.studiesToStudyResponse(studies);

        return ResponseEntity.ok().body(response);
    }



    //수정기능 추가하기




}
