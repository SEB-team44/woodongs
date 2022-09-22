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
import main_project.udongs.apply.entity.StudyApply;
import main_project.udongs.apply.service.StudyApplyService;
import main_project.udongs.exception.BusinessLogicException;
import main_project.udongs.exception.ExceptionCode;
import main_project.udongs.member.entity.Member;
import main_project.udongs.member.service.MemberService;

import main_project.udongs.study.dto.SingleResponseStudyDto;

import main_project.udongs.oauth2.oauth.entity.UserPrincipal;

import main_project.udongs.study.dto.StudyDto;
import main_project.udongs.study.entity.Study;
import main_project.udongs.study.mapper.StudyMapper;
import main_project.udongs.study.service.StudyService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
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

    @Operation(summary = "스터디 모집 등록")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK", content = @Content(array = @ArraySchema(schema = @Schema(implementation = StudyDto.Response.ResponseBuilder.class))))})
    @PostMapping("/recruit")
    public ResponseEntity postStudy(@AuthenticationPrincipal UserPrincipal userPrincipal, @RequestBody StudyDto.Post requestBody) {
        log.debug("POST STUDY");

        Study study = mapper.studyPostToStudy(requestBody);
        study.setCreatedAt(LocalDateTime.now());

        //등록시 스터디장의 위치정보, 스터디장 id번호 반환
        Member member = userPrincipal.getMember();
        study.setCity(member.getCity());
        study.setMember(member);

        Study savedStudy = studyService.createStudy(study);
        StudyDto.Response response = mapper.studyToStudyResponse(savedStudy);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }



    @Operation(summary = "스터디 조회")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK", content = @Content(array = @ArraySchema(schema = @Schema(implementation = StudyDto.class))))})
    @GetMapping("/{study-id}")
    public ResponseEntity postStudy(@Valid @PathVariable("study-id") Long studyId) {
        log.debug("GET STUDY");

        Study study = studyService.findVerifiedStudy(studyId);

        return ResponseEntity.ok(new SingleResponseStudyDto<>(List.of(mapper.studyToStudyResponse(study))));
    }


    @Operation(summary = "전체 스터디 조회")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK", content = @Content(array = @ArraySchema(schema = @Schema(implementation = StudyDto.class))))})
    @GetMapping
    public ResponseEntity getStudies(@PageableDefault(size = 15, sort = "studyId", direction = Sort.Direction.DESC)Pageable pageable) {
        log.debug("GET ALL STUDIES");

        List<StudyDto.Response> list = mapper.studiesToStudyResponse(studyService.getStudies());

       // Page<Study> pageStudies = studyService.findVerifiedStudy(pageable);

        return new ResponseEntity<>(list, HttpStatus.OK);
    }



}
