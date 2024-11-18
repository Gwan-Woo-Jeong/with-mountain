package com.test.hike.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.test.hike.mapper.UserMapper;

/**
 * 사용자 관련 비즈니스 로직을 처리하는 Service 클래스입니다.
 * @author Lee Hye-mi
 *
 */
@Service
public class UserService {
    
    @Autowired
    private UserMapper userMapper;
    
    /**
     * 이메일 중복 여부를 확인하는 method입니다.
     * @param email 중복 검사할 이메일 주소
     * @return 중복된 이메일이 존재하면 true를 반환하며, 존재하지 않으면 false를 반환 
     */
    public boolean checkEmailExists(String email) {
        return userMapper.checkEmailExists(email) == 1;  // 1이면 true(존재), 0이면 false(없음)
    }
}
