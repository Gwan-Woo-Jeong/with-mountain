package com.test.hike.dto;

import lombok.Data;

@Data
public class CustomCourseDTO { // 코스 구성 테이블
    private int courseItemId; // 시퀀스
    private int roadId; // 등산로 구간 번호
    private int courseId; // 코스 테이블의 시퀀스
    private int courseOrder; // 순번
}
