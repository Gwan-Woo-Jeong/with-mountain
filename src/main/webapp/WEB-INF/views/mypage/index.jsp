<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<html>
<head>

<c:set var="path" value="${pageContext.request.contextPath}"/>

<script>
	console.log('현재 path:', '${path}');  // EL을 직접 사용
</script>

<%@ include file="asset.jsp" %>
</head>
<body>

<!-- jsp작업 -->
<div id="club-profile-background"></div>

<!-- 모임 프로필 -->
<div id="club-profile">
	
	<div id="profile-info">
		<div class="profile-image">
			<img src="${path}/resources/static/images/club/memberProfie.jpg" alt="프로필 사진">
		</div>
		<div class="clubInfo">
		
			<div class="club-title">
				<h1 class="clubName">이택조</h1>
			</div>
				<h2 class="clubCreateDate">가입 일자: 2024년 09월 01일</h2>
		</div>
	</div>

	<div id="info-btn">
		<button type="submit" class="pref-btn" name="pref-btn">
			<img class="set-logo" src="${path}/resources/static/images/settings.svg" alt="환경설정">
		</button>
	</div>
	
	<!-- 팝업 창 -->
	<div id="popup" class="auth-overlay">
	    <div class="window">
	        <div class="header">
	            <span class="popup-close">
	            </span>
	        </div>
	        <div id="popup-content">
	            <!-- infoedit.jsp의 내용이 여기에 로드됨 -->
	        </div>
	    </div>
	</div>
	
	
</div>

<header id="sub-menu">
	<nav>
        <ul>
            <li><a href="#view">정보</a></li>
            <li><a href="#schedule">일정</a></li>
            <li><a href="#hike">등산 기록</a></li>
            <li><a href="#activities">활동기록</a></li>
        </ul>
    </nav>
</header>

<!---------------------------------------- 나의등산 내용 --------------------------------------------->
<div class="mypage-content">

<div id="view" class="mypagetitle">소개</div>
<div id="intro">
	<div class="intro-content">
		<pre>중년은 죽지 않아 다 같이 열정 열정 열정!!!!!</pre>
	</div>
</div>

<!-- -----------------가입한 모임 부분--------------------- -->
<div class="mypagetitle">가입한 모임</div>
<div id="mypage-list">

	<!-- 가입한 모임 리스트 > index.jsp에서 가져옴 -->
	<div id="clublist-joinlist">
	
	<c:forEach begin="1" end="6">
	    <div class="joinclub">
	        <img class="joinclub-image" src="${path}/resources/static/images/club-image.jpg" alt="산악회 대표사진">
	        <div class="joinclub-content">
	            <div class="joinclub-header">
	                <div>한사랑 산악회</div>
	                <div>열정 가득한 가을 북한산 등반</div>
	            </div>
	            <div class="joinclub-footer">
	                <div>
	                    <span><img class="clock-logo" src="${path}/resources/static/images/clock.svg" alt="가입날짜"></span>
	                    <span>2024-11-05</span>
	                </div>
	                <div>
	                    <span><img class="users-logo" src="${path}/resources/static/images/users.svg" alt="멤버"></span>
	                    <span>6/50</span>
	                </div>
	            </div>
	        </div>
	    </div>
	</c:forEach>
	<%-- 
	<c:forEach items="${clubs}" var="club">
    <div class="joinclub">
        <img class="joinclub-image" src="${path}/resources/static/images/club-image.jpg" alt="산악회 대표사진">
        <div class="joinclub-content">
            <div class="joinclub-header">
                <div>${club.name}</div>
                <div>${club.title}</div>
            </div>
            <div class="joinclub-footer">
                <div>
                    <span><img class="clock-logo" src="${path}/resources/static/images/clock.svg" alt="가입날짜"></span>
                    <span>${club.joinDate}</span>
                </div>
                <div>
                    <span><img class="users-logo" src="${path}/resources/static/images/users.svg" alt="멤버"></span>
                    <span>${club.currentMembers}/${club.maxMembers}</span>
                </div>
            </div>
        </div>
    </div>
	</c:forEach> 
	--%>
	
	</div> <!-- clublist-joinlist -->
	
</div>


<!-- -----------------일정--------------------- -->

<div id="schedule" class="myscheduler">
<div id="scheduler-sub-head">
<div class="mypagetitle">일정</div>
</div>

<div id="calendar"></div>
</div>
<!-- -----------------등산 기록--------------------- -->
<div id="hike" class="mypagetitle">등산 기록</div>
<div id="club-hike-list">
	
	
	<c:forEach begin="1" end="2">
    <div class="club-hike">
        <div class="course-image">
            <img src="${path}/resources/static/images/map-test.jpg" alt="코스 사진">
        </div>

        <div class="hike-main-content">
            <div class="hike-title"><span style="color: var(--main)">북한산</span> 등반</div>
            <div class="hike-content">
                <div class="hike-sub-content">
                    <img class="title-logo" src="${path}/resources/static/images/title.svg" alt="등산 타이틀">
                    <span>열정 가득한 가을 북한산 등반!!</span>
                </div>
                <div class="hike-sub-content">
                    <img class="calendar-logo" src="${path}/resources/static/images/calendar.svg" alt="등산 일정">
                    <span>2024-11-21 (일)</span>
                </div>
                <div class="hike-sub-content">
                    <img class="clock-logo" src="${path}/resources/static/images/clock.svg" alt="출발 시간">
                    <span>10:00 출발</span>
                </div>
                <div class="hike-sub-content">
                    <img class="clock-logo" src="${path}/resources/static/images/clock-dark.svg" alt="도착 시간">
                    <span>15:00 도착</span>
                </div>
            </div>

            <div class="hike-total-record">
                <div class="hike-total-time">
                    <span>소요 시간</span>
                    <span>3시간 12분</span>
                </div>
                <div class="hike-total-distance">
                    <span>등산 거리</span>
                    <span>8.4KM</span>
                </div>
            </div>
        </div>
    </div>
    </c:forEach>

</div>


<!-- -----------------활동 기록--------------------- -->
<div id="activities" class="mypagetitle">활동 기록</div>

<div class="myactivities"> <!-- 나의 활동기록 내용 -->

<div class="tab-container">
    <button class="tab-button active" data-tab="free">자유 게시판</button>
    <button class="tab-button" data-tab="photo">사진 게시판</button>
    <button class="tab-button" data-tab="qna">QnA</button>
</div>

<div class="tab-content">
    <div class="tab-pane active" id="free"></div>
    <div class="tab-pane" id="photo"></div>
    <div class="tab-pane" id="qna"></div>
</div>


</div> <!-- 활동기록 내용 끝~ -->

<!-- 여기가 진짜 끝입니다.ㅎㅎㅎㅎ -->


</div> <!-- 나의 등산 끝~ -->

</body>
</html>












