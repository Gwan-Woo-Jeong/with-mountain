package com.test.hike.controller;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.test.hike.dto.UserTokenDTO;
import com.test.hike.enums.TokenCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.test.hike.dao.UserInfoDAO;
import com.test.hike.dto.LocationDTO;
import com.test.hike.dto.UserInfoDTO;
import com.test.hike.service.LocationService;
import com.test.hike.service.UserService;

/**
 * UserController.java
 * 회원가입 및 로그인에 대한 사용자의 정보와 관련된 Controller입니다.
 * @author user Lee Hye-mi
 *
 */

@Controller
public class UserController {

    @Autowired
    private UserInfoDAO userDAO;
    @Autowired
    private LocationService locationService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * 전체 활동지역 목록을 조회하는 method입니다.
     * @return List<LocationDTO> 모든 활동지역 정보를 포함하는 리스트
     */
    @GetMapping("/getLocations")
    @ResponseBody
    @CrossOrigin
    public List<LocationDTO> getLocations() {
        return locationService.getAllLocations();
    }

    // GET mapping도 .do로 변경
    // @GetMapping("/login")
    // public String loginPage(
    //     @RequestParam(value = "error", required = false) String error,
    //     Model model
    // ) {
    //     if (error != null) {
    //         model.addAttribute("loginError", "이메일 또는 비밀번호가 올바르지 않습니다.");
    //     }
    //     return "redirect:/";
    // }

    
    /**
     * 
     * @return
     */
    @GetMapping("/redirect")
    public String redirect() {

        return "redirect";
    }


    // @PostMapping("/login")
    // @ResponseBody
    // public Map<String, Object> login(
    //         @RequestParam String email,
    //         @RequestParam String password,
    //         HttpSession session
    // ) {
    //     Map<String, Object> response = new HashMap<>();
    //
    //     try {
    //         System.out.println("POST 로그인 시도 - 이메일: " + email);
    //         UserInfoDTO user = userDAO.loginCheck(email, password);
    //
    //         if (user != null) {
    //             session.setAttribute("loginMember", user);
    //             response.put("success", true);
    //             System.out.println("로그인 성공");
    //         } else {
    //             response.put("success", false);
    //             response.put("message", "이메일 또는 비밀번호가 일치하지 않습니다.");
    //             System.out.println("로그인 실패 - 사용자 정보 없음");
    //         }
    //     } catch (Exception e) {
    //         e.printStackTrace();
    //         System.out.println("로그인 처리 중 에러: " + e.getMessage());
    //         response.put("success", false);
    //         response.put("message", "로그인 처리 중 오류가 발생했습니다.");
    //     }
    //
    //     return response;
    // }

    /**
     * 회원가입을 처리하는 method입니다.
     * 이메일 중복 검사,프로필 이미지 저장, 사용자 정보 저장을 수행합니다.
     * 
     * @param user 회원가입할 사용자 정보
     * @param userToken 사용자 인증 토큰 정보
     * @param profileImage 사용자 프로필 이미지 파일
     * @param locationId 사용자 활동 지역
     * @param request 서버 요청 정보
     * @return Map<String, Object> 다음 정보를 포함하는 응답:
 *         - success: 회원가입 성공 여부 (boolean)
 *         - message: 처리 결과 메시지 (String)
 *         - errors: 유효성 검사 실패 시 오류 정보 (Map<String, String>)
 *         - email: 이메일 중복 오류
 *         - locationId: 지역 선택 오류
 *         - profileImage: 이미지 저장 오류
     */
    // 회원가입 처리
    @PostMapping("/signup.do")
    @ResponseBody
    public Map<String, Object> signup(@ModelAttribute UserInfoDTO user,
                                      @ModelAttribute UserTokenDTO userToken,
                                      @RequestParam(required = false) MultipartFile profileImage,
                                      @RequestParam Long locationId,
                                      HttpServletRequest request) {
        Map<String, Object> response = new HashMap<>();
        Map<String, String> errors = new HashMap<>();


        // checkEmailExists 메서드 사용
        if (userDAO.checkEmailExists(user.getEmail()) > 0) {  // isEmailExists를 checkEmailExists로 변경
            errors.put("email", "이미 사용중인 이메일입니다.");
        }

        if (locationId == null || locationId < 1) {
            errors.put("locationId", "활동 지역을 선택해주세요.");
        }

        // 프로필 이미지 처리
        if (profileImage != null && !profileImage.isEmpty()) {
            // 회원가입 시 이미지 저장
            String savedFileName = saveFile(profileImage, request);
            if (savedFileName != null) {
                user.setProfileImage("/resources/static/images/profile/" + savedFileName);
            } else {
                errors.put("profileImage", "프로필 이미지 저장에 실패했습니다.");
            }
        } else {
            // 기본 프로필 이미지 설정
            user.setProfileImage("/resources/static/images/default-profile.svg");
        }

        if (errors.isEmpty()) {
            try {
                user.setLocationId(String.valueOf(locationId));
                user.setPassword(passwordEncoder.encode(user.getPassword()));

                userDAO.insertUser(user);

                int userId = userDAO.getSeqUserInfo();
                userToken.setCategory(TokenCategory.EMAIL);
                userToken.setUser_id(String.valueOf(userId));
                userDAO.insertToken(userToken);

                response.put("success", true);
                response.put("message", "회원가입이 완료되었습니다.");
            } catch (Exception e) {
                e.printStackTrace();
                response.put("success", false);
                response.put("message", "회원가입 처리 중 오류가 발생했습니다.");
            }
        } else {
            response.put("success", false);
            response.put("errors", errors);
        }

        return response;
    }

    
    @Autowired
    private UserService userService;

