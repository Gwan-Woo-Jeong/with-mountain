package com.test.hike.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.test.hike.dao.MapCustomDAO;
import com.test.hike.dto.CustomCourseDTO;
import com.test.hike.dto.HikingRoadSpotDTO;
import com.test.hike.dto.MountainDTO;
import com.test.hike.mapper.MapCustomMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

/**
 * CourseController.java
 * 등산로 코스와 관련된 Controller입니다.
 * @author Kim Young-jin, Jeong Gwan-woo
 */
@Controller
@RequiredArgsConstructor // 의존 주입
@RequestMapping("/course")
public class CourseController {
    private final MapCustomDAO dao;
    private final MapCustomMapper mapper;
    private final ObjectMapper objectMapper;

    /**
     * 전국의 산을 선택하는 코스 페이지를 출력하는 method 입니다.
     * @param model
     * @return 산 선택 View 페이지
     */
    @GetMapping("")
    public String search(Model model) {

        List<MountainDTO> mountains = dao.getSearchMountainSpots();

        model.addAttribute("mountains", mountains);

        return "course.search";
    }

    /**
     * Oracle DB에서 등산로 관련 데이터를 가져온 후, 등산로 커스텀 페이지에 전달하면서 페이지를 호출하는 method 입니다.
     * @param model
     * @param mtId
     * @return 산 등산로 커스텀 View 페이지
     */
    @GetMapping("view")
    public String view(Model model, String mtId) {
        // For Test
         com.test.hike.dto.custom.MountainDTO result = dao.getAllRoadsWithCoordsByMtId(Integer.parseInt(mtId));

         try {
             String jsonResult = objectMapper.writeValueAsString(result);
             model.addAttribute("data", jsonResult);
         } catch (Exception e) {
             e.printStackTrace();
         }
        List<HikingRoadSpotDTO> spotList = dao.getHikingRoadSpots(); // DTO를 List에 담아서 여러개 가져오기 위함

        // Jackson 라이브러리를 사용해서 spotList를 JSON형 데이터로 변환
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String spotListJson = objectMapper.writeValueAsString(spotList);
            model.addAttribute("spotListJson", spotListJson);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return "course.view";
    }

    /**
     * 사용자가 선택한 등산로 커스텀 정보를 사용자 정보로 보내는 데 사용하는 method 입니다.
     * @param lines
     * @param hikeTime
     * @param hikeDistance
     * @param model
     * @return 산 등산로 커스텀 view 페이지
     */
    @PostMapping("view")
    public String viewOk(@RequestParam int lines, @RequestParam double hikeTime, @RequestParam double hikeDistance, Model model) {
        model.addAttribute("lines", lines);
        model.addAttribute("hikeTime", hikeTime);
        model.addAttribute("hikeDistance", hikeDistance);

        return "course.view";
    }

    /**
     * 산 등산로 커스텀 view 페이지에서 사용자가 커스터마이징한 등산로의 정보를 DB 서버로 전송하는 method 입니다.
     * @return view페이지를 redirecting 하지만, 사용자의 등산로 구간번호, 구간 길이, 소요 시간 정보를 가지고 있습니다.
     */
    @PostMapping("addCourseData")
    public String addCourseData() {
        List<CustomCourseDTO> customCourseList = dao.addCourseData();

        return "redirect:/course/view";
    }

}
