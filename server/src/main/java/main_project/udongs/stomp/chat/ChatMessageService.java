package main_project.udongs.stomp.chat;

import lombok.RequiredArgsConstructor;
import main_project.udongs.member.entity.Member;
import main_project.udongs.member.service.MemberService;
import main_project.udongs.stomp.ChatDto;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatMessageService {

    private final ChatMessageRepository chatMessageRepository;
    private final ChatRoomService chatRoomService;
    private final MemberService memberService;

    public ChatMessage saveChatMessage(ChatDto chatDto) {
        ChatRoom chatRoom = chatRoomService.findChatRoomById(chatDto.getReceiverId());
        Member member = memberService.getMember(chatDto.getSenderId());
        ChatMessage chatMessage = ChatMessage.builder()
                .chatRoom(chatRoom)
                .sender(member)
                .message(chatDto.getMessage())
                .build();

        return chatMessageRepository.save(chatMessage);
    }
}
