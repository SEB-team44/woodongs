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

    default StudyDto.Response studyToStudyResponse(Study study){
        Member member = study.getMember();

        MemberDto.Response memberResponseDto = MemberDto.Response.builder()
                .memberId(member.getMemberId())
                .nickName(member.getNickName())
                .email(member.getEmail())
                .phoneNumber(member.getPhoneNumber())
                .city(member.getCity())
                .profileImageUrl(member.getProfileImageUrl())
                .createdAt(member.getCreatedAt())
                .modifiedAt(member.getModifiedAt())
                .build();

        return StudyDto.Response.builder()
                .studyId(study.getStudyId())
                .title(study.getTitle())
                .body(study.getBody())
                .category(study.getCategory())
                .city(study.getCity())
                .createdBy(member.getMemberId())
                .createdAt(study.getCreatedAt())
                .modifiedAt(study.getModifiedAt())
                .memberResponseDto(memberResponseDto)
                .build();


                /*private long studyId;
        private String title;
        private String body;
        private String category;
        private String city;
        private String createdAt;
        private String modifiedAt;
        private MemberDto.Response member;*/
    }



    List<StudyDto.Response> studiesToStudyResponse(List<Study> studies);

}
