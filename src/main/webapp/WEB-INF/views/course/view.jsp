<%@ page contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:set var="path" value="${pageContext.request.contextPath}"/>

<script>
    // For Test
    /**
     * view.js에서 등산로 구간 정보 데이터를 사용하기 위한 사전 작업용 변수입니다.
     */
    <%--const data = JSON.parse('${data}');--%>
    /**
     * view.js에서 등산로 지점 정보 데이터를 사용하기 위한 사전 작업용 변수입니다.
     */
    const spotList =  ${spotListJson};
    const userInfo = ${userInfo};
</script>
<meta name="_csrf" th:content="${_csrf.token}"/>
<meta name="_csrf_header" th:content="${_csrf.headerName}"/>
<div id="view-map" class="course-map">
    <div class="zoom-button-area">
        <button class="zoom-in" type="button">
            <img src="${path}/resources/static/images/plus-small.svg" alt="확대">
        </button>
        <button class="zoom-out" type="button">
            <img src="${path}/resources/static/images/minus-small.svg" alt="축소">
        </button>
    </div>

    <div class="menu-area">
        <div id="capture-area"></div>
        <div class="menu-window">
            <h1>커스텀 코스 모드</h1>
            <form action="submit-url" method="POST">
                <ul class="menu-list">
                    <li class="menu-item">
                        <p class="menu-title">생성 방식</p>
                        <div class="mode">
                            <div class="radio-wrap">
                                <input id="same" name="mode" value="manual" type="radio" checked>
                                <label for="same" class="radio-btn"></label>
                                <span class="radio-label">수동</span>
                            </div>
                            <div class="radio-wrap">
                                <input id="diff" name="mode" value="auto" type="radio">
                                <label for="diff" class="radio-btn"></label>
                                <span class="radio-label">추천</span>
                            </div>
                        </div>
                    </li>
                    <li class="menu-item mode-menu disabled">
                        <p class="menu-title">추천 기준</p>
                        <div class="standards">
                            <div class="radio-wrap">
                                <input id="shortest" name="type" value="shortest" type="radio" checked>
                                <label for="shortest" class="radio-btn"></label>
                                <span class="radio-label">최단 거리</span>
                            </div>
                            <div class="radio-wrap">
                                <input id="fastest" name="type" value="fastest" type="radio">
                                <label for="fastest" class="radio-btn"></label>
                                <span class="radio-label">최소 소요시간</span>
                            </div>
                            <div class="radio-wrap">
                                <input id="easiest" name="type" value="easiest" type="radio">
                                <label for="easiest" class="radio-btn"></label>
                                <span class="radio-label">쉬운 코스</span>
                            </div>
                            <div class="radio-wrap">
                                <input id="hardest" name="type" value="hardest" type="radio">
                                <label for="hardest" class="radio-btn"></label>
                                <span class="radio-label">어려운 코스</span>
                            </div>
                        </div>
                    </li>
                    <li class="menu-item">
                        <p class="menu-title">요약</p>
                        <div class="summary-list">
                            <div id="count" class="summary-item">
                                <p class="total">총 구간 : <span class="value">0</span>개</p>
                                <p class="easy">쉬움 구간: <span class="value">0</span>개</p>
                                <p class="medium">보통 구간: <span class="value">0</span>개</p>
                                <p class="hard">어려움 구간: <span class="value">0</span>개</p>
                            </div>
                            <div id="distance" class="summary-item">
                                <p class="total">총 거리 : <span class="value">0</span>km
                                </p>
                                <p class="easy">쉬움 구간: <span class="value">0</span>km</p>
                                <p class="medium">보통 구간: <span class="value">0</span>km</p>
                                <p class="hard">어려움 구간: <span class="value">0</span>km</p>
                            </div>
                            <div id="time" class="summary-item">
                                <p class="total">총 소요시간 :
                                    <span class="hour">
                                        <span class="value">0</span>시간
                                    </span>
                                    <span class="minute">
                                        <span class="value">0</span>분
                                    </span>
                                </p>
                                <p class="easy">쉬움 구간:
                                    <span class="hour">
                                            <span class="value">0</span>시간
                                    </span>
                                    <span class="minute">
                                            <span class="value">0</span>분
                                    </span>
                                </p>
                                <p class="medium">보통 구간:
                                    <span class="hour">
                                            <span class="value">0</span>시간
                                    </span>
                                    <span class="minute">
                                            <span class="value">0</span>분
                                    </span>
                                </p>
                                <p class="hard">어려움 구간:
                                    <span class="hour">
                                            <span class="value">0</span>시간
                                    </span>
                                    <span class="minute">
                                            <span class="value">0</span>분
                                    </span>
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>

                <button class="save" type="button" disabled>코스 저장하기</button>
                <button class="capturing" type="button" disabled>코스 캡처 중...</button>
            </form>
        </div>
    </div>
    <div class="dialog-background">
        <dialog class="content">
            <img class="image" src="" alt="생성된 커스텀 코스">
            <input class="course-name-input" type="text" placeholder="코스명을 입력해주세요!">
            <p class="message">해당 커스텀 코스를 저장하시겠습니까?</p>
            <div class="button-wrap">
                <button class="confirm" disabled>확인</button>
                <button class="cancel">취소</button>
            </div>
        </dialog>
    </div>
</div>
