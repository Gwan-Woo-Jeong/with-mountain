package com.test.hike.mapper;

import com.test.hike.dto.ClubDTO;
import com.test.hike.dto.ClubGalleryDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ClubMapper {

	List<ClubDTO> clubList();

	ClubDTO clubView(String club_id);

	ClubDTO clubScheduler(String club_id);

	ClubDTO clubHike(String club_id);

	ClubDTO clubGallery(String club_id);

	List<ClubGalleryDTO> galleryList(String club_id);

	int clubGalleryAdd(ClubGalleryDTO clubGalleryDTO);

	int clubAdd(ClubDTO dto);

}

