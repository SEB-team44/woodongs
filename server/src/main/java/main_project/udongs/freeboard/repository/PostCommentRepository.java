package main_project.udongs.freeboard.repository;

import main_project.udongs.freeboard.entity.PostComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostCommentRepository extends JpaRepository<PostComment, Long> {
}
