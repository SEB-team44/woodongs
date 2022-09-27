package main_project.udongs.freeboard.entity;

import lombok.Getter;
import lombok.Setter;
import main_project.udongs.member.entity.Member;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Setter
@Getter
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    @Column
    private String title;

    @Column
    private String body;

    @Column
    private String city;

    @Column
    private Long createdBy;

    @Column
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime modifiedAt;

    @ManyToOne
    private Member member;
}
