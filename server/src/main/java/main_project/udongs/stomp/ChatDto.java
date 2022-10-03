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
    private Long senderId;
    private String senderNickname;
    private Long receiverId;
    private String message;
    LocalDateTime createdAt = LocalDateTime.now();

}
