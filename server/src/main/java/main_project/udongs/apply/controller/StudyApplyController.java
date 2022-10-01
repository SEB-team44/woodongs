package main_project.udongs.apply.controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main_project.udongs.stomp.ChatDto;
import main_project.udongs.stomp.AlarmService;
import main_project.udongs.apply.dto.StudyApplyDto;
import main_project.udongs.apply.entity.StudyApply;
import main_project.udongs.apply.mapper.StudyApplyMapper;
import main_project.udongs.apply.repository.StudyApplyRepository;
import main_project.udongs.apply.service.StudyApplyService;
import main_project.udongs.exception.BusinessLogicException;
import main_project.udongs.exception.ExceptionCode;
import main_project.udongs.oauth2.oauth.entity.UserPrincipal;
import main_project.udongs.study.entity.Study;
import main_project.udongs.study.repository.StudyRepository;
import main_project.udongs.study.service.StudyService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/study")
public class StudyApplyController {

    private final StudyApplyService studyApplyService;
    private final StudyService studyService;
    private final StudyRepository studyRepository;
    private final StudyApplyRepository studyApplyRepository;
    private final StudyApplyMapper mapper;
    private final AlarmService alarmService;

    @Operation(summary = "스터디 신청")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK")})
    @PostMapping("/{study-id}/apply")
    public ResponseEntity applyStudy(@PathVariable("study-id") Long studyId, @AuthenticationPrincipal UserPrincipal userPrincipal) {
        log.debug("APPLY STUDY");

        Study study = studyService.getStudy(studyId);

        // 스터디 상태가 마감이면 예외던짐
        if (study.getState() == Study.State.Closed) {
            throw new BusinessLogicException(ExceptionCode.STUDY_BE_FULL);
        }

        // 스터디 그룹장은 신청할 수 없음
        if (study.getMember().getMemberId() == userPrincipal.getMember().getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED);
        }

        // 이미 신청한 상태면 신청할 수 없음
        for (StudyApply studyApply :study.getStudyApplies()) {
            if (userPrincipal.getMember().getMemberId() == studyApply.getMember().getMemberId()) {
                throw new BusinessLogicException(ExceptionCode.APPLICATION_EXIST);
            }
        }

        studyApplyService.createStudyApply(study,userPrincipal.getMember());

        // 알람 전송 추가
        alarmService.alarmByMessage(new ChatDto(userPrincipal.getMember().getMemberId(), userPrincipal.getMember().getNickName(), study.getMember().getMemberId(), "스터디 신청이 왔습니다", LocalDateTime.now()));

        return ResponseEntity.ok("신청했습니다");
    }

    @Operation(summary = "스터디 신청 승인")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK")})
    @PostMapping("/{apply-id}/accept")
    public ResponseEntity accpetApply(@PathVariable("apply-id") Long applyId, @AuthenticationPrincipal UserPrincipal userPrincipal) {
        log.debug("ACCEPT APPLICATION");
        Study study = studyApplyService.getStudyApply(applyId).getStudy();

        // 스터디 그룹장만 승인 가능
        if (userPrincipal.getMember().getMemberId() != study.getMember().getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED);
        }

        // 스터디가 마감되면 승인 할 수 없음
        if (study.getState() == Study.State.Closed) {
            throw new BusinessLogicException(ExceptionCode.STUDY_BE_FULL);
        }

        StudyApply studyApply = studyApplyService.getStudyApply(applyId);
        studyApply.setState(StudyApply.State.ACCEPT);

        // 이 부분 때문에 studyApply를 save 안해도 State가 ACCEPT로 저장됨 왤까? studyApply의 study,member가 acceptance에 들어가서 자동 갱신?
       studyApplyService.accept(study, studyApply.getMember());

        System.out.println("study Acceptance size : " + study.getAcceptances().size());

        // 스터디 모집인원을 다 구했으면 마감 처리
        if (study.getAcceptances().size() == study.getHeadCount()) {
            study.setState(Study.State.Closed);

            studyRepository.save(study);
        }

        // 알람 전송 추가
        alarmService.alarmByMessage(new ChatDto(userPrincipal.getMember().getMemberId(), userPrincipal.getMember().getNickName(), studyApply.getMember().getMemberId(), "스터디 신청이 승인됐습니다", LocalDateTime.now()));

        return ResponseEntity.ok("승인했습니다");
    }

    @Operation(summary = "스터디 신청 거절")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK")})
    @PostMapping("/{apply-id}/refuse")
    public ResponseEntity rejcetApply(@PathVariable("apply-id") Long applyId, @AuthenticationPrincipal UserPrincipal userPrincipal) {
        log.debug("REFUSE APPLICATION");
        Study study = studyApplyService.getStudyApply(applyId).getStudy();

        // 스터디 그룹장만 거절 가능
        if (userPrincipal.getMember().getMemberId() != study.getMember().getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED);
        }


        StudyApply studyApply = studyApplyService.getStudyApply(applyId);
        studyApply.setState(StudyApply.State.REFUSE);
        studyApplyRepository.save(studyApply);

        // 알람 전송 추가
        alarmService.alarmByMessage(new ChatDto(userPrincipal.getMember().getMemberId(), userPrincipal.getMember().getNickName(), studyApply.getMember().getMemberId(), "스터디 신청이 거절됐습니다", LocalDateTime.now()));

        return ResponseEntity.ok("거절했습니다");
    }

    @Operation(summary = "스터디 신청 조회 - 승인,거절 페이지")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK", content = @Content(array = @ArraySchema(schema = @Schema(implementation = StudyApplyDto.Response.class))))})
    @GetMapping("/{study-id}/admin")
    public ResponseEntity getStudyApplies(@Valid @PathVariable("study-id") Long studyId, @AuthenticationPrincipal UserPrincipal userPrincipal) {
        log.debug("GET STUDY");

        Study study = studyService.findVerifiedStudy(studyId);

        List<StudyApply> studyApplies = study.getStudyApplies();

        return ResponseEntity.ok(mapper.studyAppliesToStudyApplyResponse(studyApplies));
    }




//    @Operation(summary = "스터디 신청 조회")
//    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK")})
//    @GetMapping("/{apply-id}")
//    public ResponseEntity getStudyApply(@PathVariable("apply-id") Long applyId, @AuthenticationPrincipal UserPrincipal userPrincipal) {
//        StudyApply studyApply = studyApplyService.getStudyApply(applyId);
//
//        // 스터디 그룹장 or 신청자만 조회 가능
//        if (userPrincipal.getMember().getMemberId() != studyApply.getStudy().getMember().getMemberId() ||
//        userPrincipal.getMember().getMemberId() != studyApply.getMember().getMemberId()) {
//            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED);
//        }
//
//        return ResponseEntity.ok(mapper.StudyApplyToStudyApplyResponseDto(studyApply));
//    }
}
