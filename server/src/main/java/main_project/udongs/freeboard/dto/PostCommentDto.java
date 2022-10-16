package main_project.udongs.freeboard.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class PostCommentDto {

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
