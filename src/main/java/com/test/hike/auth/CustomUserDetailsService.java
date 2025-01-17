package com.test.hike.auth;

import com.test.hike.dto.CustomUserDTO;
import com.test.hike.dto.UserInfoDTO;
import com.test.hike.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserMapper mapper;

    @Override
    public CustomUserDTO loadUserByUsername(String email) throws UsernameNotFoundException {
        UserInfoDTO dto = mapper.loadUserByEmail(email);
        return dto != null ? new CustomUserDTO(dto) : null;
    }

    public CustomUserDTO loadUserByUserId(String userId) throws UsernameNotFoundException {
        if(userId == null || userId.equals("anonymousUser")) return null;
        UserInfoDTO dto = mapper.loadUserByUserId(Integer.parseInt(userId));
        return dto != null ? new CustomUserDTO(dto) : null;
    }
}





