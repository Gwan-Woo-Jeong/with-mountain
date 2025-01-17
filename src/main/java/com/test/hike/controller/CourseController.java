package com.test.hike.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.test.hike.dao.MapCustomDAO;
import com.test.hike.dto.CourseDTO;
import com.test.hike.dto.CourseItemDTO;
import com.test.hike.dto.HikingRoadSpotDTO;
import com.test.hike.dto.MountainDTO;
import com.test.hike.dto.CourseRequest;
import com.test.hike.mapper.MapCustomMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

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
     * @param model 산 선택 정보가 들어갈 객체
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
     * @param model 등산로 관련 데이터가 들어갈 객체
     * @param mtId  사용자가 선택한 산의 고유번호
     * @return 산 등산로 커스텀 View 페이지
     */
    @GetMapping("view")
    public String view(Model model, String mtId) {

        // For Test
/*
         com.test.hike.dto.custom.MountainDTO result = dao.getAllRoadsWithCoordsByMtId(Integer.parseInt(mtId));

         try {
             String jsonResult = objectMapper.writeValueAsString(result);
             model.addAttribute("data", jsonResult);
         } catch (Exception e) {
             e.printStackTrace();
         }
*/

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
     *
     * @param lines        등산로 구간의 수
     * @param hikeTime     등산로 구간의 총 소요 시간
     * @param hikeDistance 등산로 구간의 총 거리
     * @param model        등산로 정보를 담아 보낼 객체
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
     * @return 사용자의 커스터마이징된 등산로 구간번호, 구간 길이, 소요 시간 정보를 가진 채로 redirect 합니다.
     */
    @PostMapping("add")
    public ResponseEntity<String> addCourse(@RequestBody CourseRequest request, HttpServletRequest httpRequest) {
        try {
            CourseDTO reqCourse = request.getCourse();
            List<CourseItemDTO> courseItems = request.getCourseItems();

            String fileName = UUID.randomUUID() + ".png";
            String base64Image = reqCourse.getImage();

            if (base64Image.startsWith("data:")) {
                int commaIndex = base64Image.indexOf(',');
                if (commaIndex >= 0) {
                    base64Image = base64Image.substring(commaIndex + 1);
                } else {
                    throw new IllegalArgumentException("[course/add] 유효하지 않은  base64 이미지 데이터");
                }
            }

            base64Image = base64Image.replaceAll("\\s", "");
            byte[] imageBytes = Base64.getDecoder().decode(base64Image);

            String appRootPath = httpRequest.getSession().getServletContext().getRealPath("/");
            String projectPath = Paths.get(appRootPath).getParent().getParent().toString();
            String uploadDir = projectPath + "/src/main/webapp/resources/static/images/course/"; // 임시로 프로젝트 디렉터리 내 저장

            File directory = new File(uploadDir);
            if (!directory.exists()) {
                if (!directory.mkdirs()) {
                    throw new RuntimeException("[course/add] 디렉터리 생성 실패: " + directory.getAbsolutePath());
                }
            }

            File outputFile = new File(directory, fileName);
            Files.write(outputFile.toPath(), imageBytes);
            System.out.println("코스 이미지 저장 경로: " + outputFile.getAbsolutePath());

            CourseDTO course = CourseDTO.builder()
                    .mtId(reqCourse.getMtId())
                    .userId(reqCourse.getUserId())
                    .title(reqCourse.getTitle())
                    .type(reqCourse.getType())
                    .image(fileName)
                    .time(reqCourse.getTime())
                    .distance(reqCourse.getDistance())
                    .build();

            dao.addCourse(course);
            courseItems.forEach(dao::addCourseItem);

            return ResponseEntity.ok("[course/add] Success");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("[course/add] Error: " + e.getMessage());
        }
    }
}
