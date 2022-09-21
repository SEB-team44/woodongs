package main_project.udongs.study.mapper;

import main_project.udongs.member.dto.MemberDto;
import main_project.udongs.member.entity.Member;
import main_project.udongs.study.dto.StudyDto;
import main_project.udongs.study.entity.Study;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface StudyMapper {

    Study studyPostToStudy(StudyDto.Post requestBody);


    Study studyPatchToStudy(StudyDto.Patch requestBody);

    StudyDto.Response studyToStudyResponse(Study study);

    List<StudyDto.Response> studiesToStudyResponse(List<Study> studies);

}
