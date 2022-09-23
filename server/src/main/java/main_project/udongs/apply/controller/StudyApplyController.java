package main_project.udongs.apply.controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main_project.udongs.apply.entity.StudyApply;
import main_project.udongs.apply.mapper.StudyApplyMapper;
import main_project.udongs.apply.service.StudyApplyService;
import main_project.udongs.exception.BusinessLogicException;
import main_project.udongs.exception.ExceptionCode;
import main_project.udongs.oauth2.oauth.entity.UserPrincipal;
import main_project.udongs.study.dto.StudyDto;
import main_project.udongs.study.entity.Study;
import main_project.udongs.study.service.StudyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/study")
public class StudyApplyController {

    private final StudyApplyService studyApplyService;
    private final StudyService studyService;

    @Operation(summary = "스터디 신청")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK", content = @Content(array = @ArraySchema(schema = @Schema(implementation = StudyDto.class))))})
    @PostMapping("/{study-id}/apply")
    public ResponseEntity applyStudy(@PathVariable("study-id") Long studyId, @AuthenticationPrincipal UserPrincipal userPrincipal) {
        log.debug("APPLY STUDY");

        Study study = studyService.getStudy(studyId);
        if (study.getMember().getMemberId() == userPrincipal.getMember().getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED);
        }
        studyApplyService.createStudyApply(study,userPrincipal.getMember());
        return ResponseEntity.ok("신청했습니다");
    }

    @Operation(summary = "스터디 신청 승인")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK")})
    @PostMapping("/{apply-id}/accept")
    public ResponseEntity accpetStudy(@PathVariable("apply-id") Long applyId, @AuthenticationPrincipal UserPrincipal userPrincipal) {
        log.debug("ACCEPT APPLICATION");
        Study study = studyApplyService.getStudyApply(applyId).getStudy();

        if (userPrincipal.getMember().getMemberId() != study.getMember().getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED);
        }

        if (study.getAcceptances().size() == study.getHeadCount()) {
            throw new BusinessLogicException(ExceptionCode.STUDY_BE_FULL);
        }

        StudyApply studyApply = studyApplyService.getStudyApply(applyId);
        return studyApplyService.accept(study, studyApply.getMember());
    }
}
