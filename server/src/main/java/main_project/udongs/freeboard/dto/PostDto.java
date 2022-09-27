package main_project.udongs.freeboard.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import main_project.udongs.member.dto.MemberDto;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class PostDto {

    @Getter
    @Setter
    @Builder
    public static class Post {
        private String title;
        private String body;
    }

    @Getter
    @Setter
    @Builder
    public static class Patch {

        @NotBlank(message = "공백만 입력할 수 없습니다.")
        private String title;

        @NotBlank(message = "공백만 입력할 수 없습니다.")
        private String body;

    }

    @Getter
    @Setter
    @Builder
    public static class Response {
        private Long postId;
        private String title;
        private String body;
        private String city;
        private Long createdBy;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private MemberDto.Response memberResponseDto;
    }
}
