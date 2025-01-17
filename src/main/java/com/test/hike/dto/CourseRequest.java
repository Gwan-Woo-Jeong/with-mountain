package com.test.hike.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CourseRequest {
    private CourseDTO course;
    private List<CourseItemDTO> courseItems;
}



