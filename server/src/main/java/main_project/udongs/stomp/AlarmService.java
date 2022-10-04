package main_project.udongs.stomp;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AlarmService {

    private final SimpMessageSendingOperations messagingTemplate;

    public void alarmByMessage(ChatDto chatDto) {
        messagingTemplate.convertAndSend("/sub/alarm/" + chatDto.getReceiverId(), chatDto);
        System.out.println(chatDto.getMessage());
    }

}
