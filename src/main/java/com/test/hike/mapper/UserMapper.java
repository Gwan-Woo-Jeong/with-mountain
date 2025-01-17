package com.test.hike.mapper;
import com.test.hike.dto.UserInfoDTO;
import com.test.hike.dto.UserTokenDTO;

/**
 * 사용자 정보 관련 데이터베이스 쿼리를 정의하는 Mapper 인터페이스입니다.
 * @author Lee Hye-mi
 *
 */
public interface UserMapper {
    
	/**
	 * 로그인 정보를 확인하는 method입니다.
	 * @param params 메일, 비밀번호를 포함한 사용자 정보
	 * @return UserInfoDTO 일치하는 사용자 정보, 없으면 null
	 */
    // 로그인 체크
    UserInfoDTO loginCheck(UserInfoDTO params);

    /**
     * 새로운 사용자를 등록하는 method입니다.
     * @param user 등록할 사용자 정보
     * @return 등록 성공 시 1, 실패 시 0
     */
    // 회원가입
    int insertUser(UserInfoDTO user);

    /**
     * 사용자 토큰을 저장하는 method입니다.
     * @param token 저장할 토큰 정보
     * @return 저장 성공 시 1, 실패 시 0
     */
    int insertToken(UserTokenDTO token);
    
    /**
     * 현재 사용자 시퀀스 값을 조회하는 method입니다.
     * @return 현재 시퀀스 값
     */
    int getSeqUserInfo();

    /**
     * 이메일 중복 여부를 확인하는 method입니다.
     * @param email 중복 확인할 이메일
     * @return 중복된 이메일이 있으면 1, 없으면 0
     */
    // 이메일 중복 체크
    int checkEmailExists(String email);
    
    /**
     * 사용자의 프로필 이미지를 업데이트하는 method입니다.
     * @param params 업데이트할 사용자 정보
     * @return 업데이트 성공 시 1, 실패 시 0
     */
    // 프로필 이미지 업데이트
    int updateProfileImage(UserInfoDTO params);

    /**
     * 사용자명으로 사용자 정보를 조회하는 method입니다.
     * @param email 조회할 사용자명
     * @return 조회된 사용자 정보, 실패 시 null
     */
    // 로그인 유저 정보 가져오기
    UserInfoDTO loadUserByEmail(String email);

    UserInfoDTO loadUserByUserId(int userId);

    /**
     * 사용자의 등산 환경 설정 정보를 수정하는 method입니다.
     * @param user 수정할 사용자 정보
     * @return 수정 성공 시 1, 실패 시 0
     */
    //나의 등산 환경 설정 정보 수정
    int updateUserInfo(UserInfoDTO user);
    
}