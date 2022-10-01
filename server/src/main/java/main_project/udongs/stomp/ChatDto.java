package main_project.udongs.stomp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatDto implements Serializable {
//    private Long id;
    private Long senderId;
    private String senderNickname;
    private Long receiverId;
//    private String receiverNickname;
    private String message;
//    private ReadingStatus readingStatus;
    LocalDateTime createdAt = LocalDateTime.now();

//    public static ChatDto convertMessageToDto(Chat message) {
//        return new ChatDto(message.getId(), message.getSender().getMemberId(), message.getSender().getNickName(),
//                message.getReceiver().getMemberId(), message.getReceiver().getNickName(), message.getMessage(), message.getReadingStatus(),
//                message.getCreatedAt());
//    }
}
