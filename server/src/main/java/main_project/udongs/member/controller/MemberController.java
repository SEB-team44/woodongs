package main_project.udongs.member.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Member", description = "회원 관련 API")
@Slf4j
@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {


    @Operation(summary = "회원 등록")
    @ApiResponses(value = @ApiResponse(responseCode = "200", description = "OK"))
    @PostMapping()
    public ResponseEntity postMember() {
        log.debug("post member");

        return new ResponseEntity("postmember", HttpStatus.OK);
    }


    @Operation(summary = "단일 회원 조회")
    @ApiResponses(value = @ApiResponse(responseCode = "200", description = "OK"))
    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable Long memberId) {
        log.debug("get member");

        return new ResponseEntity("getmember", HttpStatus.OK);
    }


    @Operation(summary = "전체 회원 조회")
    @ApiResponses(value = @ApiResponse(responseCode = "200", description = "OK"))
    @GetMapping()
    public ResponseEntity getMembers() {
        log.debug("get members");

        return new ResponseEntity("getmembers", HttpStatus.OK);
    }


    @Operation(summary = "회원 정보 수정")
    @ApiResponses(value = @ApiResponse(responseCode = "200", description = "OK"))
    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(@PathVariable Long memberId) {
        log.debug("patch member");

        return new ResponseEntity("patchmember", HttpStatus.OK);
    }


    @Operation(summary = "회원 탈퇴")
    @ApiResponses(value = @ApiResponse(responseCode = "200", description = "OK"))
    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@PathVariable Long memberId) {
        log.debug("delete member");

        return new ResponseEntity("Deletion completed", HttpStatus.OK);
    }


}
