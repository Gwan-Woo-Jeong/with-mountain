package com.test.hike.dao;

import com.test.hike.dto.ClubDTO;
import com.test.hike.dto.ClubGalleryDTO;
import com.test.hike.mapper.ClubMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * ClubDAO는 클럽 관련 데이터베이스 작업을 수행하는 클래스입니다.
 * 이 클래스는 ClubMapper를 통해 데이터베이스와 상호작용합니다.
 */
@Repository
@RequiredArgsConstructor
public class ClubDAO {

    private final ClubMapper mapper;

    /**
     * 모든 클럽의 목록을 반환합니다.
     *
     * @return 클럽 DTO의 리스트
     */
    public List<ClubDTO> clubList() {

        return mapper.clubList();

    }

    /**
     * 주어진 클럽 ID에 대한 클럽 정보를 반환합니다.
     *
     * @param clubId 클럽의 ID
     * @return 클럽 DTO
     */
    public ClubDTO clubView(String clubId) {

        return mapper.clubView(clubId);
    }

    /**
     * 주어진 클럽 ID에 대한 클럽 스케줄 정보를 반환합니다.
     *
     * @param clubId 클럽의 ID
     * @return 클럽 DTO
     */
    public ClubDTO clubScheduler(String clubId) {

        return mapper.clubScheduler(clubId);
    }

    /**
     * 주어진 클럽 ID에 대한 하이킹 정보를 반환합니다.
     *
     * @param clubId 클럽의 ID
     * @return 클럽 DTO
     */
    public ClubDTO clubHike(String clubId) {

        return mapper.clubHike(clubId);
    }

    /**
     * 주어진 클럽 ID에 대한 갤러리 정보를 반환합니다.
     *
     * @param clubId 클럽의 ID
     * @return 클럽 DTO
     */
    public ClubDTO clubGallery(String clubId) {

        return mapper.clubGallery(clubId);
    }

    /**
     * 주어진 클럽 ID에 대한 갤러리 목록을 반환합니다.
     *
     * @param clubId 클럽의 ID
     * @return 클럽 갤러리 DTO의 리스트
     */
    public List<ClubGalleryDTO> galleryList(String clubId) {

        return mapper.galleryList(clubId);

    }

    /**
     * 클럽 갤러리에 새로운 항목을 추가합니다.
     *
     * @param clubGalleryDTO 추가할 클럽 갤러리 DTO
     * @return 추가된 항목의 수
     */
    public int clubGalleryAdd (ClubGalleryDTO clubGalleryDTO) {

        return mapper.clubGalleryAdd(clubGalleryDTO);
    }

    /**
     * 새로운 클럽을 추가합니다.
     *
     * @param dto 추가할 클럽 DTO
     * @return 추가된 클럽의 수
     */
    public int clubAdd(ClubDTO dto) {

        return mapper.clubAdd(dto);
    }
    
}
