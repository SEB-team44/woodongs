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


    @OneToMany(mappedBy = "study")
    List<StudyApply> studyApplies = new ArrayList<>();

    //수락한 스터디 신청 리스트
    @OneToMany(mappedBy = "study")
    List<Acceptance> acceptances = new ArrayList<>();

    //스터디 목표 모집 인원
    @Column
    private int headCount;

    @Column
    @Enumerated(EnumType.STRING)
    private State state = State.Open;

    @Getter
    public enum State{
        Open,
        Closed
    }


}
