package main_project.udongs.member.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main_project.udongs.locationservice.LocationService;
import main_project.udongs.locationservice.geoip.GeoIPService;
import main_project.udongs.member.dto.MemberDto;
import main_project.udongs.member.entity.Member;
import main_project.udongs.member.mapper.MemberMapper;
import main_project.udongs.member.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@Tag(name = "Member", description = "회원 관련 API")
@Slf4j
@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberMapper mapper;
    private final MemberService memberService;
    private final GeoIPService geoIPService;
    private final LocationService locationService;


    //지훈님과 합칠때 수정 예정
    //위치 가져오는건 프론트에서 위/경도 넘겨준걸 변환하도록
    /*@Operation(summary = "회원 등록")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = MemberDto.Response.class))))})
    @PostMapping("/signup")
    public ResponseEntity postMember(@Valid *//*@RequestParam(value="ipAddress", required=true) String ipAddress,*//*
                                     @RequestBody MemberDto.Post requestBody  ,HttpServletRequest request  ) throws Exception{
        log.debug("post member");

        *//*
     *   ip값을 param으로 받아와서 GeoIPService에서 위치정보로 변환한 뒤에
     *   requestbody에 저장
     *//*
        GeoIPService locationService = new GeoIPService();
        GeoIP location = locationService.getLocation(locationService.getRemoteIP(request));
        //GeoIP location = locationService.getLocation(ipAddress);

        requestBody.setLatitude(location.getLatitude());
        requestBody.setLongitude(location.getLongitude());
        requestBody.setState(location.getState());
        requestBody.setCity(location.getCity());

        Member member = mapper.memberPostToMember(requestBody);
        Member createdMember = memberService.createMember(member);
        MemberDto.Response response = mapper.memberToMemberResponse(createdMember);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }*/

    @Operation(summary = "회원 등록")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK", content = @Content(array = @ArraySchema(schema = @Schema(implementation = MemberDto.Response.class))))})
    @PostMapping("/signup")
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post requestBody) throws Exception {
        log.debug("post member");

        String s = locationService.coordToAddr("126.76903412977279", "37.51018419688551");
        requestBody.setCity(s);

        Member member = mapper.memberPostToMember(requestBody);
        Member createdMember = memberService.createMember(member);
        MemberDto.Response response = mapper.memberToMemberResponse(createdMember);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }


    @Operation(summary = "단일 회원 조회")
    @ApiResponses(value = @ApiResponse(responseCode = "200", description = "OK"))
    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") long memberId) {
        log.debug("get member");

        MemberDto.Response response = mapper.memberToMemberResponse(memberService.getMember(memberId));
        return new ResponseEntity(response, HttpStatus.OK);
    }


    // 사용자 입장에서 전체 회원 조회는 할 일이 없으므로
    /*@Operation(summary = "전체 회원 조회")
    @ApiResponses(value = @ApiResponse(responseCode = "200", description = "OK"))
    @GetMapping()
    public ResponseEntity getMembers() {
        log.debug("get members");

        return new ResponseEntity("getmembers", HttpStatus.OK);
    }*/


    @Operation(summary = "회원 정보 수정")
    @ApiResponses(value = @ApiResponse(responseCode = "200", description = "OK"))
    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(@PathVariable("member-id") Long memberId, @RequestBody MemberDto.Patch requestBody) {
        log.debug("patch member");
        requestBody.setMemberId(memberId);

        Member member = memberService.updateMember(mapper.memberPatchToMember(requestBody));

        return new ResponseEntity(mapper.memberToMemberResponse(member), HttpStatus.OK);
    }


    @Operation(summary = "회원 탈퇴")
    @ApiResponses(value = @ApiResponse(responseCode = "200", description = "OK"))
    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") Long memberId) {
        log.debug("delete member");

        memberService.deleteMember(memberId);

        return new ResponseEntity(HttpStatus.OK);
    }


}
