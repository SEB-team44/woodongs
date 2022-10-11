package main_project.udongs.stomp.chat;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chat")
public class ChatRoomController {
    private final ChatRoomService chatRoomService;
    private final ChatRoomRepository chatRoomRepository;

    @GetMapping("/messages/{chatRoomId}")
    public ResponseEntity getChatRoom(@PathVariable("chatRoomId") Long chatRoomId) {
        ChatRoom chatRoom = chatRoomService.findChatRoomById(chatRoomId);
        List<ChatMessage> chatMessageList = chatRoom.getChatMessageList();
        List<ChatMessageResponseDto> chatMessageResponseDtos = new ArrayList<>();

        for (ChatMessage chatMessage : chatMessageList) {
            chatMessageResponseDtos.add(new ChatMessageResponseDto(chatMessage.getSender().getMemberId(), chatMessage.getSender().getNickName(), chatMessage.getMessage()));
        }

        return ResponseEntity.ok().body(chatMessageResponseDtos);
    }

}