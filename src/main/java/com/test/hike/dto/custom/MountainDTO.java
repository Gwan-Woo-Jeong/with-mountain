package com.test.hike.dto.custom;

import lombok.Data;

import java.util.List;

/**
 *  산의 정보를 담는 DTO 입니다.
 *  산 선택 페이지에서 출력될 산의 정보, RoadDTO, CoordDTO가 포함되어 있습니다.
 *  @author Kim Young-jin, Jeong Gwan-woo
 */
@Data
public class MountainDTO {
	private String mtId;
    private String mtName;
    private String mtAddress;
    private double mtX;
    private double mtY;
    private List<RoadDTO> roadList;
}