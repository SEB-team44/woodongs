package main_project.udongs.study.service;

import lombok.AllArgsConstructor;
import main_project.udongs.exception.BusinessLogicException;
import main_project.udongs.exception.ExceptionCode;
import main_project.udongs.member.entity.Member;
import main_project.udongs.study.dto.StudyCommentDto;
import main_project.udongs.study.dto.StudyDto;
import main_project.udongs.study.entity.Distance;
import main_project.udongs.study.entity.Study;
import main_project.udongs.study.entity.StudyComment;
import main_project.udongs.study.repository.StudyCommentRepository;
import main_project.udongs.study.repository.StudyRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class StudyService {

    private final StudyRepository studyRepository;
    private final StudyCommentRepository commentRepository;
    private final Distance distance;

    //스터디 등록
    @Transactional
    public Study createStudy(Study study, Member member) {

        study.setCreatedAt(LocalDateTime.now());
        study.setCity(member.getCity());
        study.setMember(member);
        study.setCreatedBy(member.getMemberId());
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


    //스터디 모집글 질문 작성
    @Transactional
    public StudyComment createStudyComment(StudyComment studyComment, Member member, Long studyId) {

        studyComment.setCreatedAt(LocalDateTime.now());
        studyComment.setMember(member);
        studyComment.setCreatedBy(member.getNickName());

        Study study = studyRepository.findById(studyId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.STUDY_NOT_FOUND));
        studyComment.setStudy(study);

        return commentRepository.save(studyComment);
    }

    //스터디 모집글 질문 수정
    @Transactional
    public StudyComment patchStudyComment(StudyComment comment, Long commentId) {

        StudyComment foundComment = commentRepository.findById(commentId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

        Optional.ofNullable(comment.getBody())
                .ifPresent(foundComment::setBody);
        foundComment.setModifiedAt(LocalDateTime.now());

        return commentRepository.save(foundComment);
    }

    //스터디 모집글 질문 삭제
    @Transactional
    public void deleteStudyComment(Long commentId) {

        StudyComment foundComment = commentRepository.findById(commentId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
        commentRepository.delete(foundComment);
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


    // 주변 3km이내 스터디 목록 가져오기
    public List<Study> getAroundStudy(Double nowLat, Double nowLon) {
        return studyRepository.findAll().stream()
                .filter(study -> {
                    Double lat = study.getLatitude();
                    Double lon = study.getLongitude();
                    double dist = distance.calculateDistance(nowLat, nowLon, lat, lon, "meter");
                    return dist < 3000;
                }).collect(Collectors.toList());
    }
}
