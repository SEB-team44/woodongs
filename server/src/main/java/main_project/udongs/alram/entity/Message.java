//package main_project.udongs.alram.entity;
//
//import lombok.AccessLevel;
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import main_project.udongs.member.entity.Member;
//
//import javax.persistence.*;
//
//@Entity
//@Getter
//@NoArgsConstructor(access = AccessLevel.PROTECTED)
//@AllArgsConstructor(access = AccessLevel.PRIVATE)
//public class Message extends CreatedDateEntity {
//    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "message_id")
//    private Long id;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "sender_id")
//    private Member sender;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "receiver_id")
//    private Member receiver;
//
//    @Lob
//    private String message;
//
//    @Enumerated(EnumType.STRING)
//    private ReadingStatus readingStatus;
//
//    public static Message createMessage(Member sender, Member receiver, String message) {
//        Message msg = new Message();
//        msg.sender = sender;
//        msg.receiver = receiver;
//        msg.message = message;
//        msg.readingStatus = ReadingStatus.N;
//        return msg;
//    }
//
//    public void changeReadingStatus(ReadingStatus readingStatus) {
//        this.readingStatus = readingStatus;
//    }
//
//}
