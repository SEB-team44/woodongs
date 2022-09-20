package main_project.udongs.oauth2.oauth.service;

import lombok.RequiredArgsConstructor;
import main_project.udongs.member.entity.Member;
import main_project.udongs.member.repository.MemberRepository;
import main_project.udongs.oauth2.oauth.entity.UserPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Member user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("Can not find email.");
        }
        return UserPrincipal.create(user);
    }
}
