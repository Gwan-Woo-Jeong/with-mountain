package com.test.hike.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.test.hike.auth.CustomUserDetailsService;
import com.test.hike.dto.CustomUserDTO;
import com.test.hike.dto.UserInfoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

@ControllerAdvice
public class GlobalControllerAdvice {
    private final CustomUserDetailsService userDetailsService;
    private final ObjectMapper objectMapper;

    @Autowired
    public GlobalControllerAdvice(CustomUserDetailsService userDetailsService, ObjectMapper objectMapper) {
        this.userDetailsService = userDetailsService;
        this.objectMapper = objectMapper;
    }

    @ModelAttribute("userInfo")
    public String addUserInfo() throws JsonProcessingException {
        UserInfoDTO userInfo = getUserInfo();
        return objectMapper.writeValueAsString(userInfo);
    }

    private UserInfoDTO getUserInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        String userId = principal instanceof UserDetails ? ((UserDetails) principal).getUsername() : principal.toString();
        CustomUserDTO customUserDTO = userDetailsService.loadUserByUserId(userId);
        return customUserDTO != null ? customUserDTO.getUserInfo() : new UserInfoDTO();
    }
}