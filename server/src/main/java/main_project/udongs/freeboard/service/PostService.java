package main_project.udongs.freeboard.service;

import lombok.RequiredArgsConstructor;
import main_project.udongs.exception.BusinessLogicException;
import main_project.udongs.exception.ExceptionCode;
import main_project.udongs.freeboard.dto.PostDto;
import main_project.udongs.freeboard.entity.Post;
import main_project.udongs.freeboard.entity.PostComment;
import main_project.udongs.freeboard.repository.PostCommentRepository;
import main_project.udongs.freeboard.repository.PostRepository;
import main_project.udongs.member.entity.Member;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final PostCommentRepository commentRepository;

    //게시글 등록
    @Transactional
    public Post createPost(Post post, Member member) {

        post.setCreatedAt(LocalDateTime.now());
        post.setCity(member.getCity());
        post.setMember(member);
        post.setCreatedBy(member.getMemberId());
        return postRepository.save(post);
    }


    //단일 게시글 조회
    @Transactional
    public Post getPost(Long postId) {
        return findVerifiedPost(postId);
    }

    //게시글 모집 내용 수정
    @Transactional
    public Post patchPost(Post post, PostDto.Patch patch) {

        // 제목 ,내용만 변경
        Optional.ofNullable(patch.getTitle())
                .ifPresent(post::setTitle);
        Optional.ofNullable(patch.getBody())
                .ifPresent(post::setBody);

        post.setModifiedAt(LocalDateTime.now());

        return postRepository.save(post);
    }



    //게시글 삭제
    @Transactional
    public void deletePost(Long postId) {
        Post findPost = findVerifiedPost(postId);
        postRepository.delete(findPost);
    }

    @Transactional(readOnly = true)
    public Post findVerifiedPost(long postId) {
        Optional<Post> optionalPost =
                postRepository.findById(postId);
        Post findPost =
                optionalPost.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.STUDY_NOT_FOUND));
        return findPost;
    }

    //게시글 모집글 질문 작성
    @Transactional
    public PostComment createPostComment(PostComment postComment, Member member, Long postId) {

        postComment.setCreatedAt(LocalDateTime.now());
        postComment.setMember(member);
        postComment.setCreatedBy(member.getNickName());

        Post post = postRepository.findById(postId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.STUDY_NOT_FOUND));
        postComment.setPost(post);

        return commentRepository.save(postComment);
    }

    //게시글 모집글 질문 수정
    @Transactional
    public PostComment patchPostComment(PostComment comment, Long commentId) {

        PostComment foundComment = commentRepository.findById(commentId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

        Optional.ofNullable(comment.getBody())
                .ifPresent(foundComment::setBody);
        foundComment.setModifiedAt(LocalDateTime.now());

        return commentRepository.save(foundComment);
    }

    //게시글 모집글 질문 삭제
    @Transactional
    public void deletePostComment(Long commentId) {

        PostComment foundComment = commentRepository.findById(commentId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
        commentRepository.delete(foundComment);
    }


    @Transactional
    public Slice<Post> searchFunction(Pageable pageable, String titleKeyword, String cityKeyword, String bodyKeyword) {
        Slice<Post> searchedPosts = null;
        //검색 키워드가 전부 없는경우
        if(titleKeyword == null && cityKeyword == null && bodyKeyword == null){
            searchedPosts = getPosts(pageable);
        } else if(titleKeyword !=null && cityKeyword == null && bodyKeyword == null) { //제목으로만 검색
            searchedPosts = getPostByTitle(pageable, titleKeyword);
        } else if(titleKeyword == null && cityKeyword != null && bodyKeyword == null) { //도시이름으로만 검색
            searchedPosts = getPostByCity(pageable, cityKeyword);
        } else if(titleKeyword == null && cityKeyword == null && bodyKeyword != null) { //본문으로만 검색
            searchedPosts = getPostByBody(pageable, bodyKeyword);}
//        } else if(titleKeyword != null && cityKeyword != null && bodyKeyword == null) {//제목 + 도시로 검색
//            searchedPosts = getPostByTitleAndCity(pageable, titleKeyword, cityKeyword);
//        } else if(titleKeyword != null && cityKeyword == null && bodyKeyword !=null) { //제목 + 카테고리로 검색
//            searchedPosts = getPostByTitleAndBody(pageable, titleKeyword, bodyKeyword);
//        } else if(titleKeyword == null && cityKeyword != null && bodyKeyword !=null) { //도시 + 카테고리로 검색
//            searchedPosts = getPostByCityBody(pageable, cityKeyword, bodyKeyword);
//        } else { //전부 필터링 할때
//            searchedPosts = getPostByAllFilter(pageable, titleKeyword, cityKeyword, bodyKeyword);
//        }

        return searchedPosts;
    }

    @Transactional
    public Slice<Post> getPosts(Pageable pageable) {
        return postRepository.findAll(pageable);
    }

    //검색으로 게시글 조회 - 타이틀
    @Transactional
    public Slice<Post> getPostByTitle(Pageable pageable, String titleKeyword){
        return postRepository.findByTitleContaining(titleKeyword, pageable);
    }

    //검색으로 게시글 조회 - 지역(city)
    @Transactional
    public Slice<Post> getPostByCity(Pageable pageable, String cityKeyword){
        return postRepository.findByCityContaining(cityKeyword, pageable);
    }

    //검색으로 게시글 조회 - 본문
    @Transactional
    public Slice<Post> getPostByBody(Pageable pageable, String bodyKeyword) {
        return postRepository.findByBodyContaining(bodyKeyword, pageable);
    }

//    //검색으로 게시글 조회 - 타이틀 + 지역
//    @Transactional
//    public Slice<Post> getPostByTitleAndCity(Pageable pageable, String titleKeyword, String cityKeyword) {
//        return postRepository.findByTitleContainingAndCityContaining(titleKeyword,cityKeyword,pageable);
//    }
//
//    //검색으로 게시글 조회 - 타이틀 + 카테고리
//    @Transactional
//    public Slice<Post> getPostByTitleAndBody(Pageable pageable, String titleKeyword, String categoryKeyword) {
//        return postRepository.findByTitleContainingAndCategoryContaining(titleKeyword, categoryKeyword, pageable);
//    }
//
//    //검색으로 게시글 조회 - 지역 + 카테고리
//    @Transactional
//    public Slice<Post> getPostByCityBody(Pageable pageable, String cityKeyword, String categoryKeyword) {
//        return postRepository.findByCityContainingAndCategoryContaining(cityKeyword, categoryKeyword, pageable);
//    }
//
//    //검색으로 게시글 조회 - 타이틀 + 지역 + 카테고리
//    @Transactional
//    public Page<Post> getPostByAllFilter(Pageable pageable, String titleKeyword, String cityKeyword, String categoryKeyword) {
//        return postRepository.findByTitleContainingAndCityContainingAndCategoryContaining(titleKeyword, cityKeyword, categoryKeyword, pageable);
//    }
}
