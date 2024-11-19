package com.test.hike.mapper;

import com.test.hike.dto.ClubDTO;
import com.test.hike.dto.ClubGalleryDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * 클럽 관련 데이터베이스 쿼리를 정의하는 Mapper 인터페이스입니다.
 * @author Kim Yu-ri, Kim Yu-jin
 */
@Mapper
public interface ClubMapper {

	/**
	 * 모든 클럽의 목록을 반환합니다.
	 *
	 * @return List&lt;ClubDTO&gt; 모든 클럽 정보의 리스트
	 */
	List<ClubDTO> clubList();

	/**
	 * 주어진 클럽 ID에 대한 클럽 정보를 반환합니다.
	 *
	 * @param clubId 클럽의 ID
	 * @return ClubDTO 해당 클럽의 정보, 없을 경우 null
	 */
	ClubDTO clubView(String clubId);

	/**
	 * 주어진 클럽 ID에 대한 클럽 스케줄 정보를 반환합니다.
	 *
	 * @param clubId 클럽의 ID
	 * @return ClubDTO 해당 클럽의 스케줄 정보, 없을 경우 null
	 */
	ClubDTO clubScheduler(String clubId);

	/**
	 * 주어진 클럽 ID에 대한 하이킹 정보를 반환합니다.
	 *
	 * @param clubId 클럽의 ID
	 * @return ClubDTO 해당 클럽의 하이킹 정보, 없을 경우 null
	 */
	ClubDTO clubHike(String clubId);

	/**
	 * 주어진 클럽 ID에 대한 갤러리 정보를 반환합니다.
	 *
	 * @param clubId 클럽의 ID
	 * @return ClubDTO 해당 클럽의 갤러리 정보, 없을 경우 null
	 */
	ClubDTO clubGallery(String clubId);

	/**
	 * 주어진 클럽 ID에 대한 갤러리 목록을 반환합니다.
	 *
	 * @param clubId 클럽의 ID
	 * @return List&lt;ClubGalleryDTO&gt; 해당 클럽의 갤러리 정보 리스트
	 */
	List<ClubGalleryDTO> galleryList(String clubId);

	/**
	 * 클럽 갤러리에 새로운 항목을 추가합니다.
	 *
	 * @param clubGalleryDTO 추가할 클럽 갤러리 DTO
	 * @return int 추가된 항목의 수
	 */
	int clubGalleryAdd(ClubGalleryDTO clubGalleryDTO);

	/**
	 * 새로운 클럽을 추가합니다.
	 *
	 * @param dto 추가할 클럽 DTO
	 * @return int 추가된 클럽의 수
	 */
	int clubAdd(ClubDTO dto);
}
