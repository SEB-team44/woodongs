package main_project.udongs.study.repository;

import main_project.udongs.study.entity.Study;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudyRepository extends JpaRepository<Study, Long> {

    Study findByStudyId(Long studyId);
}
