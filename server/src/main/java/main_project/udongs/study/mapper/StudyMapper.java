package main_project.udongs.study.mapper;

import main_project.udongs.member.dto.MemberDto;
import main_project.udongs.member.entity.Member;
import main_project.udongs.study.dto.StudyDto;
import main_project.udongs.study.entity.Study;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface StudyMapper {

    Study studyPostToStudy(StudyDto.Post requestBody);


    Study studyPatchToStudy(StudyDto.Patch requestBody);

    default StudyDto.Response studyToStudyResponse(Study study) {
        Member member = study.getMember();

        List<MemberDto.Response> iamReader = List.of(MemberDto.Response.builder()
                .memberId(member.getMemberId())
                .nickName(member.getNickName())
                .email(member.getEmail())
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
                .build());

        List<MemberDto.Response> iamMember = study.getAcceptances()
                .stream().map(acceptance -> MemberDto.Response.builder()
                        .memberId(acceptance.getMember().getMemberId())
                        .nickName(acceptance.getMember().getNickName())
                        .email(acceptance.getMember().getEmail())
                        .phoneNumber(acceptance.getMember().getPhoneNumber())
                        .city(acceptance.getMember().getCity())
                        .emailVerifiedYn(acceptance.getMember().getEmailVerifiedYn())
                        .profileImageUrl(acceptance.getMember().getProfileImageUrl())
                        .providerType(acceptance.getMember().getProviderType())
                        .roleType(acceptance.getMember().getRoleType())
                        .latitude(acceptance.getMember().getLatitude())
                        .longitude(acceptance.getMember().getLongitude())
                        .createdAt(acceptance.getMember().getCreatedAt())
                        .modifiedAt(acceptance.getMember().getModifiedAt())
                        .build()).collect(Collectors.toList());

        return StudyDto.Response.builder()
                .studyId(study.getStudyId())
                .title(study.getTitle())
                .body(study.getBody())
                .category(study.getCategory())
                .city(study.getCity())
                .createdBy(member.getMemberId())
                .state(study.getState())
                .createdAt(study.getCreatedAt())
                .modifiedAt(study.getModifiedAt())
                .memberResponseDtos(Stream.concat(iamReader.stream(), iamMember.stream()).collect(Collectors.toList()))
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
