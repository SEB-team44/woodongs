package main_project.udongs.stomp.chat;

import lombok.RequiredArgsConstructor;
import main_project.udongs.exception.BusinessLogicException;
import main_project.udongs.exception.ExceptionCode;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;

    public ChatRoom findChatRoomById(Long chatRoomId) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.CHATROOM_NOT_FOUND));
        return chatRoom;
    }
}