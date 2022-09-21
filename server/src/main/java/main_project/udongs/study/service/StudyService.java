package main_project.udongs.study.service;

import lombok.AllArgsConstructor;
import main_project.udongs.exception.BusinessLogicException;
import main_project.udongs.exception.ExceptionCode;
import main_project.udongs.member.entity.Member;
import main_project.udongs.member.repository.MemberRepository;
import main_project.udongs.study.entity.Study;
import main_project.udongs.study.repository.StudyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class StudyService {

    private final StudyRepository studyRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public Study createStudy(Study study) {

        return studyRepository.save(study);
    }

    @Transactional
    public Study getStudy(Long studyId){
        return findVerifiedStudy(studyId);
    }

    @Transactional
    public List<Study> getStudies() {
        return studyRepository.findAll();
    }


    // 스터디가 존재하는지 검증 처리
    @Transactional(readOnly = true)
    public Study findVerifiedStudy(long studyId) {
        Optional<Study> optionalStudy =
                studyRepository.findById(studyId);
        Study findStudy =
                optionalStudy.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.STUDY_NOT_FOUND));
        return findStudy;
    }
}
