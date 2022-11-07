package main_project.udongs.freeboard.entity;

import lombok.*;
import main_project.udongs.member.entity.Member;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memberId")
    private Member member;

    @Builder.Default
    @OneToMany(mappedBy = "post")
    List<PostComment> comments = new ArrayList<>();

    public void delete() {
        for (PostComment comment : this.getComments()) {
            comment.setPost(null);
        }
    }

//    public void setMember(Member member) {
//        if (this.member != null) {
//            this.member.getPosts().remove(this);
//        }
//        this.member = member;
//        member.getPosts().add(this);
//    }
}
