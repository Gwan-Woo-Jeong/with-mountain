package com.test.hike.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/club")
public class ClubController {

	@GetMapping("")
	public String index() {
		return "club.index";
	}

	
	@GetMapping("/view") 
	public String view() {
		return "club.club-view";
	}
	
	@GetMapping("/list") 
	public String list() {
		return "club.list";
	}

}
