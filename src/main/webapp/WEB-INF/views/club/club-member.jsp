<%@ page contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:set var="path" value="${pageContext.request.contextPath}"/>


<h1>멤버 관리 & 채팅방 팝업창 !</h1>
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
			<img src="${path}/resources/static/images/club/memberProfie.jpg" alt="모임장 프로필 사진" class="profile-image">
			<img src="${path}/resources/static/images/crown.svg" alt="모임장 아이콘" class="crown-icon">

			<div class="profile-info">
				<span class="profile-name">이택조</span>
				<span class="profile-date">24.11.03 가입</span>
			</div>
		</div>

		<c:forEach begin="1" end="5">
			<div class="profile-container">
				<img src="${path}/resources/static/images/default-profile.svg" alt="모임원 프로필 사진" class="profile-image">
				<div class="profile-info">
					<span class="profile-name">배용길</span>
					<span class="profile-date">24.11.03 가입</span>
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
					<span class="anotherName">LeeTackJo</span>
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


<button type="button" id="editclub-btn" onclick="showModalMember();" style="width: 100px;">멤버 관리</button>
<button type="button" id="editclub-btn" onclick="showModalChat();" style="width: 100px;">채팅 하기</button>

<script>
	//멤버관리 팝업창 띄우기
	function showModalMember() {
		$('html, body').css({
			overflow: 'hidden',
			height: '100%'
		});
		$('#member-popup').css('display', 'flex');
	}

	//팝업창 닫기
	// 팝업창 닫기
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
