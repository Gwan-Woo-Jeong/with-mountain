package com.test.hike.mapper;

import java.util.List;

import com.test.hike.dto.CustomCourseDTO;
import com.test.hike.dto.MountainDTO;
import org.apache.ibatis.annotations.Mapper;

import com.test.hike.dto.HikingRoadDTO;
import com.test.hike.dto.HikingRoadSpotDTO;
import org.apache.ibatis.annotations.Param;

/**
 * 커스텀 등산로 기능과 관련된 Interface Mapper 파일입니다.
 * 실제 SQL Query는 동일한 이름의 xml 파일에 구현되었습니다.
 * @author Kim Young-jin, Jeong Gwan-woo
 */
@Mapper
public interface MapCustomMapper {
	
	List<HikingRoadSpotDTO> getHikingRoadSpots(); // DB에서 등산로 지점 데이터 전부를 가져오는 method

	List<MountainDTO> getSearchMountainSpots(); // 산 위치

	List<HikingRoadDTO> getHikingRoads();

	com.test.hike.dto.custom.MountainDTO getAllRoadsWithCoordsByMtId(int mtId);

	List<CustomCourseDTO> addCourseData();
}
