package main_project.udongs.freeboard.repository;

import main_project.udongs.freeboard.entity.Post;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post,Long> {
    Slice<Post> findByTitleContaining(String titleKeyword, Pageable pageable);

    Slice<Post> findByCityContaining(String cityKeyword, Pageable pageable);

    Slice<Post> findByBodyContaining(String bodyKeyword, Pageable pageable);

    Slice<Post> findByPostIdLessThan(Long id, Pageable pageable);

    Slice<Post> findByPostIdLessThanAndTitleContaining(Long postId, String titleKeyword, Pageable pageable);

    Slice<Post> findByPostIdLessThanAndCityContaining(Long postId, String cityKeyword, Pageable pageable);

    Slice<Post> findByPostIdLessThanAndBodyContaining(Long postId, String bodyKeyword, Pageable pageable);
}
