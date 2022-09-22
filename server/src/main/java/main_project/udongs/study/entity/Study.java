package main_project.udongs.study.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import main_project.udongs.apply.entity.Acceptance;
import main_project.udongs.apply.entity.StudyApply;
import main_project.udongs.member.entity.Member;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Study {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long studyId;

    @Column
    private String title;

    @Column
    private String body;

    @Column
    private String category;

    @Column
    private String longitude;

    @Column
    private String latitude;

    @Column
    private String city;

    @Column
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime modifiedAt;

    //스터디 장 정보
    @ManyToOne
    @JoinColumn(name = "memberId")
    private Member member;

//    private List<Member> applicants = new ArrayList<>();

    @OneToMany(mappedBy = "study")
    List<StudyApply> studyApplies = new ArrayList<>();

    //수락한 스터디 신청 리스트
    @OneToMany(mappedBy = "study")
    List<Acceptance> acceptanceList = new ArrayList<>();

    //스터디 목표 모집 인원
    private Long headCount;


}
