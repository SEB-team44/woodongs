package main_project.udongs.freeboard.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main_project.udongs.freeboard.dto.PostDto;
import main_project.udongs.freeboard.entity.Post;
import main_project.udongs.freeboard.mapper.PostMapper;
import main_project.udongs.freeboard.service.PostService;
import main_project.udongs.oauth2.oauth.entity.UserPrincipal;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
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
    public ResponseEntity patchPost(@Valid @PathVariable("post-id") Long postId, @RequestBody PostDto.Patch requestBody) {
        log.debug("PATCH POST");

        Post findPost = postService.findVerifiedPost(postId);
        Post post = postService.patchPost(findPost, requestBody);

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
    public ResponseEntity deletePost(@Valid @PathVariable("post-id") Long postId) {
        log.debug("DELETE POST");

        postService.deletePost(postId);

        return new ResponseEntity<>("게시글이 삭제 되었습니다.",HttpStatus.OK);
    }

    @Operation(summary = "전체 게시글 조회")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK")})
    @GetMapping
    public ResponseEntity getPosts(@PageableDefault(size = 15, sort = "postId", direction = Sort.Direction.DESC) Pageable pageable, String titleKeyword, String bodyKeyword, String cityKeyword ) {
        log.debug("GET ALL STUDIES");

        //Page<Post> pageStudies = postService.getStudies(pageable);

        //검색 메서드 맨 아래쪽에 있음
        Slice<Post> searchedPosts = postService.searchFunction(pageable, titleKeyword, cityKeyword, bodyKeyword);

        List<Post> studies = searchedPosts.getContent();

        return new ResponseEntity<>(mapper.postsToPostResponse(studies), HttpStatus.OK);
    }
}
