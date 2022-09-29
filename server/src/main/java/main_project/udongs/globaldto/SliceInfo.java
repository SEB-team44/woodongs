package main_project.udongs.globaldto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SliceInfo {
    private int number;
    private int size;
    private long numberOfElements;
    private boolean nextAvailable;

}