    /**
     * 이메일 중복 확인하는 method입니다.
     * @param email 중복 검사할 이메일 주소
     * @return 중복된 이메일이 있으면 true를 반환, 없으면 false를 반환
     */
    @PostMapping("/checkEmail.do")
    @ResponseBody
    public Map<String, Boolean> checkEmail(@RequestParam String email) {
        boolean exists = userService.checkEmailExists(email);
        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", exists);
        return response;
    }

    /**
     * 로그아웃 처리를 수행하는 method입니다. 
     * 세션을 종료하고 홈 페이지로 리다이렉트합니다.
     * @param session 현재 사용자의 HttpSession 객체
     * @return 홈 페이지 
     */
    // 로그아웃
    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/home";
    }
    
    /**
     * 프로필 이미지를 서버의 저장된 경로에 저장하는 method입니다.
     * 
     * @param file
     * @param request
     * @return 파일명
     */
    // 프로필 이미지 저장하는 메서드
    private String saveFile(MultipartFile file, HttpServletRequest request) {
        try {
            // 실제 파일 저장 경로 설정
            String uploadPath = request.getServletContext().getRealPath("/resources/static/images/profile/");

            // 디렉토리가 없으면 생성
            File uploadDir = new File(uploadPath);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            // 파일명 생성 (timestamp_originalfilename)
            String originalFileName = file.getOriginalFilename();
            String savedFileName = System.currentTimeMillis() + "_" + originalFileName;

            // 파일 저장
            File destFile = new File(uploadPath + savedFileName);
            file.transferTo(destFile);

            return savedFileName;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    
    /**
     * 사용자의 프로필 이미지를 업데이트하는 method입니다. 
     * 업로드된 이미지를 서버에 저장하고 DB에 경로를 업데이트합니다.
     * @param profileImage 사용자가 업로드한 새로운 프로필 이미지 파일
     * @param request 서버 경로 정보를 얻기 위한 HttpServletRequest 객체
     * @param session 로그인 사용자 정보가 저장된 세션 객체
     * @return Map<String, Object> 다음 정보를 포함한 응답 맵:
     * 			- success: 업데이트 성공 여부(boolean)
     * 			- newImageUrl: 성공 시 새 이미지 경로(String)
     * 			- message: 실패 시 에러 메시지(String)
     */
    // 프로필 이미지 업데이트 (로그인 상태에서만 호출)
    @PostMapping("/updateProfile")
    @ResponseBody
    public Map<String, Object> updateProfile(
            @RequestParam("profileImage") MultipartFile profileImage,
            HttpServletRequest request,
            HttpSession session) {

        Map<String, Object> response = new HashMap<>();

        try {
            UserInfoDTO loginMember = (UserInfoDTO) session.getAttribute("loginMember");

            if (loginMember != null) {
                String savedFileName = saveFile(profileImage, request);
                if (savedFileName != null) {
                    String imagePath = "/resources/static/images/profile/" + savedFileName;

                    // DB에 새 이미지 경로 업데이트
                    loginMember.setProfileImage(imagePath);
                    userDAO.updateProfileImage(loginMember);

                    // 세션 업데이트
                    session.setAttribute("loginMember", loginMember);

                    response.put("success", true);
                    response.put("newImageUrl", imagePath);
                } else {
                    response.put("success", false);
                    response.put("message", "이미지 저장에 실패했습니다.");
                }
            } else {
                response.put("success", false);
                response.put("message", "로그인이 필요합니다.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "프로필 이미지 업데이트 중 오류가 발생했습니다.");
        }

        return response;
    }


}