package main_project.udongs.study.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import main_project.udongs.member.dto.MemberDto;
import main_project.udongs.study.entity.Study;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

@Schema
public class StudyDto {

    //스터디 모집 글 작성
    @Getter
    @Setter
    @AllArgsConstructor
    @Schema(description = "post")
    public static class Post {

        @NotBlank(message = "공백만 입력할 수 없습니다.")
        private String title;

        @NotBlank(message = "공백만 입력할 수 없습니다.")
        private String body;

        @NotBlank(message = "공백만 입력할 수 없습니다.")
        private String category;

        @NotBlank(message = "공백만 입력할 수 없습니다.")
        private Long headCount;

        private double latitude;
        private double longitude;

    }

    //스터디 모집 글 수정
    @Getter
    @AllArgsConstructor
    @Schema
    public static class Patch {

        private long studyId;

        @NotBlank(message = "공백만 입력할 수 없습니다.")
        private String title;

        @NotBlank(message = "공백만 입력할 수 없습니다.")
        private String body;


        private String category;

        private Long headCount;

        public void setStudyId(long id){
            this.studyId = studyId;
        }
    }

    @AllArgsConstructor
    @Getter
    @Builder
    @Schema
    public static class Response {

        private long studyId;
        private String title;
        private String body;
        private String category;
        private Double latitude;
        private Double longitude;
        private String city;
        private Long createdBy;
        private Study.State state;
        private Long nowHeadCount;
        private Long headCount;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private List<StudyCommentDto.Response> commentResponseDtos;
        private List<MemberDto.Response> memberResponseDtos;

    }

    @Builder
    @Schema
    public static class CardResponse {
        private Long studyId;
        private String title;
        private String body;
        private String category;
        private Long nowHeadCount;
        private Long headCount;
        private Study.State state;
    }
}
