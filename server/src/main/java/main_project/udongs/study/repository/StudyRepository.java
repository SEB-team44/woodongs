package main_project.udongs.study.repository;

import main_project.udongs.study.entity.Study;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudyRepository extends JpaRepository<Study, Long>{

    Study findByStudyId(Long studyId);



    Slice<Study> findByTitleContaining(String titleKeyword, Pageable pageable);

    List<Study> findByTitleContainingOrderByStudyIdDesc(String titleKeyword);

    Slice<Study> findByCityContaining(String cityKeyword, Pageable pageable);

    List<Study> findByCityContainingOrderByStudyIdDesc(String cityKeyword);

    Slice<Study> findByCategoryContaining(String categoryKeyword, Pageable pageable);
    List<Study> findByCategoryContainingOrderByStudyIdDesc(String categoryKeyword);

    //제목 + 도시
    Slice<Study> findByTitleContainingAndCityContaining(String titleKeyword, String cityKeyword, Pageable pageable);

    //제목 + 카테고리
    Slice<Study> findByTitleContainingAndCategoryContaining(String titleKeyword, String categoryKeyword, Pageable pageable);

    //도시 + 카테고리
    Slice<Study> findByCityContainingAndCategoryContaining(String cityKeyword, String categoryKeyword, Pageable pageable);

    //제목 + 도시 + 카테고리
    Slice<Study> findByTitleContainingAndCityContainingAndCategoryContaining(String titleKeyword, String cityKeyword, String categoryKeyword, Pageable pageable);

    Slice<Study> findByStudyIdLessThan(Long id, Pageable pageable);
    List<Study> findByStudyIdLessThanOrderByStudyIdDesc(Long id);

    Slice<Study> findByStudyIdLessThanAndTitleContaining(Long id, String titleKeyword, Pageable pageable);

    List<Study> findByStudyIdLessThanAndTitleContainingOrderByStudyIdDesc(Long id, String titleKeyword);

    Slice<Study> findByStudyIdLessThanAndCityContaining(Long id, String cityKeyword, Pageable pageable);

    List<Study> findByStudyIdLessThanAndCityContainingOrderByStudyIdDesc(Long id, String cityKeyword);

    Slice<Study> findByStudyIdLessThanAndCategoryContaining(Long id, String categoryKeyword, Pageable pageable);

    List<Study> findByStudyIdLessThanAndCategoryContainingOrderByStudyIdDesc(Long id, String categoryKeyword);

}
