package com.test.hike.mapper;

import java.util.List;
import com.test.hike.dto.LocationDTO;

/**
 * 활동지역 정보 관련 데이터베이스 쿼리를 정의하는 Mapper 인터페이스입니다.
 * @author Lee Hye-mi
 *
 */
public interface LocationMapper {
	
	 /**
	    * 모든 활동지역 정보를 조회하는 method입니다.
	    * 
	    * @return List<LocationDTO> 전체 활동지역 목록,
	    *         조회 결과가 없을 경우 빈 리스트 반환
	    */
    List<LocationDTO> getAllLocations();
}