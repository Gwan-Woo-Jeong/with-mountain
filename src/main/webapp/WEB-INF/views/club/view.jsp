<%@ page contentType="text/html; charset=UTF-8"
		 pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:set var="path" value="${pageContext.request.contextPath}"/>

<!-- 멤버 관리 팝업창 띄우기 -->
<div id="member-popup">
	<div class="window">

		<!-- 팝업 닫기 버튼-->
		<div class="popup-close">
			<button type="button" class="popup-close-btn" onclick="popupClose('#member-popup');">
				<img class="close-logo" src="${path}/resources/static/images/close.svg" alt="닫기">
			</button>
		</div>

		<!-- 팝업 내용 여기 안에서 작업-->
		<div class="clublist-title">모임 멤버</div>

		<div id="search-box">
			<input type="text" placeholder="모임 멤버 검색" id="search-text" size="15">
			<button type="submit" id="search-btn">
				<img class="search-logo" src="${path}/resources/static/images/search.svg" alt="검색">
			</button>
		</div>

		<div class="memeber-toggle">
			<img class="toggle-icon" src="${path}/resources/static/images/arrow-down.svg" alt="토글 아이콘">가입 멤버 (6/50)
		</div>

		<div class="profile-container">
			<img src="${path}/resources/static/images/profile.svg" alt="모임장 프로필 사진" class="profile-image">
			<img src="${path}/resources/static/images/crown.svg" alt="모임장 아이콘" class="crown-icon">

			<div class="profile-info">
				<span class="profile-name">윤준향</span>
				<span class="profile-date">24.11.08 가입</span>
			</div>
		</div>

		<c:forEach begin="1" end="1">
			<div class="profile-container">
				<img src="${path}/resources/static/images/profile.svg" alt="모임원 프로필 사진" class="profile-image">
				<div class="profile-info">
					<span class="profile-name">강동재</span>
					<span class="profile-date">24.11.10 가입</span>
				</div>
				<div class="profile-buttons">
					<button class="assign-btn btn">위임</button>
					<button class="leave-btn btn">탈퇴</button>
				</div>
			</div>
		</c:forEach>

	</div>
</div>


<!-- 채팅방 팝업창 -->
<div id="chat-popup">
	<div class="window">

		<!-- 팝업 닫기 버튼-->
		<div class="popup-close">
			<button type="button" class="popup-close-btn" onclick="popupClose('#chat-popup');">
				<img class="close-logo" src="${path}/resources/static/images/close.svg" alt="닫기">
			</button>
		</div>

		<!-- 팝업 내용 여기 안에서 작업-->
		<div id="chatWrap">
			<div id="chatHeader">
				<img class="chat-icon" src="${path}/resources/static/images/chat-dark.svg" alt="채팅아이콘">
				Club Chat
			</div>
			<div id="chatLog">
				<div class="anotherMsg">
					<span class="anotherName">Member</span>
					<span class="msg">Hello, Nice to meet you.</span>
					<span class="send-date">pm 04 : 54</span>
				</div>
				<div class="myMsg">
					<span class="send-date">pm 05 : 00</span>
					<span class="msg">Nice to meet you, too.</span>
				</div>
			</div>
			<form id="chatForm">
				<input type="text" autocomplete="off" size="30" id="message" placeholder="메시지를 입력하세요">
				<input type="submit" value="보내기">
			</form>
		</div>
	</div>
</div>


<!-- jsp작업 -->
<input type="hidden" name="clubId" value="${clubDTO.clubId}">
<div id="club-profile-background"></div>

