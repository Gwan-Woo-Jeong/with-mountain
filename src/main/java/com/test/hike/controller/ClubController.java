package com.test.hike.controller;

import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.test.hike.dao.ClubDAO;
import com.test.hike.dto.ClubDTO;
import com.test.hike.dto.ClubGalleryDTO;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("/club")
public class ClubController {


	@Autowired
	private ServletContext servletContext; //application 객체

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
	public String view(Model model, String clubId) {

			ClubDTO clubDTO = dao.clubView(clubId);
			model.addAttribute("clubDTO", clubDTO);

			return "club.view";
	}

	@GetMapping("/scheduler")
	public String scheduler(Model model, String clubId) {


		ClubDTO clubDTO = dao.clubScheduler(clubId);
		model.addAttribute("clubDTO", clubDTO);

		return "club.scheduler";
	}


	@GetMapping("/hike")
	public String hike(Model model, String clubId) {

		ClubDTO clubDTO = dao.clubHike(clubId);
		model.addAttribute("clubDTO", clubDTO);

		return "club.hike";
	}

	@GetMapping("/gallery")
	public String gallery(Model model,
						  @RequestParam String clubId) {

		ClubDTO clubDTO = dao.clubGallery(clubId);
		model.addAttribute("clubDTO", clubDTO);


		List<ClubGalleryDTO> galleryList = dao.galleryList(clubId);
		model.addAttribute("galleryList", galleryList);

		return "club.gallery";
	}

//	@PostMapping ("/galleryok")
//	public String galleryok(Model model,
//							@ModelAttribute ClubGalleryDTO clubGalleryDTO,
//							@RequestParam("image") MultipartFile image) {
//
//		if (!image.isEmpty()) {
//
//			String imagePath = saveImage(image);
//			clubGalleryDTO.setImage(imagePath);
//		}
//
//		int result = dao.clubGalleryAdd(clubGalleryDTO);
//
//			if (result > 0) {
//				return "redirect:"; // 성공 시 리다이렉트
//			} else {
//				model.addAttribute("error", "모임 사진첩에 사진을 등록하셨습니다.");
//				return "redirect:/gallery"; // 실패 시 다시 폼으로
//			}
//	}

	@PostMapping ("/galleryok.do")
	public String galleryok(Model model,  @RequestParam("image") MultipartFile attach, HttpServletRequest request) {
		ClubGalleryDTO clubGalleryDTO = new ClubGalleryDTO();
		clubGalleryDTO.setClubGalleryId(request.getParameter("clubGalleryId"));
		// clubId와 scheduleId를 사용하지 않음
		// clubGalleryDTO.setClubId(request.getParameter("clubId")); // clubId 제거
		// clubGalleryDTO.setScheduleId(request.getParameter("scheduleId")); // scheduleId 제거
		clubGalleryDTO.setGalleryDate(request.getParameter("galleryDate")); // 필요 시 변환
		clubGalleryDTO.setGalleryImage(attach.getOriginalFilename());

		// 파일 저장 로직 제거 (메모리에만 저장)
//		if (!attach.isEmpty()) {
//			// 파일을 메모리에서 처리하거나, 다른 방식으로 사용
//			// 예: 이미지 데이터를 DB에 저장하는 로직 추가
//		}

		int result = dao.clubGalleryAdd(clubGalleryDTO);

		if (result > 0) {
			return "redirect:/gallery"; // clubId를 사용하지 않으므로 제거
		} else {
			model.addAttribute("error", "사진 등록에 실패했습니다. 다시 시도해 주세요.");
			return "redirect:/gallery"; // clubId를 사용하지 않으므로 제거
		}

	}


//	private String saveImage(MultipartFile file) {
////		String fileName = file.getOriginalFilename();
//		String filename = getFileName(attach.getOriginalFilename());
//		String filePath = "/resources/static/images/club/" + fileName; // 저장할 경로 설정
//		System.out.println("file"+file);
//
//		try {
//			File destinationFile = new File(filePath);
//			file.transferTo(destinationFile); // 파일 저장
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//
//		return filePath; // 저장된 파일 경로 반환
//	}

	@GetMapping("/member")
	public String member() {
		return "club.club-member";
	}

	@GetMapping("/edit")
	public String edit() {
		return "club.edit";
	}

	@PostMapping("/addok.do")
	public String addClub(HttpServletRequest request, Model model) {

		ClubDTO dto = new ClubDTO();

		// 요청 파라미터를 DTO에 설정
		dto.setClubId(request.getParameter("clubId"));
		dto.setClubLocationId(request.getParameter("clubLocationId")); // 수정된 필드 이름
		dto.setClubName(request.getParameter("clubName")); // 수정된 필드 이름
		dto.setClubIsPrivate(request.getParameter("clubIsPrivate")); // 수정된 필드 이름
		dto.setClubMaxMember(request.getParameter("clubMaxMember")); // 수정된 필드 이름
		dto.setClubIntro(request.getParameter("clubIntro")); // 수정된 필드 이름
		dto.setClubImage(request.getParameter("clubImage")); // 파일 경로 처리 필요
		dto.setClubCode(request.getParameter("clubCode")); // 수정된 필드 이름

		int result = dao.clubAdd(dto);

		if (result > 0) {
//            model.addAttribute("성공했습니다.");
			return "redirect:/home"; // 성공 시 리다이렉트
		} else {
			model.addAttribute("error", "모임 생성에 실패했습니다.");
			return "redirect:/add"; // 실패 시 다시 폼으로
		}
	}

}