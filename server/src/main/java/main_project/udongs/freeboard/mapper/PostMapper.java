package main_project.udongs.freeboard.mapper;

import main_project.udongs.freeboard.dto.PostDto;
import main_project.udongs.freeboard.entity.Post;
import main_project.udongs.member.dto.MemberDto;
import main_project.udongs.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PostMapper {

    Post postPostToPost(PostDto.Post requestBody);

    default PostDto.Response postToPostResponse(Post post) {
        Member member = post.getMember();

        MemberDto.Response memberResponseDto = MemberDto.Response.builder()
                .memberId(member.getMemberId())
                .nickName(member.getNickName())
                .email(member.getEmail())
                .profile(member.getProfile())
                .phoneNumber(member.getPhoneNumber())
                .city(member.getCity())
                .emailVerifiedYn(member.getEmailVerifiedYn())
                .profileImageUrl(member.getProfileImageUrl())
                .providerType(member.getProviderType())
                .roleType(member.getRoleType())
                .latitude(member.getLatitude())
                .longitude(member.getLongitude())
                .createdAt(member.getCreatedAt())
                .modifiedAt(member.getModifiedAt())
                .build();

        return PostDto.Response.builder()
                .postId(post.getPostId())
                .title(post.getTitle())
                .body(post.getBody())
                .city(post.getCity())
                .createdBy(member.getMemberId())
                .createdAt(post.getCreatedAt())
                .modifiedAt(post.getModifiedAt())
                .memberResponseDto(memberResponseDto)
                .build();
    }

    List<PostDto.Response> postsToPostResponse(List<Post> posts);
}
