package main_project.udongs.apply.entity;

import lombok.*;
import main_project.udongs.member.entity.Member;
import main_project.udongs.study.entity.Study;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Acceptance {

    public Acceptance(Study study, Member member) {
        this.study = study;
        this.member = member;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long acceptanceId;

    @ManyToOne
    @JoinColumn(name = "studyId")
    private Study study;

    @ManyToOne
    @JoinColumn(name = "memberId")
    private Member member;

}
