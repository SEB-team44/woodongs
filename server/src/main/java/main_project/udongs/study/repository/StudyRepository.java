package main_project.udongs.study.repository;

import main_project.udongs.study.entity.Study;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface StudyRepository extends JpaRepository<Study, Long>{

    Study findByStudyId(Long studyId);



    Slice<Study> findByTitleContaining(String titleKeyword, Pageable pageable);

    Slice<Study> findByCityContaining(String cityKeyword, Pageable pageable);

    Slice<Study> findByCategoryContaining(String categoryKeyword, Pageable pageable);

    //제목 + 도시
    Slice<Study> findByTitleContainingAndCityContaining(String titleKeyword, String cityKeyword, Pageable pageable);

    //제목 + 카테고리
    Slice<Study> findByTitleContainingAndCategoryContaining(String titleKeyword, String categoryKeyword, Pageable pageable);

    //도시 + 카테고리
    Slice<Study> findByCityContainingAndCategoryContaining(String cityKeyword, String categoryKeyword, Pageable pageable);

    //제목 + 도시 + 카테고리
    Slice<Study> findByTitleContainingAndCityContainingAndCategoryContaining(String titleKeyword, String cityKeyword, String categoryKeyword, Pageable pageable);

}
