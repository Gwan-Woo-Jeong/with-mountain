<%@ page contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:set var="path" value="${pageContext.request.contextPath}"/>

<!-- 팝업창 띄우기 -->
<div id="popup">
    <div class="window">

		<!-- 팝업 닫기 버튼-->
        <div class="popup-close">
        <button type="button" id="popup-close-btn" onclick='popupClose();'>
			<img class="close-logo" src="${path}/resources/static/images/close.svg" alt="닫기">
		</button>
        </div>

		<!-- 팝업 내용 여기 안에서 작업-->
        <div class="clublist-title">초대 코드</div>
        
        <form>
        	<div class="code-title">초대코드*</div>	
        	<input type="text" name="code" id="code" class="invite-code" placeholder="초대 코드를 입력해 주세요." >
        	
        	<div class="joinclub-btn-area">
				<button type="submit" id="joinclub-btn" onclick="">모임 참여 하기</button>
			</div>
        </form>
    </div>
</div>

<!-- 모임 메인페이지 -->
<!-- 1. 헤더문구 & 검색창 -->
<div id="clublist-header">
	<div class="clublist-title">함께라면 산행이 더 즐거워요</div>
	<div id="search-box">
		<input type="text" placeholder="모임 이름이나 활동 지역을 검색해보세요!" id="search-text" size="15">
		<button type="submit" id="search-btn">
			<img class="search-logo" src="${path}/resources/static/images/search.svg" alt="검색">
		</button>
	</div>
</div>

<!-- 2. 가입한 모임 리스트 -->
<div id="joinlist-header">
	<div class="clublist-title">가입한 모임</div>
	<div class="clublist-content">이번주엔 어떤 산행이 기다리고 있을까요?</div>
</div>
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



<!-- 3. 추천하는 모임 리스트 -->
<div id="recommendlist-header">
	<div class="clublist-title">추천하는 모임</div>
	<div class="clublist-content">000님 지역에 가까운 모임으로 찾아보았어요!</div>
</div>
<div id="clublist-recommendlist">
	
	<div class="recommendclub">
		<img class="joinclub-image"
			src="${path}/resources/static/images/club-image.jpg" alt="산악회 대표사진">
		<div class="recommendclub-content">
			<div class="recommendclub-header">
				<div>한사랑 산악회</div>
				<img class="usercheck-logo"
					src="${path}/resources/static/images/user-check.svg" alt="가입한모임">
			</div>
			<div class="recommendclub-intro">안녕하십니까? ○○○산악회 회원 여러분. 우리
				산악인들의 마음을 한껏 부풀어오르게 만드는 아름다운 단풍이 곱게 피어나는 10월입니다. 이 좋은 가을날, 또 한번의 멋진
				산행을 위해서 이렇게 올해의 ○○번째 모임을 갖게 되었습니다. 저희 모임에 오셔서 즐거운 산행 이어 갑시다</div>
			<div class="recommendclub-tag">
				<span class="recommendclub-tag-item"># 백숙</span>
				<span class="recommendclub-tag-item"># 가을산</span>
				<span class="recommendclub-tag-item"># 단풍명소</span>
			</div>
			<div class="recommendclub-footer">
				<div>
					<span><img class="clock-logo"
						src="${path}/resources/static/images/clock.svg" alt="가입날짜"></span>
					<span>2024-11-05</span>
				</div>
				<div>
					<span><img class="users-logo"
						src="${path}/resources/static/images/users.svg" alt="멤버"></span> <span>6/50</span>
				</div>
			</div>
		</div>
	</div>

	<c:forEach items="${clubList}" var="clubDTO">
	<div class="recommendclub" onclick="location.href='/hike/club/view?club_id=${clubDTO.clubId}';">
		<img class="joinclub-image"
			src="${path}/resources/static/images/club/${clubDTO.clubImage}" alt="산악회 대표사진">
		<div class="recommendclub-content">
			<div class="recommendclub-header">
				<div>${clubDTO.clubName}</div>
				<img class="useradd-logo"
					src="${path}/resources/static/images/user-add.svg" alt="가입하기">
			</div>
			<div class="recommendclub-intro">${clubDTO.clubIntro}</div>
			<div class="recommendclub-tag">
				<span class="recommendclub-tag-item"># 백숙</span> <span
					class="recommendclub-tag-item"># 가을산</span> <span
					class="recommendclub-tag-item"># 단풍명소</span>
			</div>
			<div class="recommendclub-footer">
				<div>
					<span><img class="clock-logo"
						src="${path}/resources/static/images/clock.svg" alt="가입날짜"></span>
					<span>${clubDTO.clubCreateDate}</span>
				</div>
				<div>
					<span><img class="users-logo"
						src="${path}/resources/static/images/users.svg" alt="멤버"></span> <span>${clubDTO.clubMemberCount}/${clubDTO.clubMaxMember}</span>
				</div>
			</div>
		</div>
	</div>
	</c:forEach>
	
</div>

<!-- 4. 모임 플러스 버튼 -->
<!-- 모임 생성 & 초대코드 입력 버튼 -->

<div class="club-plus">
<button type="button" id="club-plus-btn" onclick='plusBtnToggle();'>
	<img id="plus-image" class="plus-logo" src="${path}/resources/static/images/plus.svg" alt="모임플러스버튼">
</button>
</div>

<div class="club-plus-btns" >
<div class="club-otp">
<button type="button" id="club-otp-btn" onclick="showModal();" style="visibility: hidden;">
	<img class="otp-logo" src="${path}/resources/static/images/otp.svg" alt="초대코드버튼">
</button>
</div>

<div class="club-add">
<button type="button" id="club-add-btn" onclick="location.href='http://localhost:8090/hike/club/add';" style="visibility: hidden;">
	<img class="users-medical-logo" src="${path}/resources/static/images/users-medical.svg" alt="모임생성버튼">
</button>
</div>
</div>









