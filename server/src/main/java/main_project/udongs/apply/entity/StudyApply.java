package main_project.udongs.apply.entity;

import lombok.*;
import main_project.udongs.member.entity.Member;
import main_project.udongs.study.entity.Study;

import javax.persistence.*;

@Entity
@Setter
@Getter
@NoArgsConstructor
public class StudyApply {
    public StudyApply(Study study, Member member) {
        this.study = study;
        this.member = member;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long studyApplyId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "studyId")
    private Study study;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memberId")
    private Member member;

    @Column
    @Enumerated(EnumType.STRING)
    private State state = State.WAITING;

    @Getter
    public enum State {
        ACCEPT,
        WAITING,
        REFUSE
    }

}
