package main_project.udongs.stomp;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main_project.udongs.oauth2.oauth.entity.UserPrincipal;
import main_project.udongs.stomp.chat.ChatMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;

@Controller
@Slf4j
@RequiredArgsConstructor
public class MessageController {

    @Autowired
    private final SimpMessageSendingOperations messagingTemplate;

    // 알람
    @MessageMapping("/alarm")
    public void sendAlarm(@AuthenticationPrincipal UserPrincipal userPrincipal, ChatDto chatDto) {
        log.debug("sendAlarm 메세지가 왔습니다 !!");
        System.out.println("sendAlarm 메세지가 왔습니다 !!");
        chatDto.setMessage("서버에서 가공한 메시지입니다");
        System.out.println("principal.getName() = " + userPrincipal.getMember().getNickName());
        messagingTemplate.convertAndSend("/queue/alarm/" + chatDto.getReceiverId(), chatDto);
    }

    // 채팅방
    @MessageMapping("/chat")
    public void sendChat(ChatDto chatDto) {
        log.debug("sendChat 메세지가 왔습니다 !!");
        System.out.println("sendChat 메세지가 왔습니다 !!");
        messagingTemplate.convertAndSend("/topic/chat/"+chatDto.getReceiverId(), chatDto);
    }


//     이거는 그냥 혼자 해봤습니다
    @MessageMapping("/chat/message")
    public void enter(ChatMessage message) {
        if (ChatMessage.MessageType.ENTER.equals(message.getType())) {
            message.setMessage(message.getSender()+"님이 입장하였습니다.");
        }
        messagingTemplate.convertAndSend("/topic/chat/room/"+message.getRoomId(),message);
    }
}
