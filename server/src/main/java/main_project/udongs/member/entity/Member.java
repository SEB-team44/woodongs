package main_project.udongs.member.entity;

import lombok.*;
import main_project.udongs.oauth2.oauth.entity.ProviderType;
import main_project.udongs.oauth2.oauth.entity.RoleType;
import main_project.udongs.study.entity.Study;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column
    private String email;

    @Column
    private String nickName;

    @Column
    private String phoneNumber;

    @Column
    private String password;

    @Column
    private String city;

// profileImageUrl이랑 겹쳐서 주석처리
//    @Column
//    private String s3ImageUrl;

    @Column
    private String longitude;

    @Column
    private String latitude;

    //email 인증 되었는지?? (현재 큰 역할은 X)
    @Column(name = "EMAIL_VERIFIED_YN", length = 1)
    @NotNull
    @Size(min = 1, max = 1)
    private String emailVerifiedYn;

    //OAuth 로그인 했을때 프로필 사진 의 주소
    @Column(name = "PROFILE_IMAGE_URL", length = 512)
    @NotNull
    @Size(max = 512)
    private String profileImageUrl;

    //카카오 로그인? 네이버로그인? 구글 로그인?
    @Column(name = "PROVIDER_TYPE", length = 20)
    @Enumerated(EnumType.STRING)
    @NotNull
    private ProviderType providerType;

    // USER / GUEST
    @Column(name = "ROLE_TYPE", length = 20)
    @Enumerated(EnumType.STRING)
    @NotNull
    private RoleType roleType;

    //생성일자
    @Column(name = "CREATED_AT")
    @NotNull
    private LocalDateTime createdAt;

    //수정일자
    @Column(name = "MODIFIED_AT")
    @NotNull
    private LocalDateTime modifiedAt;

    @OneToMany(mappedBy = "member")
    private List<Study> studies = new ArrayList<>();
    

    //시큐리티 상에서 필요한 로직(member를 새로 만들어야 하는 경우가 있음)
    public Member(
            @NotNull @Size(max = 100) String nickName,
            @NotNull @Size(max = 512) String email,
            @NotNull @Size(max = 1) String emailVerifiedYn,
            @NotNull @Size(max = 512) String profileImageUrl,
            @NotNull ProviderType providerType,
            @NotNull RoleType roleType,
            @NotNull LocalDateTime createdAt,
            @NotNull LocalDateTime modifiedAt
    ) {
        this.nickName = nickName;
        this.password = "NO_PASS";
        this.email = email != null ? email : "NO_EMAIL";
        this.emailVerifiedYn = emailVerifiedYn;
        this.profileImageUrl = profileImageUrl != null ? profileImageUrl : "";
        this.providerType = providerType;
        this.roleType = roleType;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
    }

}
