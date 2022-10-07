package main_project.udongs.study.service;

import lombok.AllArgsConstructor;
import main_project.udongs.study.entity.Study;
import main_project.udongs.study.repository.StudyRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/*
*
* 스터디 목록 검색기능(필터링)을 위한 서비스 클래스
*
* */

@Service
@AllArgsConstructor
public class StudySearchService {

    private final StudyRepository studyRepository;

    //검색으로 스터디 조회 - 타이틀
    @Transactional
    public Slice<Study> getStudyByTitle(Pageable pageable, String titleKeyword){
        return studyRepository.findByTitleContaining(titleKeyword, pageable);
    }

    //검색으로 스터디 조회 - 지역(city)
    @Transactional
    public Slice<Study> getStudyByCity(Pageable pageable, String cityKeyword){
        return studyRepository.findByCityContaining(cityKeyword, pageable);
    }

    //검색으로 스터디 조회 - 카테고리
    @Transactional
    public Slice<Study> getStudyByCategory(Pageable pageable, String categoryKeyword) {
        return studyRepository.findByCategoryContaining(categoryKeyword, pageable);
    }

    //검색으로 스터디 조회 - 타이틀 + 지역
    @Transactional
    public Slice<Study> getStudyByTitleAndCity(Pageable pageable, String titleKeyword, String cityKeyword) {
        return studyRepository.findByTitleContainingAndCityContaining(titleKeyword,cityKeyword,pageable);
    }

    //검색으로 스터디 조회 - 타이틀 + 카테고리
    @Transactional
    public Slice<Study> getStudyByTitleAndCategory(Pageable pageable, String titleKeyword, String categoryKeyword) {
        return studyRepository.findByTitleContainingAndCategoryContaining(titleKeyword, categoryKeyword, pageable);
    }

    //검색으로 스터디 조회 - 지역 + 카테고리
    @Transactional
    public Slice<Study> getStudyByCityAndCategory(Pageable pageable, String cityKeyword, String categoryKeyword) {
        return studyRepository.findByCityContainingAndCategoryContaining(cityKeyword, categoryKeyword, pageable);
    }

    //검색으로 스터디 조회 - 타이틀 + 지역 + 카테고리
    @Transactional
    public Slice<Study> getStudyByAllFilter(Pageable pageable, String titleKeyword, String cityKeyword, String categoryKeyword) {
        return studyRepository.findByTitleContainingAndCityContainingAndCategoryContaining(titleKeyword, cityKeyword, categoryKeyword, pageable);
    }

}
