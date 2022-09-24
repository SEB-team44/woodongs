package main_project.udongs.study.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import main_project.udongs.member.dto.MemberDto;
import main_project.udongs.member.entity.Member;
import main_project.udongs.study.entity.Study;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;
import java.util.List;

public class StudyDto {

    //스터디 모집 글 작성
    @Getter
    @Setter
    @AllArgsConstructor
    public static class Post {

        @NotBlank(message = "공백만 입력할 수 없습니다.")
        private String title;

        @NotBlank(message = "공백만 입력할 수 없습니다.")
        private String body;


        private String category;

        private Long headCount;

    }

    //스터디 모집 글 수정
    @Getter
    @AllArgsConstructor
    public static class Patch {

        private long studyId;

        @NotBlank(message = "공백만 입력할 수 없습니다.")
        private String title;

        @NotBlank(message = "공백만 입력할 수 없습니다.")
        private String body;


        private String category;


        public void setStudyId(long id){
            this.studyId = studyId;
        }
    }

    @AllArgsConstructor
    @Getter
    @Builder
    public static class Response {

        private long studyId;
        private String title;
        private String body;
        private String category;
        private String city;
        private Long createdBy;
        private Study.State state;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private List<StudyCommentDto.Response> commentResponseDtos;
        private List<MemberDto.Response> memberResponseDtos;

    }
}
