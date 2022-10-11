package main_project.udongs.apply.mapper;

import main_project.udongs.apply.dto.StudyApplyDto;
import main_project.udongs.apply.entity.StudyApply;
import main_project.udongs.member.dto.MemberDto;
import main_project.udongs.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface StudyApplyMapper {

//    Study studyApplyPostToStudy(StudyDto.Post requestBody);

    default StudyApplyDto.Response studyApplyToStudyApplyResponse(StudyApply studyApply) {
        Member member = studyApply.getMember();

        MemberDto.Response memberResponseDto = MemberDto.Response.builder()
                .memberId(member.getMemberId())
                .nickName(member.getNickName())
                .email(member.getEmail())
                .phoneNumber(member.getPhoneNumber())
                .city(member.getCity())
                .profile(member.getProfile())
                .emailVerifiedYn(member.getEmailVerifiedYn())
                .profileImageUrl(member.getProfileImageUrl())
                .providerType(member.getProviderType())
                .roleType(member.getRoleType())
                .latitude(member.getLatitude())
                .longitude(member.getLongitude())
                .createdAt(member.getCreatedAt())
                .modifiedAt(member.getModifiedAt())
                .build();

        return StudyApplyDto.Response.builder()
                .studyApplyId(studyApply.getStudyApplyId())
                .state(studyApply.getState())
                .memberResponseDto(memberResponseDto)
                .build();
    }
    List<StudyApplyDto.Response> studyAppliesToStudyApplyResponse(List<StudyApply> studyApplies);

//    default StudyApplyResponseDto StudyApplyToStudyApplyResponseDto(StudyApply studyApply) {
//        MemberDto.Response.builder()
//    }

}
