package com.test.hike.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.test.hike.dto.LocationDTO;
import com.test.hike.mapper.LocationMapper;

/**
 * 활동지역 정보를 관리하는 Service 클래스입니다.
 * @author user Lee Hye-mi
 *
 */
@Service
public class LocationService {
    
    @Autowired
    private LocationMapper locationMapper;  // SqlSession 대신 Mapper 직접 주입
    
    /**
     * 모든 활동지역 정보를 조회하는 method입니다.
     * @return List<LocationDTO> 전체 활동지역 목록
     * 	조회 실패 시 빈 ArrayList 반환
     */
    public List<LocationDTO> getAllLocations() {
        try {
            List<LocationDTO> locations = locationMapper.getAllLocations();
            
            // LocationService의 getAllLocations() 메서드에서 로그 통해서 제대호 조회되는지 확인하려고
            if (locations.isEmpty()) {
                System.out.println("조회된 데이터가 없습니다.");
            } else {
                System.out.println("조회된 지역 수: " + locations.size());
                locations.forEach(loc -> System.out.println(loc.getLocationId() + ": " + loc.getName()));
            }
            //여기까지! 확인하고 지워도됨
            
            
            System.out.println("조회된 지역 수: " + locations.size());
            locations.forEach(loc -> System.out.println(loc.getLocationId() + ": " + loc.getName()));
            return locations;
        } catch(Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }
}