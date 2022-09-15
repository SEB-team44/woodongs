package main_project.udongs.member.mapper;


//MapStruct 사용

import main_project.udongs.member.dto.MemberDto;
import main_project.udongs.member.entity.Member;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member memberPostToMember(MemberDto.Post requestBody);

    Member memberPatchToMember(MemberDto.Patch requestBody);

    MemberDto.Response memberToMemberResponse(Member member);

    List<MemberDto.Response> membersToMemberResponse(List<Member> members);
}
