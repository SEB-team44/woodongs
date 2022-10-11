package main_project.udongs.stomp.chat;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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
@RequestMapping("/chatroom")
public class ChatRoomController {
    private final ChatRoomService chatRoomService;

    @Operation(summary = "채팅방 이전 메시지 조회")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "CREATED", content = @Content(array = @ArraySchema(schema = @Schema(implementation = ChatMessageResponseDto.class))))})
    @GetMapping("/{chatRoomId}")
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