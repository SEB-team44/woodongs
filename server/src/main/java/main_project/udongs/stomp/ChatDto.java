package main_project.udongs.stomp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatDto implements Serializable {
    private Long senderId;
    private String senderNickname;
    private Long receiverId;
    private String message;

}
