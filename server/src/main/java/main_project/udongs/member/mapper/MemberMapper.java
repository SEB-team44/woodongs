package main_project.udongs.member.mapper;


//MapStruct 사용

import main_project.udongs.member.dto.MemberDto;
import main_project.udongs.member.entity.Member;
import main_project.udongs.oauth2.oauth.entity.ProviderType;
import main_project.udongs.oauth2.oauth.entity.RoleType;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.time.LocalDateTime;
import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {

    default Member memberPostToMember(MemberDto.Post requestBody) {
        return Member.builder()
                .email(requestBody.getEmail())
                .memberName(requestBody.getMemberName())
                .phoneNumber(requestBody.getPhoneNumber())
                .password(requestBody.getPassword())
                .city(requestBody.getCity())
                .emailVerifiedYn("Y")
                .profileImageUrl(requestBody.getProfileImageUrl())
                .providerType(ProviderType.LOCAL)
                .roleType(RoleType.USER)
                .longitude("126.76903412977279")
                .latitude("37.51018419688551")
                .createdAt(LocalDateTime.now())
                .modifiedAt(LocalDateTime.now())
                .build();
    }

    Member memberPatchToMember(MemberDto.Patch requestBody);

    MemberDto.Response memberToMemberResponse(Member member);

    List<MemberDto.Response> membersToMemberResponse(List<Member> members);
}
