<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:set var="path" value="${pageContext.request.contextPath}"/>

<!-- 커뮤니티 상세보기 -->

<div class="community-header">
	<div class="back-page">
    <img src="${path}/resources/static/images/arrow_back.svg" class="back">
    <a onclick="location.href='${path}/community'">이전 페이지</a>
	</div>
	<div class="view-btn">
    	<div class="del-container">
    		<button id="deleteBtn" class="del">삭제하기</button>
		</div>
		<div class="edit-container">
        	<button class="edit" onclick="location.href='${path}/community/edit?cm_board_id=${communityBoard.cm_board_id}'">수정하기</button>
    	</div>
    </div>
</div>


<div class="total">

    <!-- 게시글 상세 내용 -->
    <div class="view-box">
        <div class="photo-profile">
            <img src="${path}/resources/static/images/default-profile.svg" alt="프로필 사진" class="profile-pic">
            <div class="p-details">
                <span class="p-nickname">${communityBoard.nickname}</span>
                <div class="p-post-time">
                    <span class="location">${communityBoard.location}</span>
                    <span class="date">${communityBoard.create_time}</span>
                </div>
            </div>
        </div>
        
        <!-- 게시글 사진 -->
        <div class="photo-picture">
            <c:forEach var="image" items="${communityBoard.imageList}">
                <img src="${path}/resources/uploads/${image}" alt="첨부사진" class="p-photo-pic">
            </c:forEach>
        </div>

        <!-- 게시글 내용 -->
        <div class="photo-content">
            <p>${communityBoard.content}</p>
        </div>

        <!-- 좋아요, 댓글 -->
        <div class="p-post-action">
            <div class="icon-item">
                <img src="${path}/resources/static/images/heart.svg" alt="좋아요" class="like-icon">
                <span class="like-count">${likeCount}</span> <!-- 좋아요 수 -->
            </div>
            <div class="icon-item">
                <img src="${path}/resources/static/images/comment.svg" alt="댓글" class="comment-icon">
                <span class="comment-count">${comments.size()}</span> <!-- 댓글 수 -->
            </div>
        </div>

    </div>
        <!-- 댓글 목록 -->
    <div class="comments">
        <!-- 댓글 개수 표시 -->
        <div class="comments-count">
            <span id="comment-count">댓글 총 0개</span>
        </div>

        <!-- 댓글 반복 -->
        <c:forEach var="comment" items="${comments}">
            <div class="comment-item">
                <div class="comment-profile">
                    <img src="${path}/resources/static/images/default-profile.svg" alt="프로필 사진" class="profile-pic">
                    <span class="comment-nickname">${comment.nickname}</span>
                </div>
                <p class="comment-text">${comment.content}</p>
                <span class="comment-date">${comment.create_time}</span>
                <div class="comment-actions">
                    <button class="delete-btn" onclick="deleteComment(${comment.comment_id})">삭제</button>
                    <button class="edit-btn" onclick="editComment(${comment.comment_id})">수정</button>
                </div>
            </div>
        </c:forEach>

        <!-- 댓글 입력 폼 -->
        <div class="comment-form">
            <textarea id="new-comment" placeholder="댓글을 남겨보세요!"></textarea>
            <button id="submit-comment" onclick="submitComment()">등록</button>
        </div>
    </div>
   </div>

<%-- <div class="total">

<div class="view-box">
    <div class="photo-profile">
            <img src="${path}/resources/static/images/default-profile.svg" alt="프로필 사진" class="profile-pic">
       <div class="p-details">
            <span class="p-nickname">맛동산</span>
        	<div class="p-post-time">
        	<span class="location">북한산</span>
        	<span class="date">2024-11-05</span>
        	</div>
        </div>
    </div>
    	<div class="photo-picture">
    		<img src="${path}/resources/static/images/club-image.jpg" alt="첨부사진" class="p-photo-pic">
    		<img src="${path}/resources/static/images/club-image.jpg" alt="첨부사진" class="p-photo-pic">
    	</div>
    	<div class="photo-content">
    		<a href="#">경사가 있는편인데 생각보다 금방 올라가요!
						아주 멋진 북한산 ~</a>
		</div>

