package main_project.udongs.apply.repository;

import main_project.udongs.apply.entity.StudyApply;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudyApplyRepository extends JpaRepository<StudyApply, Long> {
}
