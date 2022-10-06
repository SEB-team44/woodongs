package main_project.udongs.study.service;

import lombok.AllArgsConstructor;
import main_project.udongs.exception.BusinessLogicException;
import main_project.udongs.exception.ExceptionCode;
import main_project.udongs.globaldto.MultiResponseDto;
import main_project.udongs.member.entity.Member;
import main_project.udongs.study.dto.StudyDto;
import main_project.udongs.study.entity.Distance;
import main_project.udongs.study.entity.Study;
import main_project.udongs.study.entity.StudyComment;
import main_project.udongs.study.mapper.StudyMapper;
import main_project.udongs.study.repository.StudyCommentRepository;
import main_project.udongs.study.repository.StudyRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class StudyService {

    private final StudyRepository studyRepository;
    private final StudyCommentRepository commentRepository;
    private final Distance distance;
    private final StudyMapper mapper;

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
    public Study getStudy(Long studyId) {
        return findVerifiedStudy(studyId);
    }

    //스터디 모집 내용 수정
    @Transactional
    public Study patchStudy(Study study, StudyDto.Patch patch) {

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
    public Slice<Study> getStudies(Pageable pageable) {
        return studyRepository.findAll(pageable);
    }


    //스터디 삭제
    @Transactional
    public void deleteStudy(Long studyId) {
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
    public void deleteStudyComment(Long commentId, Member member) {

        StudyComment foundComment = commentRepository.findById(commentId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
        if (Objects.equals(foundComment.getMember().getMemberId(), member.getMemberId())) {
            commentRepository.delete(foundComment);
        } else {
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED_ACTION);
        }
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

    public Slice<Study> searchFunction(Long id, Pageable pageable, String titleKeyword, String cityKeyword, String categoryKeyword) {
        return id == null ?
                ifFirstpage(pageable, titleKeyword, cityKeyword, categoryKeyword) :
                ifNotFirstpage(id, pageable, titleKeyword, cityKeyword, categoryKeyword);
    }

    // 처음 페이지 조회시 lastIdx가 없을때.
    public Slice<Study> ifFirstpage(Pageable pageable, String titleKeyword, String cityKeyword, String categoryKeyword) {
        Slice<Study> searchedStudies = null;

        //검색 키워드가 전부 없는경우
        if (titleKeyword == null && cityKeyword == null && categoryKeyword == null) {
            searchedStudies = getStudies(pageable);
        } else if (titleKeyword != null && cityKeyword == null && categoryKeyword == null) { //제목으로만 검색
            searchedStudies = studyRepository.findByTitleContaining(titleKeyword, pageable);
        } else if (titleKeyword == null && cityKeyword != null && categoryKeyword == null) { //도시이름으로만 검색
            searchedStudies = studyRepository.findByCityContaining(cityKeyword, pageable);
        } else if (titleKeyword == null && cityKeyword == null && categoryKeyword != null) { //카테고리로만 검색
            searchedStudies = studyRepository.findByCategoryContaining(categoryKeyword, pageable);
        }

        return searchedStudies;
    }

    public Slice<Study> ifNotFirstpage(Long id, Pageable pageable, String titleKeyword, String cityKeyword, String categoryKeyword) {
        Slice<Study> searchedPosts = null;

        if (titleKeyword == null && cityKeyword == null && categoryKeyword == null) {
            searchedPosts = studyRepository.findByStudyIdLessThan(id, pageable);
        } else if (titleKeyword != null && cityKeyword == null && categoryKeyword == null) { //제목으로만 검색
            searchedPosts = studyRepository.findByStudyIdLessThanAndTitleContaining(id, titleKeyword, pageable);
        } else if (titleKeyword == null && cityKeyword != null && categoryKeyword == null) { //도시이름으로만 검색
            searchedPosts = studyRepository.findByStudyIdLessThanAndCityContaining(id, cityKeyword, pageable);
        } else if (titleKeyword == null && cityKeyword == null && categoryKeyword != null) { //카테고리로만 검색
            searchedPosts = studyRepository.findByStudyIdLessThanAndCategoryContaining(id, categoryKeyword, pageable);
        }

        return searchedPosts;
    }


    // 주변 3km이내 스터디 목록 가져오기
    // cursor 방식의 페이지네이션 사용 아래로 스크롤 할때마다 가장 마지막에 본 studyId보다 작은 스터디만 표시
    // 일단 주석처리
    public ResponseEntity getAroundStudy(Long id, Pageable pageable, String titleKeyword, String cityKeyword, String categoryKeyword,
                                         Double nowLat, Double nowLon) {
        Slice<Study> studies;

        if (id == null) {
            // 첫 페이지 조회
            studies = ifFirstpage(pageable, titleKeyword, cityKeyword, categoryKeyword);
        } else {
            // 다음 페이지 조회
            studies = ifNotFirstpage(id, pageable, titleKeyword, cityKeyword, categoryKeyword);
        }

        List<Study> aroundStudies = studies.stream()
                .filter(study -> {
                    Double lat = study.getLatitude();
                    Double lon = study.getLongitude();
                    double dist = distance.calculateDistance(nowLat, nowLon, lat, lon, "meter");
                    return dist < 3000;
                }).limit(pageable.getPageSize()).collect(Collectors.toList());

        Long lastIdx;

        if (!aroundStudies.isEmpty()) {
            lastIdx = aroundStudies.get(aroundStudies.size() - 1).getStudyId();
        } else {
            lastIdx = 1L;
        }

        return new ResponseEntity<>(new MultiResponseDto<>(mapper.studiesToStudyResponse(aroundStudies), studies, lastIdx), HttpStatus.OK);
    }
}
