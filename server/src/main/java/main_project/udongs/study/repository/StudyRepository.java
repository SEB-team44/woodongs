package main_project.udongs.study.repository;

import main_project.udongs.study.entity.Study;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface StudyRepository extends JpaRepository<Study, Long>{

    Study findByStudyId(Long studyId);

    Page<Study> findByTitleContaining(String titleKeyword, Pageable pageable);

    Page<Study> findByCityContaining(String cityKeyword, Pageable pageable);

    Page<Study> findByCategoryContaining(String categoryKeyword, Pageable pageable);

    //제목 + 도시
    Page<Study> findByTitleContainingAndCityContaining(String titleKeyword, String cityKeyword, Pageable pageable);

    //제목 + 카테고리
    Page<Study> findByTitleContainingAndCategoryContaining(String titleKeyword, String categoryKeyword, Pageable pageable);

    //도시 + 카테고리
    Page<Study> findByCityContainingAndCategoryContaining(String cityKeyword, String categoryKeyword, Pageable pageable);

    //제목 + 도시 + 카테고리
    Page<Study> findByTitleContainingAndCityContainingAndCategoryContaining(String titleKeyword, String cityKeyword, String categoryKeyword, Pageable pageable);

}
