package main_project.udongs.stomp;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@Tag(name = "MESSAGE", description = "알림, 채팅방 관련 API")
@Controller
@Slf4j
@RequiredArgsConstructor
public class MessageController {

    private final SimpMessageSendingOperations messagingTemplate;

    @Operation(summary = "알람 보내기")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK")})
    @MessageMapping("/alarm")
    public void sendAlarm(ChatDto chatDto) {
        messagingTemplate.convertAndSend("/sub/alarm/" + chatDto.getReceiverId(), chatDto);
    }

    @Operation(summary = "채팅 보내기")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK")})
    @MessageMapping("/chat")
    public void sendChat(ChatDto chatDto) {
        messagingTemplate.convertAndSend("/sub/chat/"+chatDto.getReceiverId(), chatDto);
    }
}
