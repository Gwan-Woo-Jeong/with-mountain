package com.test.hike.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CourseDTO {
	private int courseId;
	private int mtId;
	private int userId;
	private String title;
	private String type;
	private String image;
	private int time;
	private float distance;
}
