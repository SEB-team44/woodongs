package main_project.udongs.stomp.alarm;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class Alarm {
    private String AlarmId;
    private String AlarmName;


    public static Alarm create(String name) {
        Alarm Alarm = new Alarm();
        Alarm.AlarmId = UUID.randomUUID().toString();
        Alarm.AlarmName = name;
        return Alarm;
    }
}
