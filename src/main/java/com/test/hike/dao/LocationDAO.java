package com.test.hike.dao;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.test.hike.dto.LocationDTO;

/**
 * 활동지역 관련 데이터베이스 접근을 처리하는 DAO 클래스입니다.
 * @author Lee Hye-mi
 *
 */
@Repository
public class LocationDAO {
    
    @Autowired
    private SqlSession sqlSession;
    
    private static final String NAMESPACE = "com.test.hike.mapper.LocationMapper.";

    /**
     * 모든 활동지역 정보를 조회하는 method입니다.
     *
     * @return List&lt;LocationDTO&gt; 전체 활동지역 목록. 조회 실패 시 빈 ArrayList 반환.
     */

    public List<LocationDTO> getAllLocations() {
        try {
            return sqlSession.selectList(NAMESPACE + "getAllLocations");
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }
}