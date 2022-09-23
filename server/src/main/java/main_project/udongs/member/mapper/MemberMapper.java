package main_project.udongs.member.mapper;


//MapStruct 사용

import main_project.udongs.member.dto.MemberDto;
import main_project.udongs.member.entity.Member;
import main_project.udongs.oauth2.oauth.entity.ProviderType;
import main_project.udongs.oauth2.oauth.entity.RoleType;
import main_project.udongs.study.dto.StudyDto;
import main_project.udongs.study.entity.Study;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {

    default Member memberPostToMember(MemberDto.Post requestBody) {
        return Member.builder()
                .email(requestBody.getEmail())
                .nickName(requestBody.getNickName())
                .phoneNumber(requestBody.getPhoneNumber())
                .password(requestBody.getPassword())
//                .city(requestBody.getCity())
                .emailVerifiedYn("Y")
                .profileImageUrl(requestBody.getProfileImageUrl())
                .providerType(ProviderType.LOCAL)
                .roleType(RoleType.USER)
//                .longitude("126.76903412977279")
//                .latitude("37.51018419688551")
                .createdAt(LocalDateTime.now())
//                .modifiedAt(LocalDateTime.now())
                .build();
    }

    Member memberPatchToMember(MemberDto.Patch requestBody);

    default MemberDto.Response memberToMemberResponse(Member member) {
        List<StudyDto.Response> studyResponseDtos = member.getStudies()
                .stream().map(study -> StudyDto.Response.builder()
                        .studyId(study.getStudyId())
                        .title(study.getTitle())
                        .body(study.getBody())
                        .category(study.getCategory())
                        .city(study.getCity())
                        .createdBy(member.getMemberId())
                        .createdAt(study.getCreatedAt())
                        .modifiedAt(study.getModifiedAt())
//                            .memberResponseDto(memberResponseDto)
                        .build()).collect(Collectors.toList());

        return MemberDto.Response.builder()
                .memberId(member.getMemberId())
                .email(member.getEmail())
                .nickName(member.getNickName())
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
                .studyResponseDtos(studyResponseDtos)
                .build();
    }

    List<MemberDto.Response> membersToMemberResponse(List<Member> members);
}
