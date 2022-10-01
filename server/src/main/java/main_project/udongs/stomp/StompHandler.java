package main_project.udongs.stomp;

import lombok.RequiredArgsConstructor;
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
            if (token.validate()) {
                token.getTokenClaims();
            }
//            if( tokenProvider.convertAuthToken(accessor.getFirstNativeHeader("token"));)
//                throw new AccessDeniedException("");
        }
        return message;
    }
}