<!-- 좋아요, 댓글 -->    
    <div class="p-post-action" >
    	<div class="icon-item">
        	<img src="${path}/resources/static/images/heart.svg" alt="좋아요" class="like-icon">
        	<span class="like-count">2</span> <!-- 좋아요 수 -->
    	</div>
    	<div class="icon-item">
        	<img src="${path}/resources/static/images/comment.svg" alt="댓글" class="comment-icon">
        	<span class="comment-count">4</span> <!-- 댓글 수 -->
    	</div>
	</div>
</div>


<!-- 좋아요, 댓글 -->
<div class="p-post-action" data-post-id="게시물ID">
    <div class="icon-item">
        <img src="${path}/resources/static/images/heart.svg" alt="좋아요" class="like-icon">
        <span class="like-count">2</span>
    </div>
    <div class="icon-item">
        <img src="${path}/resources/static/images/comment.svg" alt="댓글" class="comment-icon">
        <span class="comment-count">4</span>
    </div>
</div> 



<!-- 댓글 -->
	<div class="comments">
        <!-- 댓글 개수 표시 -->
        <div class="comments-count">
            <span id="comment-count">댓글 총 4개</span>
        </div>
    <!-- 댓글 1 -->
    <div class="comment-item">
        <div class="comment-profile">
            <img src="${path}/resources/static/images/default-profile.svg" alt="프로필 사진" class="profile-pic">
            <span class="comment-nickname">김동산</span>
        </div>
        <p class="comment-text">안녕하세요! 아주 멋지네요~~~~~~ 저도 가고 싶어요~~~</p>
        <span class="comment-date">2024-11-06</span> <!-- 댓글 작성 날짜 -->
        <div class="comment-actions">
        	<button class="delete-btn" onclick="deleteComment(this)">삭제</button>
        	<button class="edit-btn" onclick="editComment(this)">수정</button>
    	</div>
    </div>

    <!-- 댓글 2 -->
    <div class="comment-item">
        <div class="comment-profile">
            <img src="${path}/resources/static/images/default-profile.svg" alt="프로필 사진" class="profile-pic">
            <span class="comment-nickname">이동산</span>
        </div>
        <p class="comment-text">안녕하세요! 아주 멋지네요~~~~~~ 저도 가고 싶어요~~~</p>
        <span class="comment-date">2024-11-06</span> <!-- 댓글 작성 날짜 -->
        <div class="comment-actions">
        	<button class="delete-btn" onclick="deleteComment(this)">삭제</button>
        	<button class="edit-btn" onclick="editComment(this)">수정</button>
    	</div>
    </div>

    <!-- 댓글 3 -->
    <div class="comment-item">
        <div class="comment-profile">
            <img src="${path}/resources/static/images/default-profile.svg" alt="프로필 사진" class="profile-pic">
            <span class="comment-nickname">박동산</span>
        </div>
        <p class="comment-text">안녕하세요! 아주 멋지네요~~~~~~ 저도 가고 싶어요~~~</p>
        <span class="comment-date">2024-11-06</span> <!-- 댓글 작성 날짜 -->
        <div class="comment-actions">
        	<button class="delete-btn" onclick="deleteComment(this)">삭제</button>
        	<button class="edit-btn" onclick="editComment(this)">수정</button>
    	</div>
    </div>

    <!-- 댓글 4 -->
    <div class="comment-item">
        <div class="comment-profile">
            <img src="${path}/resources/static/images/default-profile.svg" alt="프로필 사진" class="profile-pic">
            <span class="comment-nickname">한동산</span>
        </div>
        <p class="comment-text">안녕하세요! 아주 멋지네요~~~~~~ 저도 가고 싶어요~~~</p>
        <span class="comment-date">2024-11-06</span> <!-- 댓글 작성 날짜 -->
        <div class="comment-actions">
        	<button class="delete-btn" onclick="deleteComment(this)">삭제</button>
        	<button class="edit-btn" onclick="editComment(this)">수정</button>
    	</div>
    </div>

    <!-- 댓글 입력 폼 -->
    <div class="comment-form">
        <textarea id="new-comment" placeholder="댓글을 남겨보세요!"></textarea>
        <button id="submit-comment">등록</button>
    </div>
    </div>

</div> --%>

















	