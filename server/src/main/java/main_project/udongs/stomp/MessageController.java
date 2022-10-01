package main_project.udongs.stomp;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class MessageController {

    private final SimpMessageSendingOperations messagingTemplate;


    @MessageMapping("/alarm")
    public void message(ChatDto chatDto) {
        messagingTemplate.convertAndSend("/sub/alarm" + chatDto.getReceiverId(), chatDto);
    }

    @MessageMapping("/chat")
    public void chat(ChatDto chatDto) {
        messagingTemplate.convertAndSend("/sub/chat/"+chatDto.getReceiverId(), chatDto);
    }
}
