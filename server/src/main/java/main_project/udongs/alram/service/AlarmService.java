package main_project.udongs.alram.service;

import lombok.RequiredArgsConstructor;
import main_project.udongs.alram.dto.MessageDto;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AlarmService {

    private final SimpMessageSendingOperations messagingTemplate;

    public void alarmByMessage(MessageDto messageDto) {
        messagingTemplate.convertAndSend("/sub/" + messageDto.getReceiverId(), messageDto);
    }

}
