//package main_project.udongs.alram.service;
//
//
//import com.maxmind.db.CacheKey;
//import lombok.RequiredArgsConstructor;
//import main_project.udongs.alram.dto.MessageCreateRequestDto;
//import main_project.udongs.alram.dto.MessageDto;
//import main_project.udongs.alram.entity.Message;
//import main_project.udongs.alram.entity.ReadingStatus;
//import main_project.udongs.alram.repository.MessageRepository;
//import main_project.udongs.member.repository.MemberRepository;
//import org.springframework.cache.annotation.CacheEvict;
//import org.springframework.cache.annotation.Cacheable;
//import org.springframework.cache.annotation.Caching;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Slice;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//@Service
//@Transactional(readOnly = true)
//@RequiredArgsConstructor
//public class MessageService {
//
//    private final MessageRepository messageRepository;
//    private final MemberRepository userRepository;
//    private final CacheService cacheService;
//    private final AlarmService alarmService;
//
//    /**
//     * 사용자가 전송한 메시지 내역. 마지막 내역 아이디 다음 것부터 limit 개수 만큼 가져옴
//     */
//    @Cacheable(value = CacheKey.SENT_MESSAGES, key = "{#userId, #limit, #lastMessageId}")
//    public Slice<MessageDto> findSentMessagesByUserId(Long userId, Long lastMessageId, int limit) {
//        return messageRepository.findNextSentMessagesByUserIdOrderByCreatedAt(userId, lastMessageId != null ? lastMessageId : Long.MAX_VALUE, PageRequest.of(0, limit))
//                .map(m -> MessageDto.convertMessageToDto(m));
//    }
//
//    /**
//     * 사용자에게 수신한 메시지 내역. 마지막 내역 아이디 다음 것부터 limit 개수 만큼 가져옴
//     */
//    @Cacheable(value = CacheKey.RECEIVED_MESSAGES, key = "{#userId, #limit, #lastMessageId}")
//    public Slice<MessageDto> findReceivedMessagesByUserId(Long userId, Long lastMessageId, int limit) {
//        return messageRepository.findNextReceivedMessagesByUserIdOrderByCreatedAt(userId, lastMessageId != null ? lastMessageId : Long.MAX_VALUE, PageRequest.of(0, limit))
//                .map(m -> MessageDto.convertMessageToDto(m));
//    }
//
//    @Transactional
//    @Cacheable(value = CacheKey.MESSAGE, key = "#messageId")
//    public MessageDto readMessage(Long messageId) {
//        Message message = messageRepository.findById(messageId).orElseThrow(MessageNotFoundException::new);
//        message.changeReadingStatus(ReadingStatus.Y);
//        return MessageDto.convertMessageToDto(message);
//    }
//
//    @Transactional
//    @Caching(evict = {
//            @CacheEvict(value = CacheKey.SENT_MESSAGES, key = "#requestDto.senderId", allEntries = true),
//            @CacheEvict(value = CacheKey.RECEIVED_MESSAGES, key = "#requestDto.receiverId", allEntries = true)
//    })
//    public MessageDto createMessage(MessageCreateRequestDto requestDto) {
//        Message message = messageRepository.save(
//                Message.createMessage(
//                        userRepository.findById(requestDto.getSenderId()).orElseThrow(UserNotFoundException::new),
//                        userRepository.findById(requestDto.getReceiverId()).orElseThrow(UserNotFoundException::new),
//                        requestDto.getMessage()
//                ));
//        MessageDto messageDto = MessageDto.convertMessageToDto(message);
//        alarmService.alarmByMessage(messageDto);
//        return messageDto;
//    }
//
//    @Transactional
//    public void deleteMessage(Long messageId) {
//        Message message = messageRepository.findById(messageId).orElseThrow(MessageNotFoundException::new);
//        cacheService.deleteMessagesCache(messageId, message.getSender().getId(), message.getReceiver().getId());
//        messageRepository.delete(message);
//    }
//
//}
