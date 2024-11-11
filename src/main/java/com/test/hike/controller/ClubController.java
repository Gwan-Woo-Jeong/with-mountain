package com.test.hike.controller;

import com.test.hike.dao.ClubDAO;
import com.test.hike.dto.ClubDTO;
import com.test.hike.dto.ClubGalleryDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/club")
public class ClubController {

	private final ClubDAO dao;

	@GetMapping("")
	public String index(Model model) {

		List<ClubDTO> clubList = dao.clubList();
		model.addAttribute("clubList", clubList);

		return "club.index";
	}

	@GetMapping("/template")
	public String template() {
		return "club.template";
	}

	@GetMapping("/add")
	public String add() {
		return "club.add";
	}

	@GetMapping("/view")
	public String view(Model model, String club_id) {

		ClubDTO clubDTO = dao.clubView(club_id);
		model.addAttribute("clubDTO", clubDTO);

		return "club.view";
	}

	@GetMapping("/scheduler")
	public String scheduler(Model model, String club_id) {


		ClubDTO clubDTO = dao.clubScheduler(club_id);
		model.addAttribute("clubDTO", clubDTO);

		return "club.scheduler";
	}


	@GetMapping("/hike")
	public String hike(Model model, String club_id) {

		ClubDTO clubDTO = dao.clubHike(club_id);
		model.addAttribute("clubDTO", clubDTO);

		return "club.hike";
	}

	@GetMapping("/gallery")
	public String gallery(Model model,
						  @RequestParam String club_id) {

		ClubDTO clubDTO = dao.clubGallery(club_id);
		model.addAttribute("clubDTO", clubDTO);


		List<ClubGalleryDTO> galleryList = dao.galleryList(club_id);
		model.addAttribute("galleryList", galleryList);

		return "club.gallery";
	}

//	@GetMapping("/gallery")
//	public String galleryList(Model model) {
//
//		List<ClubGalleryDTO> galleryList = dao.galleryList();
//		model.addAttribute("galleryList", galleryList);
//
//		return "club.gallery";
//	}

//	@PostMapping ("/galleryok")
//	public String galleryok(Model model, ClubGalleryDTO clubGalleryDTO) {
//
//		int result = dao.clubGalleryAdd(clubGalleryDTO);
//
//		if(result == 1) {
//			return "redirect:/club/gallery";
//		} else {
//			return "redirect:/club/gallery";
//		}
//	}

	@GetMapping("/member")
	public String member() {
		return "club.club-member";
	}

	@GetMapping("/edit")
	public String edit() {
		return "club.edit";
	}

}