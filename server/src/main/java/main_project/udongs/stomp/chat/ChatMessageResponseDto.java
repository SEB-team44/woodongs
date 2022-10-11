package main_project.udongs.stomp.chat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessageResponseDto {

    private Long senderId;

    private String senderNickName;

    private String message;
}
