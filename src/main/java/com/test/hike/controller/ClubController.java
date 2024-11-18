package com.test.hike.controller;

import com.test.hike.dao.ClubDAO;
import com.test.hike.dto.ClubDTO;
import com.test.hike.dto.ClubGalleryDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * ClubController.java
 * 모임와 관련된 Controller입니다.
 * @author Kim Yu-ri, Kim Yu-jin
 */
@Controller
@RequiredArgsConstructor
@RequestMapping("/club")
public class ClubController {


	@Autowired
	private ServletContext servletContext; //application 객체

	private final ClubDAO dao;

	/**
	 * 등록된 모든 모임의 리스트 페이지를 출력하는 method 입니다.
	 * @param model
	 * @return 모임 리스트 Index 페이지
	 */
	@GetMapping("")
	public String index(Model model) {

		List<ClubDTO> clubList = dao.clubList();
		model.addAttribute("clubList", clubList);

		return "club.index";
	}

	/**
	 * 모임을 둥록하는 페이지를 출력하는 method 입니다.
	 * @return 모임을 등록하는 Add 페이지
	 */
	@GetMapping("/add")
	public String add() {
		return "club.add";
	}

	/**
	 * 선택한 모임 페이지를 출력하는 method 입니다.
	 * @param model
	 * @param clubId
	 * @return 선택한 모임 View 페이지
	 */
	@GetMapping("/view")
	public String view(Model model, String clubId) {

			ClubDTO clubDTO = dao.clubView(clubId);
			model.addAttribute("clubDTO", clubDTO);

			return "club.view";
	}

	/**
	 * 모임의 스케줄 정보를 조회하는 메서드입니다.
	 *
	 * 이 메서드는 clubID를 기반으로 클럽의 스케줄 정보를 데이터베이스에서 조회하고,
	 * 해당 정보를 모델에 추가하여 뷰에 전달합니다.
	 *
	 * @param model 뷰에 전달할 데이터를 담는 모델 객체
	 * @param clubId 조회할 모임의 ID
	 * @return 모임 스케줄 정보를 표시하는 뷰의 이름
	 */
	@GetMapping("/scheduler")
	public String scheduler(Model model, String clubId) {


		ClubDTO clubDTO = dao.clubScheduler(clubId);
		model.addAttribute("clubDTO", clubDTO);

		return "club.scheduler";
	}

	/**
	 * 모임의 하이킹 정보를 조회하는 메서드입니다.
	 *
	 * 이 메서드는 모임 ID를 기반으로 모임의 하이킹 정보를 데이터베이스에서 조회하고,
	 * 해당 정보를 모델에 추가하여 뷰에 전달합니다.
	 *
	 * @param model 뷰에 전달할 데이터를 담는 모델 객체
	 * @param clubId 조회할 모임의 ID
	 * @return 모임 하이킹 정보를 표시하는 뷰의 이름
	 */
	@GetMapping("/hike")
	public String hike(Model model, String clubId) {

		ClubDTO clubDTO = dao.clubHike(clubId);
		model.addAttribute("clubDTO", clubDTO);

		return "club.hike";
	}

	/**
	 * 모임의 갤러리 정보를 조회하는 메서드입니다.
	 *
	 * 이 메서드는 모임 ID를 기반으로 모임의 갤러리 정보를 데이터베이스에서 조회하고,
	 * 해당 정보를 모델에 추가하여 뷰에 전달합니다.
	 *
	 * @param model 뷰에 전달할 데이터를 담는 모델 객체
	 * @param clubId 조회할 모임의 ID
	 * @return 모임 갤러리 정보를 표시하는 뷰의 이름
	 */
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

	/**
	 * 선택한 모임의 멤버 페이지를 출력하는 method 입니다.
	 * @return 선택한 모임의 멤버 View 페이지
	 */
	@GetMapping("/member")
	public String member() {
		return "club.club-member";
	}

	/**
	 * 선택한 모임의 정보 수정 페이지를 출력하는 method 입니다.
	 * @return 선택한 모임의 정보 수정 View 페이지
	 */
	@GetMapping("/edit")
	public String edit() {
		return "club.edit";
	}

	/**
	 * 모임을 추가하는 메서드입니다.
	 * 이 메서드는 HTTP POST 요청을 통해 클럽 정보를 받아와서
	 * DB Club테이블에 데이터를 추가합니다. 요청 파라미터는
	 * {@link HttpServletRequest}를 통해 전달되며, club 정보는
	 * {@link ClubDTO} 객체에 설정됩니다.
	 *
	 * @param request club 정보를 포함하는 HTTP 요청 객체
	 * @param model 뷰에 전달할 데이터를 담는 모델 객체
	 * @return club 추가 결과에 따라 리다이렉트할 URL
	 *         - 성공 시 "/home"으로 리다이렉트
	 *         - 실패 시 "/add"로 리다이렉트하며 오류 메시지를 모델에 추가
	 */
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