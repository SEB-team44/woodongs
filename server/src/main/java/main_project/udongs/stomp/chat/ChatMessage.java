package main_project.udongs.stomp.chat;

import lombok.*;
import main_project.udongs.member.entity.Member;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatMessageId;

    @ManyToOne
    @JoinColumn(name = "chatRoomId")
    private ChatRoom chatRoom;

//    보내는 사람
    @ManyToOne
    @JoinColumn(name = "senderId")
    private Member sender;


    //내용
    @Column
    private String message;

}
