package main_project.udongs.study.service;

import lombok.AllArgsConstructor;
import main_project.udongs.apply.entity.Acceptance;
import main_project.udongs.apply.entity.StudyApply;
import main_project.udongs.apply.repository.AcceptanceRepository;
import main_project.udongs.exception.BusinessLogicException;
import main_project.udongs.exception.ExceptionCode;
import main_project.udongs.member.dto.MemberDto;
import main_project.udongs.member.entity.Member;
import main_project.udongs.member.repository.MemberRepository;
import main_project.udongs.study.dto.StudyDto;
import main_project.udongs.study.entity.Study;
import main_project.udongs.study.repository.StudyRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class StudyService {

    private final StudyRepository studyRepository;
    private final MemberRepository memberRepository;
    private final AcceptanceRepository acceptanceRepository;

    //스터디 등록
    @Transactional
    public Study createStudy(Study study) {

        return studyRepository.save(study);
    }


    //단일 스터디 조회
    @Transactional
    public Study getStudy(Long studyId){
        return findVerifiedStudy(studyId);
    }

    //스터디 모집 내용 수정
    @Transactional
    public Study patchStudy(Study study, StudyDto.Patch patch){

            // 이름, 폰번호, 비번 만 변경
            Optional.ofNullable(patch.getTitle())
                    .ifPresent(study::setTitle);
            Optional.ofNullable(patch.getBody())
                    .ifPresent(study::setBody);
            Optional.ofNullable(patch.getCategory())
                    .ifPresent(study::setCategory);

            study.setModifiedAt(LocalDateTime.now());

            return studyRepository.save(study);
        }


    //전체 스터디 조회
    @Transactional
    public Page<Study> getStudies(Pageable pageable) {
        return studyRepository.findAll(pageable);
    }


    //스터디 삭제
    @Transactional
    public void deleteStudy(Long studyId){
        Study findStudy = findVerifiedStudy(studyId);
        studyRepository.delete(findStudy);
    }
    @Transactional
    public Study getStudy(Long studyId){
        return findVerifiedStudy(studyId);
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

    public ResponseEntity accept(Study study, StudyApply studyApply) {
        study.getAcceptanceList().add(acceptanceRepository.save(new Acceptance(study, studyApply)));
        return ResponseEntity.ok("승인했습니다");
    }
}
