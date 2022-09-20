//package main_project.udongs.oauth2.api.controller;
//
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import main_project.udongs.oauth2.api.entity.User;
//import main_project.udongs.oauth2.api.service.UserService;
//import main_project.udongs.oauth2.common.ApiResponse;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/user")
//@RequiredArgsConstructor
//@Slf4j
//public class UserController {
//
//    private final UserService userService;
//
//    @GetMapping
//    public ApiResponse getUser() {
//        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//
//        User user = userService.getUser(principal.getUsername());
//        log.info("user : {}" + user.toString());
//        return ApiResponse.success("user", user);
//    }
//}
