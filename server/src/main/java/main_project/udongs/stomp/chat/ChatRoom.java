package main_project.udongs.stomp.chat;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class ChatRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatRoomId;

//    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
//    @JoinTable(name = "ChatRoom_Members",
//            joinColumns = @JoinColumn(name = "chatRoomId"),
//            inverseJoinColumns = @JoinColumn(name = "memberId"))
//    private List<Member> chatRoomMembers = new ArrayList<>();

    @OneToMany(mappedBy = "chatRoom")
    List<ChatMessage> chatMessageList = new ArrayList<>();

}