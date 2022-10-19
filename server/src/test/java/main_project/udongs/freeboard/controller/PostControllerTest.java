package main_project.udongs.freeboard.controller;

import main_project.udongs.freeboard.entity.Post;
import main_project.udongs.freeboard.service.PostService;
import main_project.udongs.member.entity.Member;
import main_project.udongs.member.service.MemberService;
import main_project.udongs.oauth2.oauth.entity.RoleType;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
class PostControllerTest {

    @Autowired
    MemberService memberService;

    @Autowired
    PostService postService;

    @Test
    void postPost() {

        Member member = memberService.createMember(Member.builder().email("a@naver.com").nickName("호호").roleType(RoleType.USER).city("서울").build());
        Post post = postService.createPost(Post.builder().title("제목1").body("내용1").build(), member);

        Member verifiedMember = memberService.findVerifiedMember(1L);
        Post verifiedPost = postService.getPost(1L);


        System.out.println("verifiedMember = " + verifiedMember);
        System.out.println("verifiedPost = " + verifiedPost);
        System.out.println("verifiedPost.getMember() = " + verifiedPost.getMember());
        System.out.println("member.getPosts() = " + member.getPosts());
        System.out.println("member.getPosts().size() = " + member.getPosts().size());

        Assertions.assertThat(member.getMemberId()).isEqualTo(verifiedMember.getMemberId());
    }
}