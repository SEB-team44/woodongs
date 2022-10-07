package main_project.udongs.study.repository;

import main_project.udongs.study.entity.StudyComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudyCommentRepository extends JpaRepository<StudyComment, Long> {
}
