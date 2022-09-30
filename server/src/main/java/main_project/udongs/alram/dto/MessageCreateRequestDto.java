package main_project.udongs.alram.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data

@AllArgsConstructor
@NoArgsConstructor
public class MessageCreateRequestDto {
    private Long senderId;
    private Long receiverId;
    private String message;
}
