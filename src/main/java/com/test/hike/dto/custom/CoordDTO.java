package com.test.hike.dto.custom;

import lombok.Data;

/**
 * 등산로 정보가 들어갈 DTO 입니다.
 * 등산로 구간의 좌표와 일련번호 정보가 포함되어 있습니다.
 * @author Kim Young-jin, Jeong Gwan-woo
 */
@Data
public class CoordDTO {
	private int coordId;
    private int roadSeq;
    private double roadX;
    private double roadY;
}