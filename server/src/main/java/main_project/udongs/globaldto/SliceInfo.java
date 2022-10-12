package main_project.udongs.globaldto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SliceInfo {
    private int size;
    private long numberOfElements;
    private boolean nextAvailable;
    private long lastIdx;

}

