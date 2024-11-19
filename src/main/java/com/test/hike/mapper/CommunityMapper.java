package com.test.hike.mapper;

import java.util.List;

import com.test.hike.dto.BoardTaggingDTO;
import com.test.hike.dto.CommentsDTO;
import com.test.hike.dto.CommunityBoardDTO;

/**
 * 커뮤니티 게시판 관련 데이터베이스 쿼리를 정의하는 Mapper 인터페이스입니다.
 * @author Son Min-ji
 */
public interface CommunityMapper {

	/**
	 * 지정된 게시판 유형에 대한 게시글 목록을 반환합니다.
	 *
	 * @param boardType 게시판의 유형
	 * @return List&lt;CommunityBoardDTO&gt; 지정된 유형의 게시글 목록
	 */
	List<CommunityBoardDTO> boardList(String boardType);

	/**
	 * 주어진 게시글 ID에 대한 게시글 정보를 반환합니다.
	 *
	 * @param cm_board_id 게시글 ID
	 * @return CommunityBoardDTO 해당 게시글의 정보, 없을 경우 null
	 */
	CommunityBoardDTO boardView(int cm_board_id);

	/**
	 * 주어진 게시글 ID에 대한 댓글 목록을 반환합니다.
	 *
	 * @param cm_board_id 게시글 ID
	 * @return List&lt;CommentsDTO&gt; 해당 게시글에 대한 댓글 목록
	 */
	List<CommentsDTO> commentsList(int cm_board_id);

	/**
	 * 새로운 게시글을 추가합니다.
	 *
	 * @param boardDTO 추가할 게시글 DTO
	 * @return int 추가된 게시글의 수
	 */
	int boardAdd(CommunityBoardDTO boardDTO);

	/**
	 * 게시글 정보를 수정합니다.
	 *
	 * @param boardDTO 수정할 게시글 DTO
	 * @return int 수정된 게시글의 수
	 */
	int boardEdit(CommunityBoardDTO boardDTO);

	/**
	 * 주어진 게시글 ID에 대한 게시글을 삭제합니다.
	 *
	 * @param cm_board_id 게시글 ID
	 * @return int 삭제된 게시글의 수
	 */
	int boardDel(Integer cm_board_id);

	/**
	 * 주어진 게시글 ID에 대한 좋아요 수를 반환합니다.
	 *
	 * @param cm_board_id 게시글 ID
	 * @return int 좋아요 수
	 */
	int boardLikes(int cm_board_id);

	/**
	 * 주어진 게시글 ID에 연결된 모든 태그를 반환합니다.
	 *
	 * @param cm_board_id 게시글 ID
	 * @return List&lt;BoardTaggingDTO&gt; 해당 게시글에 연결된 태그 목록
	 */
	List<BoardTaggingDTO> boardTags(Integer cm_board_id);

	/**
	 * 주어진 태그 ID에 대한 태그 정보를 반환합니다.
	 *
	 * @param board_tag_id 태그 ID
	 * @return String 해당 태그의 이름
	 */
	String tags(int board_tag_id);
}
