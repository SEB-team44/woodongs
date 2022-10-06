package main_project.udongs.stomp.alarm;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AlarmMessage {

    private String AlarmId;
    //보내는 사람
    private String sender;
    //내용
    private String message;
}
