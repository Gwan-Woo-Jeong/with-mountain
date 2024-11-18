package com.test.hike.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * MyPageController.java
 * 나의등산(마이페이지) 페이지와 관련된 Controller입니다.
 * @author Lee Hye-mi
 *
 */
@Controller
@RequestMapping("/mypage")
public class MyPageController {
	
	/**
	 * 나의등산(마이페이지) 메인 화면을 보여주는 method입니다.
	 * @return 마이페이지 메인 뷰 페이지 경로
	 */
    @GetMapping("")
    public String index() {
        return "mypage.index"; 
    }
    /**
     * 회원정보 수정 페이지를 보여주는 method입니다.
     * @return 회원정보 수정 뷰 페이지 경로
     */
    @GetMapping("/infoedit")
    public String infoedit() {
        return "/mypage/infoedit";  
    }
}

