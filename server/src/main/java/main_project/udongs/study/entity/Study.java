package main_project.udongs.study.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import main_project.udongs.apply.entity.Acceptance;
import main_project.udongs.apply.entity.StudyApply;
import main_project.udongs.member.entity.Member;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

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
    private Double longitude;

    @Column
    private Double latitude;

    @Column
    private String city;

    @Column
    private Long createdBy;

    @Column
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime modifiedAt;

    //스터디 장 정보
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "memberId")
    private Member member;

    @JsonIgnore
    @OneToMany(mappedBy = "study")
    List<StudyApply> studyApplies = new ArrayList<>();

    //수락한 스터디 신청 리스트
    @JsonIgnore
    @OneToMany(mappedBy = "study")
    List<Acceptance> acceptances = new ArrayList<>();

    //스터디 모집글 댓글
    @JsonIgnore
    @OneToMany(mappedBy = "study")
    List<StudyComment> comments = new ArrayList<>();

    //스터디 목표 모집 인원
    @Column
    private Long headCount;

    @Column
    @Enumerated(EnumType.STRING)
    private State state = State.Open;

    @Getter
    public enum State{
        Open,
        Closed
    }

//    public List<StudyApply> getAcceptances() {
//        return this.studyApplies.stream().filter(studyApplies -> studyApplies.getState() == StudyApply.State.ACCEPT).collect(Collectors.toList());
//    }




}
