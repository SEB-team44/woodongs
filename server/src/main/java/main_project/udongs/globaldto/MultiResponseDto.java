package main_project.udongs.globaldto;

import lombok.Getter;
import org.springframework.data.domain.Slice;

import java.util.List;

@Getter
public class MultiResponseDto<T> {

    private List<T> data;
    private SliceInfo sliceInfo;

    public MultiResponseDto(List<T> data, Slice slice, Long lastIdx) {
        this.data = data;
        this.sliceInfo = new SliceInfo(slice.getNumber() + 1,
                slice.getSize(), slice.getNumberOfElements(), slice.hasNext(), lastIdx);
    }
}
