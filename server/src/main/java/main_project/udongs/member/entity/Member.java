package main_project.udongs.member.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.ResultSet;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column
    private String email;

    @Column
    private String memberName;

    @Column
    private String phoneNumber;

    @Column
    private String password;

    private String state;
    private String city;
    
    // 위도
    @Column
    private String latitude;

    // 경도
    @Column
    private String longitude;

    @Column
    private String grade;

}
