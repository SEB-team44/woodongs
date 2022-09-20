package main_project.udongs.member.service;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
@AllArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    @Transactional
    public Member createMember(Member member) {
        Member savedMember = memberRepository.save(member);
        savedMember.setGrade("USER"); //기본 가입시 USER
        return  savedMember;
    }

    @Transactional
    public Member getMember(Long memberId) {
        return findVerifiedMember(memberId);
    }

    @Transactional
    public Member updateMember(Member member) {

        Member findMember = findVerifiedMember(member.getMemberId());

        // 이름, 폰번호, 비번 만 변경
        Optional.ofNullable(member.getMemberName())
                .ifPresent(findMember::setMemberName);
        Optional.ofNullable(member.getPhoneNumber())
                .ifPresent(findMember::setPhoneNumber);
        Optional.ofNullable(member.getPassword())
                .ifPresent(findMember::setPassword);

        return memberRepository.save(findMember);
    }

    @Transactional
    public Member uploadImage(Member member, String s3ImageUrl) {

        Member findMember = findVerifiedMember(member.getMemberId());

            findMember.setS3ImageUrl(s3ImageUrl);
            return memberRepository.save(findMember);

    }

    public Member getMembers() {
        return null;
    }

    @Transactional
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
