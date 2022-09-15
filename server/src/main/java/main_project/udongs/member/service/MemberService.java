package main_project.udongs.member.service;

import lombok.AllArgsConstructor;
import main_project.udongs.exception.BusinessLogicException;
import main_project.udongs.exception.ExceptionCode;
import main_project.udongs.member.entity.Member;
import main_project.udongs.member.repository.MemberRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public Member createMember(Member member) {
        Member savedMember = memberRepository.save(member);
        return  savedMember;
    }

    public Member getMember(Long memberId) {
        return findVerifiedMember(memberId);
    }

    public Member patchMember(Long memberId) {

        return null;
    }

    public Member getMembers() {
        return null;
    }


    public void deleteMember(Long memberId) {
        Member findMember = findVerifiedMember(memberId);
        memberRepository.delete(findMember);
    }


    // 멤버가 존재하는지 검증 처리
    @Transactional(readOnly = true)
    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember =
                memberRepository.findById(memberId);
        Member findMember =
                optionalMember.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }
}
