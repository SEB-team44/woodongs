package main_project.udongs.study.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import main_project.udongs.member.entity.Member;

import javax.persistence.*;
import java.time.LocalDateTime;

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


    //스터디 수락 부분 mapping


}
