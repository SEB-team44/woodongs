package main_project.udongs.study.entity;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import main_project.udongs.member.entity.Member;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
public class StudyComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @Column
    private String body;

    @Column
    private String createdBy;

    @Column
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime modifiedAt;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "studyId")
    private Study study;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "memberId")
    private Member member;

}
