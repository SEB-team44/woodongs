package main_project.udongs.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.math.BigDecimal;


public class MemberDto {

    //회원가입
    //회원가입 시 검증
    @Getter
    @Setter
    @AllArgsConstructor
    public static class Post {

        @NotBlank(message = "이름은 공백이 아니어야 합니다.")
        private String member_name;

        @NotBlank(message = "이메일은 공백이 아니어야 합니다.")
        @Email
        private String email;

        @NotBlank(message = "비밀번호는 공백이 아니어야 합니다.")
        private String password;

        @NotBlank
        @Pattern(regexp = "^010-\\d{3,4}-\\d{4}$",
                message = "휴대폰 번호는 010으로 시작하는 11자리 숫자와 '-'로 구성되어야 합니다.")
        private String phone_number;

        //private BigDecimal latitude;
        //private BigDecimal longitude;

        //회원 가입시 기본 등급 = USER
    }

    //회원 정보 수정
    @Getter
    @AllArgsConstructor
    public static class Patch {

        private long memberId;

        @NotBlank(message = "회원 이름은 공백이 아니어야 합니다")
        private String member_name;

        @NotBlank
        @Pattern(regexp = "^010-\\d{3,4}-\\d{4}$",
                message = "휴대폰 번호는 010으로 시작하는 11자리 숫자와 '-'로 구성되어야 합니다.")
        private String phone_number;


        public void setMemberId(long memberId) {
            this.memberId = memberId;
        }
    }

    @AllArgsConstructor
    @Getter
    @Builder
    public static class Response {
        private long memberId;
        private String member_name;
        private String email;
        private String phone_number;
        private String grade;
    }

}
