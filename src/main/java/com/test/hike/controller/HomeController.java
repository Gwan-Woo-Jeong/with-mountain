package com.test.hike.controller;

import com.test.hike.dao.ClubDAO;
import com.test.hike.dto.ClubDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;


/**
 * CommunityController.java
 * 메인페이지와 관련된 Controller입니다.
 * @author Jeong Gwan-woo
 */
@Controller
@RequiredArgsConstructor
public class HomeController {

    private final ClubDAO dao;



    /**
     * home으로 리디렉션 하는 method입니다.
     * @param redirectAttributes 리디렉션 시에 사용할 플래시 속성을 추가하기 위한 객체
     * @return home 리디렉션을 반환.
     */
    @GetMapping("/")
    public String redirect(RedirectAttributes redirectAttributes) {

        List<ClubDTO> clubList = dao.clubList();
        redirectAttributes.addFlashAttribute("clubList", clubList);

        return "redirect:/home";
    }


    /**
     * 메인 페이지를 출력하는 method 입니다.
     * @param model 뷰에 전달할 데이터를 저장하는 모델 객체.
     * @return 메인페이지 "home" 반환.
     */
    @GetMapping("home")
    public String index(Model model) {

        List<ClubDTO> clubList = dao.clubList();
        model.addAttribute("clubList", clubList);

        return "index";
    }
}