<!-- 모임 프로필 -->
<div id="club-profile">

	<div id="profile-info">
		<div class="club-profile-image">
			<img src="${path}/resources/static/images/club/club-image10.jpg" alt="모임 프로필 사진">
		</div>
		<div class="clubInfo">

			<div class="club-title">
				<h1 class="clubName">${clubDTO.clubName}</h1>
				<button type="button" onclick="location.href='${path}/club/edit'">
					<img class="club-setting" src="${path}/resources/static/images/settings.svg" alt="모임 관리">
				</button>
			</div>
			<h2 class="clubCreateDate">개설 일자: ${clubDTO.clubCreateDate}</h2>

		</div>
	</div>

	<div id="info-btn">
		<button type="button" class="chat-btn" onclick="showModalChat()">
			<img class="chat-logo" src="${path}/resources/static/images/chat-dark.svg" alt="채팅 로고">
		</button>
		<button type="button" class="register-btn" name="register-btn"  onclick="toggleRegister()">가입하기</button>
	</div>

</div>

<%-- 서브 메뉴 --%>
<header id="sub-menu">
	<nav>
		<ul>
			<li class="selected"><a href="${path}/club/view?clubId=${clubDTO.clubId}">정보</a></li>
			<li><a href="${path}/club/scheduler?clubId=${clubDTO.clubId}" id="club-schedule">일정</a></li>
			<li><a href="${path}/club/hike?clubId=${clubDTO.clubId}" id="club-hike">등산 기록</a></li>
			<li><a href="${path}/club/gallery?clubId=${clubDTO.clubId}" id="club-gallery">사진첩</a></li>
		</ul>
	</nav>
</header>

<%-- 모임 정보 --%>
<div id="intro">
	<div class="intro-title">소개</div>
	<div class="intro-content"><pre>${clubDTO.clubIntro}</pre></div>
</div>

<!-- 모임원 -->
<div id="club-member">
	<div class="club-member-management">
		가입 멤버 (6 / ${clubDTO.clubMaxMember})
		<img class="club-member-setting" src="${path}/resources/static/images/member-management.svg" alt="모임 멤버 관리" onclick="showModalMember()">
	</div>

	<div class="club-member-profile">

		<div class="member-profile">
			<img src="${path}/resources/static/images/profile.svg" alt="모임원 프로필 사진">
			<div class="member-name">
				윤준향
			</div>
		</div>

		<div class="member-profile">
			<img src="${path}/resources/static/images/profile.svg" alt="모임원 프로필 사진">
			<div class="member-name">
				강동재
			</div>
		</div>

	</div>
</div>


<%--가입하기 버튼 클릭시 탈퇴하기 버튼으로 변경--%>
<script>
	// 초기 상태: 가입하기
	let isRegistered = false;  // 사용자가 가입한 상태인지 아닌지를 나타내는 변수 (false: 가입 안 함, true: 가입 됨)

	function toggleRegister() {
		const button = document.querySelector('.register-btn');

		if (isRegistered) {
			// 현재 "탈퇴하기" 상태일 때는 버튼 클릭 시 탈퇴 처리
			button.textContent = "가입하기";  // 버튼 텍스트 변경
			button.onclick = function() {
				// 탈퇴하기 버튼 클릭 시 이동
				location.href = '${path}/club/view';  // 탈퇴 처리 페이지로 이동
			};
			isRegistered = false;
		} else {
			// 현재 "가입하기" 상태일 때는 버튼 클릭 시 가입 처리
			button.textContent = "탈퇴하기";  // 버튼 텍스트 변경
			button.onclick = function() {
				// 가입하기 버튼 클릭 시 이동
				location.href = '${path}/club/view?clubId=${clubDTO.clubId}';  // 가입 처리 페이지로 이동
			};
			isRegistered = false;
		}
	}

	//멤버관리 팝업창 띄우기
	function showModalMember() {
		$('html, body').css({
			overflow: 'hidden',
			height: '100%'
		});
		$('#member-popup').css('display', 'flex');
	}

	//팝업창 닫기
	function popupClose(popupId) {
		$(popupId).css('display', 'none');
		$('html, body').css({
			overflow: 'visible',
			height: '100%'
		});
	}

	//채팅 팝업창 띄우기
	function showModalChat() {
		$('html, body').css({
			overflow: 'hidden',
			height: '100%'
		});
		$('#chat-popup').css('display', 'flex');
	}

</script>
















































