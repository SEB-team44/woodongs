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
import main_project.udongs.locationservice.LocationService;
import main_project.udongs.member.dto.MemberDto;
import main_project.udongs.member.entity.Member;
import main_project.udongs.member.entity.Profile;
import main_project.udongs.member.mapper.MemberMapper;
import main_project.udongs.member.service.MemberService;
import main_project.udongs.oauth2.oauth.entity.UserPrincipal;
import main_project.udongs.s3upload.AwsS3Upload;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.time.LocalDateTime;

@Tag(name = "Member", description = "회원 관련 API")
@Slf4j
@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberMapper mapper;
    private final MemberService memberService;
    private final LocationService locationService;
    private final AwsS3Upload s3Upload;
    private final PasswordEncoder passwordEncoder;


    /*
     * 위치정보 테스트 중이라 회원 등록시 받아오는걸로 붙여놈
     * 경도 / 위도 는 프론트에서 받아올 예정
     * 나중에 로그인 시 위치정보 받아오는 것으로 변경
     */


    @Operation(summary = "회원 등록")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK", content = @Content(array = @ArraySchema(schema = @Schema(implementation = MemberDto.Response.class))))})
    @PostMapping("/signup")
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post requestBody) throws Exception {
        log.debug("post member");

        //경도 / 위도 는 프론트에서 받아올 예정
        /*String s = locationService.coordToAddr("126.76903412977279", "37.51018419688551");
        requestBody.setCity(s);*/

        requestBody.setPassword(passwordEncoder.encode(requestBody.getPassword()));

        Member member = mapper.memberPostToMember(requestBody);
        member.setCreatedAt(LocalDateTime.now());
        Member createdMember = memberService.createMember(member);
        MemberDto.Response response = mapper.memberToMemberResponse(createdMember);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }


    /*
    * at main_project.udongs.locationservice.LocationService.getRegionAddress(LocationService.java:88)
        at main_project.udongs.locationservice.LocationService.coordToAddr(LocationService.java:26)
        at main_project.udongs.member.controller.MemberController.locate(MemberController.java:80)
*/
    //경도, 위도 프론트에서 받기
    //로그인시 바로 위치 요청 받기
    @Operation(summary = "회원 위치 등록")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK")})
    @PostMapping("/locate")
    public ResponseEntity locate(@RequestBody MemberDto.Location requestBody, @AuthenticationPrincipal UserPrincipal userPrincipal) throws Exception {
        log.debug("locate member");
        requestBody.setCity(locationService.coordToAddr(requestBody.getLongitude(), requestBody.getLatitude())); //위치정보 받은상태에서 로그아웃하고 다시 로그인해서 위치받으면 도시 갱신 실패  NPE
        memberService.updateLocation(userPrincipal.getMember(), requestBody);

        return ResponseEntity.ok("위치정보 갱신 성공");
    }


    @Operation(summary = "회원 정보 조회")
    @ApiResponses(value = @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = MemberDto.Response.class))))
    @GetMapping("/me")
    public ResponseEntity getMember(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        Member member = userPrincipal.getMember();
        MemberDto.Response response = mapper.memberToMemberResponse(member);
        log.info("member : {}" + member.toString());
        return ResponseEntity.ok(response);
    }

//    @Operation(summary = "회원 정보 조회")
//    @ApiResponses(value = @ApiResponse(responseCode = "200", description = "OK"))
//    @GetMapping("/me")
//    public main_project.udongs.oauth2.common.ApiResponse getMember(@AuthenticationPrincipal UserPrincipal userPrincipal) {
//        Member member = userPrincipal.getMember();
//        log.info("member : {}" + member.toString());
//        return main_project.udongs.oauth2.common.ApiResponse.success("member", member);
//    }


//    @Operation(summary = "단일 회원 조회 / 마이페이지")
//    @ApiResponses(value = @ApiResponse(responseCode = "200", description = "OK"))
//    @GetMapping("/{member-id}")
//    public ResponseEntity getMember(@PathVariable("member-id") long memberId) {
//        log.debug("get member");
//
//        MemberDto.Response response = mapper.memberToMemberResponse(memberService.getMember(memberId));
//        return new ResponseEntity(response, HttpStatus.OK);
//    }


    @Operation(summary = "마이페이지 회원사진 업로드")
    @ApiResponses(value = @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = Member.class))))
    @PostMapping("/imageupload")
    public ResponseEntity<Object> uploadImage(@RequestBody MultipartFile images, @AuthenticationPrincipal UserPrincipal userPrincipal) throws IOException {

        Member member = userPrincipal.getMember();

        String savedImagePath = s3Upload.upload(images, member);
        Member imageUpdated = memberService.uploadImage(member, savedImagePath);

        return new ResponseEntity<>(imageUpdated, HttpStatus.OK);
    }

    @Operation(summary = "회원 정보 수정")
    @ApiResponses(value = @ApiResponse(responseCode = "200", description = "OK"))
    @PatchMapping
    public ResponseEntity patchMember(@RequestBody MemberDto.Patch requestBody, @AuthenticationPrincipal UserPrincipal userPrincipal) {
        log.debug("patch member");
        if (requestBody.getPassword() != null) {
            requestBody.setPassword(passwordEncoder.encode(requestBody.getPassword()));
        }

        Member verifiedMember = userPrincipal.getMember();
        verifiedMember.setModifiedAt(LocalDateTime.now());

        Member member = memberService.updateMember(verifiedMember, requestBody);

        return new ResponseEntity(mapper.memberToMemberResponse(member), HttpStatus.OK);
    }


    @Operation(summary = "회원 탈퇴")
    @ApiResponses(value = @ApiResponse(responseCode = "200", description = "OK"))
    @DeleteMapping("")
    public ResponseEntity deleteMember(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        log.debug("delete member");

        memberService.deleteMember(userPrincipal.getMember().getMemberId());

        return new ResponseEntity(HttpStatus.OK);
    }

    @Operation(summary = "프로필 조회")
    @ApiResponses(value = @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = Profile.class))))
    @GetMapping("/profile")
    public ResponseEntity getMyPage(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        log.debug("get profile");

        return ResponseEntity.ok(userPrincipal.getMember().getProfile());
    }

    @Operation(summary = "프로필 수정")
    @ApiResponses(value = @ApiResponse(responseCode = "200", description = "OK"))
    @PatchMapping("/profile")
    public ResponseEntity patchMyPage(@RequestBody Profile profile, @AuthenticationPrincipal UserPrincipal userPrincipal) {
        log.debug("patch profile");
        if (profile != null) {
            System.out.println("profile : " + profile.toString());
        }
        memberService.updateProfile(userPrincipal.getMember(), profile);

        return ResponseEntity.ok("프로필 수정 완료");
    }

}


// 사용자 입장에서 전체 회원 조회는 할 일이 없으므로
/*
    @Operation(summary = "전체 회원 조회")
    @ApiResponses(value = @ApiResponse(responseCode = "200", description = "OK"))
    @GetMapping()
    public ResponseEntity getMembers() {
        log.debug("get members");
        return new ResponseEntity("getmembers", HttpStatus.OK);
    }
*/


// geoIP사용 당시의 코드 (Deprecated)
/*
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