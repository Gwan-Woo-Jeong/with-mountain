package com.test.hike.dao;

import com.test.hike.dto.ClubDTO;
import com.test.hike.dto.ClubGalleryDTO;
import com.test.hike.mapper.ClubMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class ClubDAO {

    private final ClubMapper mapper;

    public List<ClubDTO> clubList() {

        return mapper.clubList();

    }

    public ClubDTO clubView(String club_id) {

        return mapper.clubView(club_id);
    }

    public ClubDTO clubScheduler(String club_id) {

        return mapper.clubScheduler(club_id);
    }


    public ClubDTO clubHike(String club_id) {

        return mapper.clubHike(club_id);
    }

    public ClubDTO clubGallery(String club_id) {

        return mapper.clubGallery(club_id);
    }


    public List<ClubGalleryDTO> galleryList(String club_id) {

        return mapper.galleryList(club_id);

    }

    public int clubGalleryAdd (ClubGalleryDTO clubGalleryDTO) {

        return mapper.clubGalleryAdd(clubGalleryDTO);
    }

    public int clubAdd(ClubDTO dto) {

        return mapper.clubAdd(dto);
    }

}
