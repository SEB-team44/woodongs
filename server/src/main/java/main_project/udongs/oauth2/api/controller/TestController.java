package main_project.udongs.oauth2.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/todo/test")
    public String test(){
        return "todo-test";
    }
}
