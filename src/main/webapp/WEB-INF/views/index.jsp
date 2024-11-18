<%@ page contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:set var="path" value="${pageContext.request.contextPath}"/>


<!-- 홈페이지 -->
<!-- 1. 헤더문구 & 검색창 -->
<div id="home-header">
	<div class="header-title">이번주엔 어느 산을 올라볼까요?</div>
	<div id="search-box">
		<input type="text" value="관심있는 산 이름을 검색해보세요!" id="search-text" size="15">
		<button type="submit" id="search-btn">
			<img class="search-logo" src="${path}/resources/static/images/search.svg" alt="검색">
		</button>
	</div>
</div>

<!-- 2. 산 이름과 원형 이미지 -->
<div id="circle-mtlist">
	<div class="circle-mtlist-item">
		<div class="img-box">
			<div class="img-rad">
				<img src="${path}/resources/static/images/mtn/북한산.jpg">
				<p>북한산</p>
			</div>
			<div class="img-rad">
				<img src="${path}/resources/static/images/mtn/덕유산.jpg">
				<p>덕유산</p>
			</div>
			<div class="img-rad">
				<img src="${path}/resources/static/images/mtn/방태산.jpg">
				<p>방태산</p>
			</div>
			<div class="img-rad">
				<img src="${path}/resources/static/images/mtn/수락산.jpg">
				<p>수락산</p>
			</div>
			<div class="img-rad">
				<img src="${path}/resources/static/images/mtn/아차산.jpg">
				<p>아차산</p>
			</div>
			<div class="img-rad">
				<img src="${path}/resources/static/images/mtn/영축산.jpg">
				<p>영축산</p>
			</div>
			<div class="img-rad">
				<img src="${path}/resources/static/images/mtn/지리산.jpg">
				<p>지리산</p>
			</div>
			<div class="img-rad">
				<img src="${path}/resources/static/images/mtn/천마산.jpg">
				<p>천마산</p>
			</div>
			<div class="img-rad">
				<img src="${path}/resources/static/images/mtn/청계산.jpg">
				<p>청계산</p>
			</div>
			<div class="img-rad">
				<img src="${path}/resources/static/images/mtn/치악산.jpg">
				<p>치악산</p>
			</div>
			<div class="img-rad">
				<img src="${path}/resources/static/images/mtn/태백산.jpg">
				<p>태백산</p>
			</div>
			<div class="img-rad">
				<img src="${path}/resources/static/images/mtn/팔봉산.jpg">
				<p>팔봉산</p>
			</div>
			<div class="img-rad">
				<img src="${path}/resources/static/images/mtn/한라산.jpg">
				<p>한라산</p>
			</div>
			<!-- 클론  -->
			<div class="img-rad">
				<img src="${path}/resources/static/images/mtn/북한산.jpg">
				<p>북한산</p>
			</div>
			<div class="img-rad">
				<img src="${path}/resources/static/images/mtn/덕유산.jpg">
				<p>덕유산</p>
			</div>
			<div class="img-rad">
				<img src="${path}/resources/static/images/mtn/방태산.jpg">
				<p>방태산</p>
			</div>
			<div class="img-rad">
				<img src="${path}/resources/static/images/mtn/수락산.jpg">
				<p>수락산</p>
			</div>
			<div class="img-rad">
				<img src="${path}/resources/static/images/mtn/아차산.jpg">
				<p>아차산</p>
			</div>
			<div class="img-rad">
				<img src="${path}/resources/static/images/mtn/영축산.jpg">
				<p>영축산</p>
			</div>
			<div class="img-rad">
				<img src="${path}/resources/static/images/mtn/지리산.jpg">
				<p>지리산</p>
			</div>
			<div class="img-rad">
				<img src="${path}/resources/static/images/mtn/천마산.jpg">
				<p>천마산</p>
			</div>
			<div class="img-rad">
				<img src="${path}/resources/static/images/mtn/청계산.jpg">
				<p>청계산</p>
			</div>
			<div class="img-rad">
				<img src="${path}/resources/static/images/mtn/치악산.jpg">
				<p>치악산</p>
			</div>
			<div class="img-rad">
				<img src="${path}/resources/static/images/mtn/태백산.jpg">
				<p>태백산</p>
			</div>
			<div class="img-rad">
				<img src="${path}/resources/static/images/mtn/팔봉산.jpg">
				<p>팔봉산</p>
			</div>
			<div class="img-rad">
				<img src="${path}/resources/static/images/mtn/한라산.jpg">
				<p>한라산</p>
			</div>
		</div>
	</div>
