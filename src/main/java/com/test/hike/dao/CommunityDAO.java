package com.test.hike.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.test.hike.dto.BoardTaggingDTO;
import com.test.hike.dto.CommentsDTO;
import com.test.hike.dto.CommunityBoardDTO;
import com.test.hike.mapper.CommunityMapper;

import lombok.RequiredArgsConstructor;

/**
 * CommunityDAO는 커뮤니티 게시판 관련 데이터베이스 작업을 수행하는 클래스입니다.
 * 이 클래스는 CommunityMapper를 통해 데이터베이스와 상호작용합니다.
 * @author Son Min-ji
 *
 */
@Repository
@RequiredArgsConstructor
public class CommunityDAO {

	private final CommunityMapper mapper;

	/**
	 * 지정된 게시판 유형에 대한 게시글 목록을 반환합니다.
	 *
	 * @param boardType 게시판의 유형
	 * @return List&lt;CommunityBoardDTO&gt; 지정된 유형의 게시글 목록
	 */
	public List<CommunityBoardDTO> boardList(String boardType) {
		return mapper.boardList(boardType);
	}

	/**
	 * 주어진 게시글 ID에 대한 게시글 정보를 반환합니다.
	 *
	 * @param cm_board_id 게시글 ID
	 * @return CommunityBoardDTO 게시글 DTO
	 */
	public CommunityBoardDTO boardView(int cm_board_id) {
		return mapper.boardView(cm_board_id);
	}

	/**
	 * 새로운 게시글을 추가합니다.
	 *
	 * @param boardDTO 추가할 게시글 DTO
	 * @return int 추가된 게시글의 수
	 */
	public int boardAdd(CommunityBoardDTO boardDTO) {
		return mapper.boardAdd(boardDTO);
	}

	/**
	 * 게시글 정보를 수정합니다.
	 *
	 * @param boardDTO 수정할 게시글 DTO
	 * @return int 수정된 게시글의 수
	 */
	public int boardEdit(CommunityBoardDTO boardDTO) {
		return mapper.boardEdit(boardDTO);
	}

	/**
	 * 주어진 게시글 ID에 대한 게시글을 삭제합니다.
	 *
	 * @param cm_board_id 게시글 ID
	 * @return int 삭제된 게시글의 수
	 */
	public int boardDel(Integer cm_board_id) {
		return mapper.boardDel(cm_board_id);
	}

	/**
	 * 주어진 게시글 ID에 대한 댓글 목록을 반환합니다.
	 *
	 * @param cm_board_id 게시글 ID
	 * @return List&lt;CommentsDTO&gt; 해당 게시글에 대한 댓글 목록
	 */
	public List<CommentsDTO> commentsList(Integer cm_board_id) {
		return mapper.commentsList(cm_board_id);
	}

	/**
	 * 주어진 게시글 ID에 대한 좋아요 수를 반환합니다.
	 *
	 * @param cm_board_id 게시글 ID
	 * @return int 좋아요 수
	 */
	public int boardLikes(int cm_board_id) {
		return mapper.boardLikes(cm_board_id);
	}

	/**
	 * 주어진 게시글 ID에 연결된 모든 태그를 반환합니다.
	 *
	 * @param cm_board_id 게시글 ID
	 * @return List&lt;String&gt; 해당 게시글에 연결된 태그 목록
	 */
	public List<String> boardTags(Integer cm_board_id) {
		// BoardTaggingDTO를 통해 해당 게시글에 연결된 태그 ID를 조회
		List<BoardTaggingDTO> taggings = mapper.boardTags(cm_board_id);

		// 각 태그 ID에 해당하는 BoardTagDTO 정보를 조회
		List<String> tags = new ArrayList<>();
		for (BoardTaggingDTO tagging : taggings) {
			// BoardTagDTO에 해당하는 정보를 조회
			String tag = mapper.tags(tagging.getBoard_tag_id());
			tags.add(tag);
		}

		return tags; // 해당 게시글에 연결된 모든 태그 정보를 반환
	}
}
