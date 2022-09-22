package main_project.udongs.oauth2.oauth.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import main_project.udongs.member.entity.Member;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;

@Getter
@Setter
@RequiredArgsConstructor
public class UserPrincipal implements OAuth2User, UserDetails {


    private Member member;
//    private final Long id;
//    private final String email;
//    private final String password;
//    private final ProviderType providerType;
//    private final RoleType roleType;
//    private final Collection<GrantedAuthority> authorities;
    private Map<String, Object> attributes;
    public UserPrincipal(Member member) {
        this.member = member;
    }

    public UserPrincipal(Member member, Map<String, Object> attributes) {
        this.member = member;
        this.attributes = attributes;
    }

//    public Long getId() { return id;}

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(member.getRoleType().getCode()));
    }

    @Override
    public String getPassword() {
        return member.getPassword();
    }

//    @Override
//    public String getName() {
//        return email;
//    }

    @Override
    public String getName() {
        return member.getNickName();
    }

    @Override
    public String getUsername() {
        return member.getNickName();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

//    public static UserPrincipal create(Member user) {
//        return new UserPrincipal(
//                user.getMemberId(),
//                user.getEmail(),
//                user.getPassword(),
//                user.getProviderType(),
//                RoleType.USER,
//                Collections.singletonList(new SimpleGrantedAuthority(RoleType.USER.getCode()))
//        );
//    }

//    public static UserPrincipal create(Member user) {
//        return new UserPrincipal(user);
//    }

//    public static UserPrincipal create(Member user, Map<String, Object> attributes) {
//        UserPrincipal userPrincipal = create(user);
//        userPrincipal.setAttributes(attributes);

//        return new UserPrincipal(user,attributes);
//    }
}
