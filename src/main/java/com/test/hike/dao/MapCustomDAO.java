package com.test.hike.dao;

import java.util.List;

import com.test.hike.dto.*;
import org.springframework.stereotype.Repository;

import com.test.hike.mapper.MapCustomMapper;

import lombok.RequiredArgsConstructor;

/**
 * MapCustomDAO.java
 * 등산로 커스텀 기능과 관련된 DAO 입니다.
 * Interface Mapper 방식을 사용했기 때문에, method 선언만 한 후 mapper를 return 했습니다.
 * @author Kim Young-jin, Jeong Gwan-woo
 */
@Repository
@RequiredArgsConstructor // 필수 인자를 갖는 생성자 자동 생성
public class MapCustomDAO {
	private final MapCustomMapper mapper;

	/**
	 * 등산로 지점 데이터를 가져오는 method 입니다.
	 * @return mapper 파일에 구현된 getHikingRoadSpots()를 호출합니다.
	 */
	public List<HikingRoadSpotDTO> getHikingRoadSpots() {
		return mapper.getHikingRoadSpots();
	}

	/**
	 * 산 선택 화면에서 각 산의 대표 좌표 데이터를 가져오는 method 입니다.
	 * @return mapper 파일의 getSearchMountainSpots()를 호출합니다.
	 */
	public List<MountainDTO> getSearchMountainSpots() {
		return mapper.getSearchMountainSpots();
	}

	/**
	 * 등산로 구간 데이터를 가져오는 method 입니다.
	 * @return mapper 파일의 getHikingRoads()를 호출합니다.
	 */
	public List<HikingRoadDTO> getHikingRoads() {
		return mapper.getHikingRoads();
	}

	/**
	 * 등산로와 관련된 모든 데이터를 json 형태로 종합하여 가져오기 위한 사전작업이 담긴 method 입니다.
	 * @param mtId 사용자가 선택한 산의 고유번호를 매개변수로 가져옵니다.
	 * @return mapper 파일의 getAllRoadsWithCoordsByMtId()를 호출합니다.
	 */
	public com.test.hike.dto.custom.MountainDTO getAllRoadsWithCoordsByMtId(int mtId) {
		return mapper.getAllRoadsWithCoordsByMtId(mtId);
	}

	public void addCourse(CourseDTO course) {
		mapper.addCourse(course);
	}

	/**
	 * 사용자가 선택한 커스텀 등산로 데이터를 사용자 DB 테이블에 삽입하기 위한 method 입니다.
	 * @return mapper 파일의 addCourseData()를 호출합니다.
	 */
	public void addCourseItem(CourseItemDTO courseItem) {
        mapper.addCourseItem(courseItem);
    }
}
