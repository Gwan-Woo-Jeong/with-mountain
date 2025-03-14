<%@ page contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:set var="path" value="${pageContext.request.contextPath}"/>

<%-- 사진 등록 팝업창 띄우기 --%>
<div id="popupAddGallery">
    <div class="window">

        <div class="popup-close">
            <button type="button" class="popup-close-btn" onclick='popupCloseAddGallery();'>

                <img class="close-logo" src="${path}/resources/static/images/close.svg" alt="닫기">
            </button>
        </div>

        <%-- 팝업 내용 여기 안에서 작업--%>
        <div class="window-title">사진 추가하기</div>

        <form method="POST" action="/hike/club/galleryok" enctype="multipart/form-data">
        <input type="hidden" name="club_id" value="${clubDTO.clubId}">
        <table class="window-content">
            <tr>
                <th>산 이름: </th>
<%--                산 코스 작업 시 input태그로 산 이름 받아오기? --%>
                <td>북한산</td>
<%--                <td><input class="mt-name-input" type="text" name="title" id="mt-name-input" placeholder="산 이름을 입력해주세요." required></td>--%>
            </tr>
            <tr>
                <th>파일명: </th>
                <td>
                    <input type="file" name="image" id="galleryImage" class="galleryImage" accept="image/*">
                </td>
            </tr>
        </table>

        <div class="form-club-img">
            <div class="form-group">

                <div class="club-img-upload">
                    <!-- <div class="inner"> -->
                    <label for="galleryImage">
                        <img class="club-default-image" src="${path}/resources/static/images/club-default-image.jpg" alt="모임기본이미지">
                    </label>
                </div>

                <div class="preview-image"></div>

            </div>
        </div>

        <%-- 취소 + 등록 버튼 --%>
        <div class="window-btn">
            <button type="button" class="close-btn" onclick='popupCloseAddGallery();'>취소</button>
            <button type="submit" class="plus-btn">등록</button>
<%--            <button type="submit" class="plus-btn" onclick="location.href='${path}/club/gallery?club_id=${clubDTO.club_id}'">등록</button>--%>
        </div>

        </form>

    </div>
</div>

<%-- 사진 클릭시 상세 팝업창 띄우기 --%>
<div id="popupImage">
    <div class="window">

        <div class="popup-close">
            <button type="button" class="popup-close-btn" onclick='ModalImageClose();'>
                <img class="close-logo" src="${path}/resources/static/images/close.svg" alt="닫기">
            </button>
        </div>

        <%-- 팝업 내용 여기 안에서 작업--%>
<%--            <img class="club-image" src="${path}/resources/static/images/club/${galleryDTO.image}.jpg" alt="모임 사진첩 사진 리스트">--%>
            <img class="club-image" src="" alt="모임 사진첩 사진 리스트">
            <div class="club-image-content">
                <div class="club-image-title"><span>북한산</span> 등반</div>
                <div class="club-image-user">한사랑</div>
                <div class="club-image-date">${galleryDTO.galleryDate}</div>
            </div>
        <input type="hidden" class="gallery-id" value="${galleryDTO.clubGalleryId}">

    </div>
</div>

<!-- jsp작업 -->
<input type="hidden" name="club_id" value="${clubDTO.clubId}">
<div id="club-profile-background"></div>

<!-- 모임 프로필 -->
<div id="club-profile">

    <div id="profile-info">
        <div class="club-profile-image">
            <img src="${path}/resources/static/images/club-image.jpg" alt="모임 프로필 사진">
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
        <button type="button" class="chat-btn">
            <img class="chat-logo" src="${path}/resources/static/images/chat-dark.svg" alt="채팅 로고">
        </button>
        <button type="submit" class="register-btn" name="register-btn" onclick="location.href='${path}/club/view'">가입하기</button>
    </div>

</div>

<%-- 서브 메뉴 --%>
<header id="sub-menu">
    <nav>
        <ul>
            <li><a href="${path}/club/view?clubId=${clubDTO.clubId}">정보</a></li>
            <li><a href="${path}/club/scheduler?clubId=${clubDTO.clubId}" id="club-schedule">일정</a></li>
            <li><a href="${path}/club/hike?clubId=${clubDTO.clubId}" id="club-hike">등산 기록</a></li>
            <li class="selected"><a href="${path}/club/gallery?clubId=${clubDTO.clubId}" id="club-gallery">사진첩</a></li>
        </ul>
    </nav>
</header>

<%-- 사진 --%>
<div id="gallery-sub-head">
    <div class="gallery-title">사진첩</div>

    <button type="button" class="image-add-btn" onclick="showModalAddGallery();">
        <img class="plus-logo" src="${path}/resources/static/images/plus.svg" alt="플러스 로고">
        <span>추가하기</span>
    </button>

</div>

<%--    <div id="club-gallery-list">--%>
<%--    <c:forEach items="${galleryList}" var="galleryDTO">--%>
<%--        <div class="club-gallery"><img src="${path}/resources/static/images/club/${galleryDTO.image}.jpg" alt="모임 사진첩 사진" onclick="showModalImage();"> </div>--%>
<%--    </c:forEach>--%>
<%--    </div>--%>

<div id="club-gallery-list">
    <c:forEach items="${galleryList}" var="galleryDTO">
        <div class="club-gallery">
            <img src="${path}/resources/static/images/club/${galleryDTO.galleryImage}" alt="모임 사진첩 사진" onclick="showModalImage('${path}/resources/static/images/club/${galleryDTO.galleryImage}', '${galleryDTO.galleryDate}', '${galleryDTO.galleryImage}', '${galleryDTO.clubGalleryId}');">
        </div>
    </c:forEach>
</div>


<script>
    //이미지 등록시 미리보기 작업
    document.getElementById('galleryImage').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                // 기본 프로필 이미지의 src를 새로운 이미지로 변경
                document.querySelector('.club-default-image').src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    });
</script>