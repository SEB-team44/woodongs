package main_project.udongs.stomp;

import lombok.RequiredArgsConstructor;
import main_project.udongs.exception.BusinessLogicException;
import main_project.udongs.exception.ExceptionCode;
import main_project.udongs.oauth2.oauth.token.AuthToken;
import main_project.udongs.oauth2.oauth.token.AuthTokenProvider;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class StompHandler implements ChannelInterceptor {

    private final AuthTokenProvider tokenProvider;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        if (accessor.getCommand() == StompCommand.CONNECT) {
            AuthToken token = tokenProvider.convertAuthToken(accessor.getFirstNativeHeader("token"));
            System.out.println("token.getToken() : "+ token.getToken());
            if (!token.validate()) {
                throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED);
            }
//            if( tokenProvider.convertAuthToken(accessor.getFirstNativeHeader("token"));)
//                throw new AccessDeniedException("");
        }
        System.out.println("message : " + message);
        return message;
    }
}
