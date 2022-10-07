package main_project.udongs.study.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class SingleResponseStudyDto<T> {
    private List<T> data;
}
