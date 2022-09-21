package main_project.udongs.member.service;

import lombok.AllArgsConstructor;
import main_project.udongs.exception.BusinessLogicException;
import main_project.udongs.exception.ExceptionCode;
import main_project.udongs.member.dto.MemberDto;
import main_project.udongs.member.entity.Member;
import main_project.udongs.member.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@AllArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    @Transactional
    public Member createMember(Member member) {
        verifyExistsEmail(member.getEmail());
        Member savedMember = memberRepository.save(member);
//        savedMember.setGrade("USER"); //기본 가입시 USER
        return  savedMember;
    }

    @Transactional
    public Member getMember(Long memberId) {
        return findVerifiedMember(memberId);
    }

    @Transactional
    public Member getMember(String email) {
        return findVerifiedMember(email);
    }

    @Transactional
    public Member updateMember(Member member, MemberDto.Patch patch) {


        // 이름, 폰번호, 비번 만 변경
        Optional.ofNullable(patch.getMemberName())
                .ifPresent(member::setMemberName);
        Optional.ofNullable(patch.getPhoneNumber())
                .ifPresent(member::setPhoneNumber);
        Optional.ofNullable(patch.getPassword())
                .ifPresent(member::setPassword);

        return memberRepository.save(member);
    }

    @Transactional
    public Member updateLocation(Member member, MemberDto.Location location) {

        // 위도, 경도, 지역 만 변경
        Optional.ofNullable(location.getLongitude())
                .ifPresent(member::setLongitude);
        Optional.ofNullable(location.getLatitude())
                .ifPresent(member::setLatitude);
        Optional.ofNullable(location.getCity())
                .ifPresent(member::setCity);

        return memberRepository.save(member);
    }

    @Transactional
    public Member uploadImage(Member member, String profileImageUrl) {
//
//        Member findMember = findVerifiedMember(member.getMemberId());

            member.setProfileImageUrl(profileImageUrl);
            return memberRepository.save(member);

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

    @Transactional(readOnly = true)
    public Member findVerifiedMember(String email) {
        Member findMember = memberRepository.findByEmail(email);
        if (findMember == null) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }
        return findMember;
    }

    private void verifyExistsEmail(String email) {
        Member member = memberRepository.findByEmail(email);
        if (member != null)
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }
}
