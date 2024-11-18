package com.test.hike.dto.custom;

import lombok.Data;

import java.util.List;

/**
 * 등산로 정보를 담는 DTO 입니다.
 * 등산로 구간에 대한 부가 정보와 CoordDTO가 포함되어 있습니다.
 * @author Kim Young-jin, Jeong Gwan-woo
 */
@Data
public class RoadDTO {
	private int roadId;
    private double roadKm;
    private String roadLevel;
    private int roadTimeUp;
    private int roadTimeDown;
    private List<CoordDTO> coordList;
}