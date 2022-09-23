package main_project.udongs.apply.service;

import lombok.RequiredArgsConstructor;
import main_project.udongs.apply.entity.Acceptance;
import main_project.udongs.apply.entity.StudyApply;
import main_project.udongs.apply.repository.AcceptanceRepository;
import main_project.udongs.apply.repository.StudyApplyRepository;
import main_project.udongs.exception.BusinessLogicException;
import main_project.udongs.exception.ExceptionCode;
import main_project.udongs.member.entity.Member;
import main_project.udongs.study.entity.Study;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StudyApplyService {
    private final StudyApplyRepository studyApplyRepository;
    private final AcceptanceRepository acceptanceRepository;

    @Transactional
    public StudyApply getStudyApply(Long studyApplyId){
        return findVerifiedStudy(studyApplyId);
    }

    // 스터디가 존재하는지 검증 처리
    @Transactional(readOnly = true)
    public StudyApply findVerifiedStudy(long studyApplyId) {
        Optional<StudyApply> optionalStudyApply =
                studyApplyRepository.findById(studyApplyId);
        StudyApply findStudyApply =
                optionalStudyApply.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.STUDY_NOT_FOUND));
        return findStudyApply;
    }

    @Transactional
    public StudyApply createStudyApply(Study study, Member member) {
        return studyApplyRepository.save(new StudyApply(study, member));
    }

    @Transactional
    public ResponseEntity accept(Study study, Member member) {
        study.getAcceptances().add(acceptanceRepository.save(new Acceptance(study, member)));
        return ResponseEntity.ok("승인했습니다");
    }
}
