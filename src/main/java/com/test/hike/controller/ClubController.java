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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes
	
	@GetMapping("/view") 
	public String view() {
		return "club.view";
	}
	
	@GetMapping("/template") 
<<<<<<< Updated upstream
=======

	@GetMapping("/template")
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
	public String list() {
=======


	@GetMapping("/template")
	public String template() {
>>>>>>> Stashed changes
		return "club.template";
	}
	
	@GetMapping("/add") 
	public String add() {
		return "club.add";
	}
	
	@GetMapping("/view") 
	public String view() {
		return "club.view";
	}

	@GetMapping("/scheduler")
	public String scheduler() {
		return "club.scheduler";
	}

	@GetMapping("/hike")
	public String hike() {
		return "club.hike";
	}

	@GetMapping("/gallery")
	public String gallery() {
		return "club.gallery";
	}

	@GetMapping("/member")
	public String member() {
		return "club.club-member";
	}

	@GetMapping("/edit")
	public String edit() {
		return "club.edit";
	}
}

