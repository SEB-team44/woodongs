package main_project.udongs.apply.mapper;

import main_project.udongs.apply.dto.StudyApplyResponseDto;
import main_project.udongs.apply.entity.StudyApply;
import main_project.udongs.member.dto.MemberDto;
import main_project.udongs.study.dto.StudyDto;
import main_project.udongs.study.entity.Study;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface StudyApplyMapper {

    Study studyApplyPostToStudy(StudyDto.Post requestBody);

//    default StudyApplyResponseDto StudyApplyToStudyApplyResponseDto(StudyApply studyApply) {
//        MemberDto.Response.builder()
//    }

}
