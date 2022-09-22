package main_project.udongs.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import main_project.udongs.oauth2.oauth.entity.ProviderType;
import main_project.udongs.oauth2.oauth.entity.RoleType;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;


public class MemberDto {

    //회원가입
    //회원가입 시 검증
    @Getter
    @Setter
    @AllArgsConstructor
    public static class Post {

        @NotBlank(message = "닉네임은 공백이 아니어야 합니다.")
        private String nickName;

        @NotBlank(message = "이메일은 공백이 아니어야 합니다.")
        @Email
        private String email;

        @NotBlank(message = "비밀번호는 공백이 아니어야 합니다.")
        private String password;

//        @NotBlank
        @Pattern(regexp = "^010-\\d{3,4}-\\d{4}$",
                message = "휴대폰 번호는 010으로 시작하는 11자리 숫자와 '-'로 구성되어야 합니다.")
        private String phoneNumber;

        private String city;

        private String profileImageUrl;


        /*
        private String state;

        // 위도
        @Column
        private String latitude;

        // 경도
        @Column
        private String longitude;*/

        //회원 가입시 기본 등급 = USER
    }

    //회원 정보 수정
    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch {

        @NotBlank(message = "닉네임은 공백이 아니어야 합니다")
        private String nickName;

        @NotBlank
        @Pattern(regexp = "^010-\\d{3,4}-\\d{4}$",
                message = "휴대폰 번호는 010으로 시작하는 11자리 숫자와 '-'로 구성되어야 합니다.")
        private String phoneNumber;

        @NotBlank(message = "비밀번호는 공백이 아니어야 합니다.")
        private String password;

        //비밀번호 변경기능도 추가?

    }

    @AllArgsConstructor
    @Getter
    @Builder
    public static class Response {
        private Long memberId;
        private String nickName;
        private String email;
        private String phoneNumber;
        private ProviderType providerType;
        private String emailVerifiedYn;
        private RoleType roleType;
        private String profileImageUrl;

        private String latitude;
        private String longitude;
        private String city;

        private String profileImageUrl;

        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;


    }

    @Getter
    @Setter
    public static class Location {
        private String longitude;
        private String latitude;
        private String city;
    }

}
