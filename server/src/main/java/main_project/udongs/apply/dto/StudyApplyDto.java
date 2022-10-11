package main_project.udongs.apply.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import main_project.udongs.apply.entity.StudyApply;
import main_project.udongs.member.dto.MemberDto;

public class StudyApplyDto {

    @Getter
    @Setter
    @Builder
    public static class Response {
        private Long studyApplyId;
        private StudyApply.State state;
        private MemberDto.Response memberResponseDto;
    }
}
