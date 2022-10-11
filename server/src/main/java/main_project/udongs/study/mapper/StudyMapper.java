package main_project.udongs.study.mapper;

import main_project.udongs.member.dto.MemberDto;
import main_project.udongs.member.entity.Member;
import main_project.udongs.study.dto.StudyCommentDto;
import main_project.udongs.study.dto.StudyDto;
import main_project.udongs.study.entity.Study;
import main_project.udongs.study.entity.StudyComment;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface StudyMapper {

    Study studyPostToStudy(StudyDto.Post requestBody);

    StudyComment commentPostToComment(StudyCommentDto.Post requestBody);

    StudyComment commentPatchToComment(StudyCommentDto.Patch requestBody);


    default StudyCommentDto.Response commentToCommentResponse(StudyComment studyComment){
        return StudyCommentDto.Response.builder()
                .commentId(studyComment.getCommentId())
                .nickName(studyComment.getCreatedBy())
                .body(studyComment.getBody())
                .createdAt(studyComment.getCreatedAt())
                .modifiedAt(studyComment.getModifiedAt())
                .build();
    }


    Study studyPatchToStudy(StudyDto.Patch requestBody);

    default StudyDto.Response studyToStudyResponse(Study study) {
        Member member = study.getMember();

        List<MemberDto.Response> iamReader = List.of(MemberDto.Response.builder()
                .memberId(member.getMemberId())
                .nickName(member.getNickName())
                .email(member.getEmail())
                .phoneNumber(member.getPhoneNumber())
                .profile(member.getProfile())
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

           List<StudyCommentDto.Response> commentInfo = study.getComments()
                .stream().map(comment -> StudyCommentDto.Response.builder()
                        .commentId(comment.getCommentId())
                        .body(comment.getBody())
                        .nickName(comment.getCreatedBy())
                        .createdAt(comment.getCreatedAt())
                           .modifiedAt(comment.getModifiedAt())
                        .build()).collect(Collectors.toList());

        return StudyDto.Response.builder()
                .studyId(study.getStudyId())
                .title(study.getTitle())
                .body(study.getBody())
                .category(study.getCategory())
                .latitude(study.getLatitude())
                .longitude(study.getLongitude())
                .city(study.getCity())
                .createdBy(member.getMemberId())
                .state(study.getState())
                .nowHeadCount((long) study.getAcceptances().size())
                .headCount(study.getHeadCount())
                .createdAt(study.getCreatedAt())
                .modifiedAt(study.getModifiedAt())
                .commentResponseDtos(new ArrayList<>(commentInfo))
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


//    List<StudyDto.CardResponse> studiesToStudyCardResponseDtos(List<Study> studies);

    List<StudyDto.Response> studiesToStudyResponse(List<Study> studies);
}
