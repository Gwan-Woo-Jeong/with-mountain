package com.test.hike.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.test.hike.dto.UserInfoDTO;
import com.test.hike.dto.UserTokenDTO;

/**
 * 사용자 정보 관련 데이터베이스 접근을 처리하는 DAO 클래스입니다.
 * @author Lee Hye-mi
 *
 */
@Repository
public class UserInfoDAO {

    @Autowired
    private SqlSession sqlSession;

    private static final String NAMESPACE = "com.test.hike.mapper.UserMapper.";

    /**
     * 사용자 로그인 정보를 확인하는 method입니다.
     * @param email 사용자 이메일
     * @param password 사용자 비밀번호
     * @return UserInfoDTO 로그인 성공 시 사용자 정보, 실패 시 null
     */
    // 로그인 확인
    public UserInfoDTO loginCheck(String email, String password) {
        try {
            UserInfoDTO params = new UserInfoDTO();
            params.setEmail(email);
            params.setPassword(password);
            return sqlSession.selectOne(NAMESPACE + "loginCheck", params);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // 회원가입
    /*
     * public int insertUser(UserInfoDTO user) { try { return
     * sqlSession.insert(NAMESPACE + "insertUser", user); } catch (Exception e) {
     * e.printStackTrace(); return 0; } }
     */

    /**
     * 새로운 사용자를 등록하는 method입니다.
     * @param userInfoDTO 등록할 사용자 정보
     * @return 등록된 사용자의 ID
     */
    public String insertUser(UserInfoDTO userInfoDTO) {
        sqlSession.insert(NAMESPACE + "insertUser", userInfoDTO);
        return userInfoDTO.getUserId();
    }

    /**
     * 사용자 토큰을 저장하는 method입니다.
     * @param userTokenDTO 저장할 토큰 정보
     * @return int 저장 성공 시 1, 실패 시 0
     */
    public int insertToken(UserTokenDTO userTokenDTO) {
        return sqlSession.insert(NAMESPACE + "insertToken", userTokenDTO);
    }

    /**
     * 현재 사용자 시퀀스 값을 조회하는 method입니다.
     * @return int 현재 시퀀스 값
     */
    public int getSeqUserInfo() {
       return sqlSession.selectOne(NAMESPACE + "getCurrentSeqUserInfo");
    }

    // 이메일 중복 체크
    /**
     * 이메일 중복 여부를 확인하는 method입니다.
     * @param email 중복 확인할 이메일
     * @return 중복된 이메일이 있으면 1, 없으면 0
     */
    public int checkEmailExists(String email) {  // 메서드명 변경
        return sqlSession.selectOne("com.test.hike.mapper.UserMapper.checkEmailExists", email);
    }


    // 프로필 이미지 업데이트
    /**
     * 사용자의 프로필 이미지를 업데이트하는 method입니다.
     * @param user 업데이트할 사용자 정보
     * @return 업데이트 성공 시 1, 실패 시 0
     */
    public int updateProfileImage(UserInfoDTO user) {
        try {
            return sqlSession.update(NAMESPACE + "updateProfileImage", user);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }
    
    /* 사용자 정보 업데이트 */
    /**
     * 사용자 정보를 업데이트하는 method입니다.
     * @param user 업데이트할 사용자 정보
     * @return 업데이트 성공 시 1, 실패 시 0
     */
    public int updateUserInfo(UserInfoDTO user) {
        try {
            return sqlSession.update(NAMESPACE + "updateUserInfo", user);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }
    
    /* 사용자 정보 조회 */
    /**
     * 사용자명으로 사용자 정보를 조회하는 method입니다.
     * @param username username 조회할 사용자명
     * @return UserInfoDTO 조회된 사용자 정보, 실패 시 null
     */
    public UserInfoDTO loadUser(String username) {
        try {
            return sqlSession.selectOne(NAMESPACE + "loadUser", username);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    
    
    
}