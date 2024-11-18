package com.test.hike.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * CourseController.java
 * 산 개별 페이지와 관련된 Controller입니다.
 * @author Jeong Gwan-woo
 */
@Controller
public class MountainController {

    /**
     * 전국의 산을 선택하는 코스 페이지를 출력하는 method 입니다.
     * @param mtId 사용자가 선택한 산의 고유번호
     * @return 산 선택 View 페이지
     */
    @GetMapping("mountain")
    public String index(String mtId) {
        return "mountain";
    }
}
