package com.test.hike.controller;

import com.test.hike.dao.ClubDAO;
import com.test.hike.dto.ClubDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class HomeController {

    private final ClubDAO dao;

    @GetMapping("/")
    public String redirect(RedirectAttributes redirectAttributes) {

        List<ClubDTO> clubList = dao.clubList();
        redirectAttributes.addFlashAttribute("clubList", clubList);

        return "redirect:/home";
    }

    @GetMapping("home")
    public String index(Model model) {

        List<ClubDTO> clubList = dao.clubList();
        model.addAttribute("clubList", clubList);

        return "index";
    }
}
