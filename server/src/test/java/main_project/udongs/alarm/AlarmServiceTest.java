package main_project.udongs.alarm;

import com.fasterxml.jackson.databind.ObjectMapper;
import main_project.udongs.apply.controller.StudyApplyController;
import main_project.udongs.apply.service.StudyApplyService;
import main_project.udongs.member.controller.MemberController;
import main_project.udongs.member.dto.MemberDto;
import main_project.udongs.member.service.MemberService;
import main_project.udongs.oauth2.api.controller.AuthController;
import main_project.udongs.oauth2.api.entity.AuthReqModel;
import main_project.udongs.oauth2.common.ApiResponse;
import main_project.udongs.stomp.AlarmService;
import main_project.udongs.stomp.ChatDto;
import main_project.udongs.study.controller.StudyController;
import main_project.udongs.study.service.StudyService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.messaging.simp.stomp.StompFrameHandler;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.socket.WebSocketHttpHeaders;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import org.springframework.web.socket.sockjs.client.SockJsClient;
import org.springframework.web.socket.sockjs.client.WebSocketTransport;

import java.lang.reflect.Type;
import java.util.Arrays;
import java.util.Map;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingDeque;

import static java.util.concurrent.TimeUnit.SECONDS;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Transactional
class AlarmServiceTest {

    static final String WEBSOCKET_TOPIC = "/queue/";

    BlockingQueue<String> blockingQueue;
    WebSocketStompClient stompClient;
    @Autowired
    MemberController memberController;
    @Autowired
    MemberService memberService;
    @Autowired
    StudyController studyController;
    @Autowired
    StudyService studyService;
    @Autowired
    StudyApplyController studyApplyController;
    @Autowired
    StudyApplyService studyApplyService;
    @Autowired
    AuthController authController;
    @Autowired
    AlarmService alarmService;
    @LocalServerPort
    Integer port;

    @BeforeEach
    public void beforeEach() throws Exception {
        // ???????????? ????????? ????????????
        memberController.postMember(new MemberDto.Post("?????????1", "a@naver.com", "1234", "010-1111-1111", null, null));
        memberController.postMember(new MemberDto.Post("?????????2", "b@naver.com", "1234", "010-2222-1111", null, null));
//        Member member1 = memberService.createMember(new Member("a@naver.com", "?????????1", "1234"));
//        Member member2 = memberService.createMember(new Member("b@naver.com", "?????????2", "1234"));
        blockingQueue = new LinkedBlockingDeque<>();
        stompClient = new WebSocketStompClient(new SockJsClient(
                Arrays.asList(new WebSocketTransport(new StandardWebSocketClient()))));
    }


//    @Test
//    public void connectionFailedByInvalidateTokenTest() { // ?????????????????? ?????? ?????? ?????????
//
//        // given
//        StompHeaders headers = new StompHeaders(); // ????????? ?????? ??? ??????
//        headers.add("token", "invalidate token");
//
//        // when, then
//        // ????????? ???????????? ???????????? ?????? ??????
//        Assertions.assertThatThrownBy(() -> {
//            stompClient
//                    .connect(getWsPath(), new WebSocketHttpHeaders() ,headers, new StompSessionHandlerAdapter() {})
//                    .get(10, SECONDS);
//        }).isInstanceOf(RuntimeException.class);
//    }

    @Test
    public void alarmByMessageTest() throws Exception { // ????????? ?????? ??? ?????? ?????????

        // given
        ApiResponse sender = authController.login(new AuthReqModel("b@naver.com", "1234"));
        ApiResponse receiver = authController.login(new AuthReqModel("a@naver.com", "1234"));
        StompHeaders headers = new StompHeaders(); // ????????? ?????? ??????
        headers.add("token", sender.getBody().get("accessToken").toString());
        System.out.println("accessToken : " + sender.getBody().get("accessToken").toString());
        StompSession session = stompClient
                .connect(getWsPath(), new WebSocketHttpHeaders() ,headers, new StompSessionHandlerAdapter() {})
                .get(15, SECONDS); // ??????
        session.subscribe(WEBSOCKET_TOPIC+ "alarm/" + 1, new DefaultStompFrameHandler()); // "/sub/{userId}" ??????

        // when
//        MessageCreateRequestDto requestDto = new MessageCreateRequestDto(sender.getId(), receiver.getId(), "MESSAGE TEST");
//        ChatDto chatDto = messageService.createMessage(requestDto); // ????????? ??????
        ChatDto chatDto = new ChatDto(2L, "?????????", 1L,"???????????????"); // ????????? ??????
        alarmService.alarmByMessage(chatDto);

        // then
        ObjectMapper mapper = new ObjectMapper();
        String jsonResult = blockingQueue.poll(15, SECONDS); // ?????? ?????? ?????? ?????????
        Map<String, String> result = mapper.readValue(jsonResult, Map.class); // json ??????
        System.out.println(result.get("senderNickname"));
        assertThat(result.get("message")).isEqualTo(chatDto.getMessage());
    }

    class DefaultStompFrameHandler implements StompFrameHandler {
        @Override
        public Type getPayloadType(StompHeaders stompHeaders) {
            return byte[].class;
        }

        @Override
        public void handleFrame(StompHeaders stompHeaders, Object o) {
            blockingQueue.offer(new String((byte[]) o));
        }
    }

    private String getWsPath() {
        return String.format("ws://localhost:%d/ws-stomp", port);
    }

}