</div>
<hr class="line">

<!-- 3. 산 이름 목록과 큰 이미지 -->
<div id="mini-mtlist-header">
	<div class="header-title">지금 인기 있는 산</div>
	<div class="header-content">유저들이 가장 좋아하는 산들을 모아봤어요!</div>
		<div class="header-box">
			<div class="scroll-box" style="overflow-x:hidden;">
				<div class="header-btn"style="overflow-x:hidden;" >
					<button class="mtnbtn">설악산</button>
					<button class="mtnbtn">지리산</button>
					<button class="mtnbtn">북한산</button>
					<button class="mtnbtn">한라산</button>
					<button class="mtnbtn">검단산</button>
					<button class="mtnbtn">계룡산</button>
					<button class="mtnbtn">고헌산</button>
					<button class="mtnbtn">광교산</button>
					<button class="mtnbtn">금마산</button>
					<button class="mtnbtn">내장산</button>
					<button class="mtnbtn">대덕산</button>
					<button class="mtnbtn">대암산</button>
					<button class="mtnbtn">아차산</button>
					<button class="mtnbtn">주왕산</button>
					<button class="mtnbtn">수락산</button>
					<button class="mtnbtn">팔봉산</button>
					<button class="mtnbtn">용마산</button>
					<button class="mtnbtn">월악산</button>
					<button class="mtnbtn">청계산</button>
					<button class="mtnbtn">태백산</button>
					<button class="mtnbtn">대덕산</button>
					<button class="mtnbtn">화악산</button>
					<button class="mtnbtn">천성산</button>
					<button class="mtnbtn">방태산</button>
					<button class="mtnbtn">금마산</button>
					<button class="mtnbtn">오대산</button>
					<button class="mtnbtn">천마산</button>
					<button class="mtnbtn">영축산</button>
					<button class="mtnbtn">불암산</button>
					<button class="mtnbtn">속리산</button>
				</div>
			</div>
			<div class="header-img">
				<img id="mountainImage"src="${path}/resources/static/images/mtn/한라산.jpg">
			</div>
		</div>
</div>

<!-- 4. 등산 예정 모임 -->
<!-- <div id="hike-plan-club-header">
	<div class="header-title"><span class="color-green">북한산</span> 등산 예정 모임</div>
	<div class="header-content">유저들이 가장 좋아하는 산들을 모아봤어요!</div>
</div>
<<<<<<< Updated upstream
<!-- 모임 리스트 -->
<div id="clublist-joinlist">

	<c:forEach items="${clubList}" var="clubDTO">
		<div class="joinclub">
			<img class="joinclub-image" src="${path}/resources/static/images/club/${clubDTO.clubImage}" alt="산악회 대표사진">
			<div class="joinclub-content">
				<div class="joinclub-header">
					<div>${clubDTO.clubIntro}</div>
					<div>${clubDTO.clubName}</div>
				</div>
				<div class="joinclub-footer">
					<div>
						<span><img class="clock-logo" src="${path}/resources/static/images/clock.svg" alt="가입날짜"></span>
						<span>${clubDTO.clubCreateDate}</span>
					</div>
					<div>
						<span><img class="users-logo" src="${path}/resources/static/images/users.svg" alt="멤버"></span>
						<span>${clubDTO.clubMemberCount}/${clubDTO.clubMaxMember}</span>
					</div>
				</div>
			</div>
		</div>
	</c:forEach>
</div>


=======
 -->
>>>>>>> Stashed changes
<!-- 5. 커뮤니티 인기글 모음 -->
<div id="community-best-header">
	<div class="header-title">커뮤니티 인기글 모음</div>
	<div class="header-content">등산에 대한 다양한 정보와 재미있는 이야기를 즐겨봐요!</div>
</div>

<div class="myactivities"> <!-- 나의 활동기록 내용 -->

<div class="tab-container">
    <button class="tab-button" data-tab="free">자유 게시판</button>
    <button class="tab-button" data-tab="photo">사진 게시판</button>
    <button class="tab-button" data-tab="qna">QnA</button>
</div>

<div class="tab-content">
    <div class="tab-pane" id="free"></div>
    <div class="tab-pane" id="photo"></div>
    <div class="tab-pane" id="qna"></div>
</div>


</div>

<script src="${path}/resources/static/js/home.js"></script>
<script src="${path}/resources/static/js/mypage.js"></script>
