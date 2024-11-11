//package com.test.hike.auth;
//
//import com.test.hike.dto.CustomUserDTO;
//import com.test.hike.dto.UserInfoDTO;
//import com.test.hike.mapper.UserMapper;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//
//public class CustomUserDetailsService implements UserDetailsService {
//
//	@Autowired
//	private UserMapper mapper;
//
//
//    @Override
//	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//
//		UserInfoDTO dto = mapper.loadUser(username);
//
//		return dto != null ? new CustomUserDTO(dto) : null;
//	}
//}
//
//
//
//
//
