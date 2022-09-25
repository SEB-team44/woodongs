package main_project.udongs.study.dto;

import lombok.*;
import main_project.udongs.oauth2.oauth.entity.ProviderType;
import main_project.udongs.oauth2.oauth.entity.RoleType;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;
import java.util.List;

public class StudyCommentDto {

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post {

        @NotBlank(message = "공백을 등록할 수 없습니다.")
        private String body;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Patch {

        @NotBlank(message = "공백을 등록할 수 없습니다.")
        private String body;

    }


    @AllArgsConstructor
    @Getter
    @Builder
    public static class Response {
        private Long commentId;
        private String body;
        private String nickName;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;

    }


}
