<%@ page contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="path" value="${pageContext.request.contextPath}"/>

<!-- inc > asset.jsp -->
<link rel="stylesheet" href="${path}/resources/static/css/routes/club.css">
<link rel="stylesheet" href="${path}/resources/static/css/routes/club-view.css">
<link rel="stylesheet" href="${path}/resources/static/css/routes/community.css">
<link rel="stylesheet" href="${path}/resources/static/css/inc/sub-menu.css">
<link rel="stylesheet" href="${path}/resources/static/css/inc/signup.css">
<link rel="stylesheet" href="${path}/resources/static/css/routes/mypage.css">

<script src="https://code.jquery.com/jquery-3.7.1.js"></script>

<script src="${path}/resources/static/js/dist/index.global.js"></script>
<!-- type="module" 제거하고 순서 조정해봄 -->
<script src="${path}/resources/static/js/mypage.js"></script>
<script type="module" src="${path}/resources/static/js/common.js"></script>