package main_project.udongs.freeboard.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main_project.udongs.freeboard.dto.PostCommentDto;
import main_project.udongs.freeboard.dto.PostDto;
import main_project.udongs.freeboard.entity.Post;
import main_project.udongs.freeboard.entity.PostComment;
import main_project.udongs.freeboard.mapper.PostMapper;
import main_project.udongs.freeboard.repository.PostRepository;
import main_project.udongs.freeboard.service.PostService;
import main_project.udongs.globaldto.MultiResponseDto;
import main_project.udongs.member.entity.Member;
import main_project.udongs.oauth2.oauth.entity.UserPrincipal;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/post")
@RequiredArgsConstructor
@Slf4j
public class PostController {
    private final PostService postService;
    private final PostRepository postRepository;
    private final PostMapper mapper;

    @Operation(summary = "게시글 등록")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "CREATED", content = @Content(array = @ArraySchema(schema = @Schema(implementation = PostDto.Response.class))))})
    @PostMapping()
    public ResponseEntity postPost(@RequestBody PostDto.Post requestBody, @AuthenticationPrincipal UserPrincipal userPrincipal) {
        log.debug("POST POST");

        Post post = mapper.postPostToPost(requestBody);

        Post savedPost = postService.createPost(post, userPrincipal.getMember());
        PostDto.Response response = mapper.postToPostResponse(savedPost);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }


    @Operation(summary = "게시글 수정")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK", content = @Content(array = @ArraySchema(schema = @Schema(implementation = PostDto.Response.class))))})
    @PatchMapping("/{post-id}")
    public ResponseEntity patchPost(@Valid @PathVariable("post-id") Long postId, @RequestBody PostDto.Patch requestBody, @AuthenticationPrincipal
                                    UserPrincipal userPrincipal) {
        log.debug("PATCH POST");

        Post verifiedPost = postService.findVerifiedPost(postId);
        postService.isWriterOrAdmin(userPrincipal.getMember(), verifiedPost.getMember());
        Post post = postService.patchPost(verifiedPost, requestBody);

        return ResponseEntity.ok(mapper.postToPostResponse(post));
    }




    @Operation(summary = "게시글 조회")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK", content = @Content(array = @ArraySchema(schema = @Schema(implementation = PostDto.Response.class))))})
    @GetMapping("/{post-id}")
    public ResponseEntity postPost(@Valid @PathVariable("post-id") Long postId, @AuthenticationPrincipal UserPrincipal userPrincipal) {
        log.debug("GET POST");

        Post post = postService.findVerifiedPost(postId);

        return ResponseEntity.ok(mapper.postToPostResponse(post));
    }



    @Operation(summary = "해당 게시글 삭제")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK")})
    @DeleteMapping("/{post-id}")
    public ResponseEntity deletePost(@Valid @PathVariable("post-id") Long postId, @AuthenticationPrincipal UserPrincipal userPrincipal) {
        log.debug("DELETE POST");

        Post verifiedPost = postService.findVerifiedPost(postId);
        postService.isWriterOrAdmin(userPrincipal.getMember(), verifiedPost.getMember());
        verifiedPost.delete();
        postService.deletePost(verifiedPost);

        return new ResponseEntity<>("게시글이 삭제 되었습니다.",HttpStatus.OK);
    }

    @Operation(summary = "전체 게시글 조회")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK", content = @Content(array = @ArraySchema(schema = @Schema(implementation = MultiResponseDto.class))))})
    @GetMapping
    public ResponseEntity getPosts(Long cursorId, Integer size, String titleKeyword, String cityKeyword, String bodyKeyword) {
        log.debug("GET ALL POSTS");

        Pageable pageable = PageRequest.of(0,size, Sort.by("postId").descending());
        //검색 메서드 맨 아래쪽에 있음
        Slice<Post> searchedPosts = postService.searchFunction(cursorId, pageable, titleKeyword, cityKeyword, bodyKeyword);

        List<Post> posts = searchedPosts.getContent();
        Long lastIdx = posts.get(posts.size() - 1).getPostId();
        return new ResponseEntity<>(new MultiResponseDto<>(mapper.postsToPostResponse(posts),searchedPosts, lastIdx), HttpStatus.OK);
    }

    @Operation(summary = "게시글에 대한 댓글 작성")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK")})
    @PostMapping("/{post-id}/comment")
    public ResponseEntity postComment(@Valid @PathVariable("post-id") Long postId,
                                      @RequestBody PostCommentDto.Post postCommentDto,
                                      @AuthenticationPrincipal UserPrincipal userPrincipal) {
        log.debug("POST STUDY COMMENTS");

        PostComment comment = mapper.commentPostToComment(postCommentDto);
        Member member = userPrincipal.getMember();

        PostComment savedComment = postService.createPostComment(comment, member, postId);
        PostCommentDto.Response response = mapper.commentToCommentResponse(savedComment);

        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @Operation(summary = "게시글에 대한 댓글 수정")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK")})
    @PatchMapping("/{post-id}/{comment-id}")
    public ResponseEntity patchComment(@Valid @PathVariable("post-id") Long postId, @PathVariable("comment-id") Long commentId,
                                       @RequestBody PostCommentDto.Patch requestBody,
                                       @AuthenticationPrincipal UserPrincipal userPrincipal) {

        log.debug("PATCH STUDY COMMENTS");
        PostComment verifiedPostComment = postService.findVerifiedPostComment(commentId);
        postService.isWriterOrAdmin(userPrincipal.getMember(), verifiedPostComment.getMember());
        PostComment patchedComment = postService.patchPostComment(verifiedPostComment, requestBody);
        PostCommentDto.Response response = mapper.commentToCommentResponse(patchedComment);

        return new ResponseEntity<>(response,HttpStatus.OK);
    }


    //게시글 댓글 삭제기능
    @Operation(summary = "게시글에 대한 댓글 삭제")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK")})
    @DeleteMapping("/{post-id}/{comment-id}")
    public ResponseEntity deleteComment(@Valid @PathVariable("post-id") Long postId, @PathVariable("comment-id") Long commentId,
                                        @AuthenticationPrincipal UserPrincipal userPrincipal) {

        log.debug("DELETE STUDY COMMENTS");
        PostComment verifiedPostComment = postService.findVerifiedPostComment(commentId);
        postService.isWriterOrAdmin(userPrincipal.getMember(), verifiedPostComment.getMember());
        postService.deletePostComment(verifiedPostComment);
        String ans = "Deletion completed";

        return new ResponseEntity<>(ans,HttpStatus.OK);
    }
}
