package main_project.udongs.alram.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageDto implements Serializable {
//    private Long id;
    private Long senderId;
//    private String senderNickname;
    private Long receiverId;
//    private String receiverNickname;
    private String message;
//    private ReadingStatus readingStatus;
    LocalDateTime createdAt;

//    public static MessageDto convertMessageToDto(Message message) {
//        return new MessageDto(message.getId(), message.getSender().getMemberId(), message.getSender().getNickName(),
//                message.getReceiver().getMemberId(), message.getReceiver().getNickName(), message.getMessage(), message.getReadingStatus(),
//                message.getCreatedAt());
//    }
}
