package main_project.udongs.stomp.chat;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatMessageRepository extends JpaRepository<ChatMessage,Long> {
}
