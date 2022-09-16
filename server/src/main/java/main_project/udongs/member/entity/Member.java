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
    private Long MemberId;

    @Column
    private String email;

    @Column
    private String memberName;

    @Column
    private String phoneNumber;

    @Column
    private String password;

    // 위도
   // @Column
  //  private BigDecimal latitude;

    // 경도
   // @Column
    //private BigDecimal longitude;

    @Column
    private String grade;

}
