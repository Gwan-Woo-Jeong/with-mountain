package com.test.hike.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.test.hike.dto.LocationDTO;
import com.test.hike.service.LocationService;

/**
 * LocationController.java
 * 활동 지역 관련 요청을 처리하는 Controller입니다.
 * 회원가입 폼 및 지역 정보를 제공하는 메서드를 포함합니다.
 * @author Lee Hye-mi
 */
@Controller
public class LocationController {

    @Autowired
    private LocationService locationService;

    /**
     * 회원가입 폼을 표시하는 메서드입니다.
     *
     * @param model 회원가입 폼에 필요한 데이터를 담기 위한 모델 객체
     * @return 회원가입 폼 JSP 경로
     */
    @GetMapping("/signup")  // URL 수정
    public String showSignupForm(Model model) {
        model.addAttribute("locations", locationService.getAllLocations());
        return "user/signup";  // 실제 회원가입 폼이 있는 JSP 경로
    }

    /**
     * 회원가입 모달이 열릴 때 지역 데이터를 가져와서 select 박스에 표시하는 메서드입니다.
     *
     * @return List&lt;LocationDTO&gt; 모든 활동 지역 정보의 리스트
     */
    @GetMapping("/getAllLocations.do")
    @ResponseBody
    public List<LocationDTO> getAllLocations() {
        return locationService.getAllLocations();
    }
}
