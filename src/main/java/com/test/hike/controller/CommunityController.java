package com.test.hike.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.test.hike.dao.CommunityDAO;
import com.test.hike.dto.CommentsDTO;
import com.test.hike.dto.CommunityBoardDTO;

import lombok.RequiredArgsConstructor;


/**
 * CommunityController.java
 * 커뮤니티와 관련된 Controller입니다.
 * @author Son Min-ji
 */
@Controller
@RequiredArgsConstructor
@RequestMapping("/community")
public class CommunityController {
	
	private final CommunityDAO dao;
	
	
	//글 리스트
	/**
	 * 커뮤니티 사진 게시판 목록을 출력하는 method 입니다.
	 * @param model 뷰에 전달할 데이터를 저장하는 모델 객체.
	 * @return 사진 게시판 목록 "community" 반환.
	 */
    @GetMapping("")
    public String photo(Model model) {
    	
    	List<CommunityBoardDTO> boardList = dao.boardList("photo");
    	model.addAttribute("boardList", boardList);
    	
        return "community.photo";
    }
    
    /**
	 * 커뮤니티 자유 게시판 목록을 출력하는 method 입니다.
	 * @param model 뷰에 전달할 데이터를 저장하는 모델 객체.
	 * @return 자유 게시판 목록 "community.free" 반환.
	 */
    @GetMapping("/free")
    public String free(Model model) {
    	
    	List<CommunityBoardDTO> boardList = dao.boardList("free");
    	model.addAttribute("boardList", boardList);
    	
    	return "community.free";
    }
    
    /**
	 * 커뮤니티 질문 게시판 목록을 출력하는 method 입니다.
	 * @param model 뷰에 전달할 데이터를 저장하는 모델 객체.
	 * @return 질문 게시판 목록을 "community.qna" 반환.
	 */
    @GetMapping("/qna")
    public String qna(Model model) {
    	
    	List<CommunityBoardDTO> boardList = dao.boardList("qna");
    	model.addAttribute("boardList", boardList);
    	
    	return "community.qna";
    }
    
    //글 추가
    /**
     * 글 추가 페이지로 이동하는 method 입니다.
     * 
     * @return 글 추가 페이지 "community.add"를 반환.
     */
    @GetMapping("/add")
    public String add() {
    	return "community.add";
    }
    
    //글 추가
    /**
     * 사용자가 작성한 게시글을 처리하는 method 입니다.
     * 
     * @param boardDTO 사용자가 입력한 게시글 정보(제목, 내용, 해시태그 등)를 담은 DTO 객체.
     * @return 게시글이 성공적으로 추가되었음을 알리는 메시지.
     */
    @PostMapping("/addok")
    public String addok(@RequestBody CommunityBoardDTO boardDTO) {
        // boardDTO에는 title, content, hashtags 등의 값이 자동으로 매핑됩니다.
        System.out.println("제목: " + boardDTO.getTitle());
        System.out.println("내용: " + boardDTO.getContent());
        System.out.println("해시태그: " + boardDTO.getHashtags());
        System.out.println("게시판 종류: " + boardDTO.getType());

        // 게시물 추가 로직
        dao.boardAdd(boardDTO);

        return "게시글이 성공적으로 추가되었습니다.";  // 응답 메시지 또는 리다이렉트 URL을 반환
    }


    //글 수정
    /**
     * 글 수정 페이지로 이동하고, 수정할 게시글의 정보를 조회하는 method 입니다.
     * 
     * @param model 뷰에 전달할 데이터를 저장하는 모델 객체.
     * @param cm_board_id 수정할 게시글 고유 ID.
     * @return 게시글 수정 페이지 "community.edit"를 반환.
     */
    @GetMapping("/edit")
    public String edit(Model model, @RequestParam("cm_board_id") Integer cm_board_id) {
    	
    	CommunityBoardDTO communityBoardDTO = dao.boardView(cm_board_id);
    	List<String> tags = dao.boardTags(cm_board_id);
    	
    	communityBoardDTO.setHashtags(tags);
    	model.addAttribute("communityBoardDTO", communityBoardDTO);
    	
    	return "community.edit";
    }
    
    //글 수정
    /**
     * 사용자가 수정한 게시글을 처리하는 method 입니다.
     * 
     * @param boardDTO 수정된 게시글 정보를 담은 DTO 객체.
     * @return 수정된 게시글의 상세 페이지 redirect.
     */
    @PostMapping("/editok")
    public String editok(@ModelAttribute CommunityBoardDTO boardDTO) {
    	
    	dao.boardEdit(boardDTO);
    	
    	return "redirect:/community/view?cm_board_id=" + boardDTO.getCm_board_id();
    }
    
    //글 상세
    /**
     * Oracle DB에서 커뮤니티 관련 데이터를 가져온 후, 상세보기 페이지에 전달하면서 페이지를 호출하는 method 입니다.
     * @param model 뷰에 전달할 데이터를 저장하는 모델 객체.
     * @param cm_board_id 조회할 게시글의 고유 ID.
     * @return 해당 게시글의 상세 정보 및 관련 데이터를 보여주는 "community.view" 반환.
     */
    @GetMapping("/view")
    public String view(Model model, @RequestParam("cm_board_id") int cm_board_id) {
       
        CommunityBoardDTO communityBoardDTO = dao.boardView(cm_board_id);
        List<CommentsDTO> comments =dao.commentsList(cm_board_id);
        int likeCount = dao.boardLikes(cm_board_id);
        
        model.addAttribute("communityBoardDTO", communityBoardDTO);
        model.addAttribute("comments", comments);
        
        return "community.view";
    }

    
    //글 삭제
    /**
     * 게시글을 삭제하는 method 입니다.
     * 
     * @param cm_board_id 삭제할 게시글의 고유 ID.
     * @return 게시글 목록 페이지 redirect.
     */
    @GetMapping("/del")
    public String del(@RequestParam("cm_board_id") Integer cm_board_id) {
    	
    	dao.boardDel(cm_board_id);
    	
    	return "redirect:/community";
    }
    
    
    
}