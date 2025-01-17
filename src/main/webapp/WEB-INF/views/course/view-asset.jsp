<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="path" value="${pageContext.request.contextPath}"/>

<!-- inc > asset.jsp -->
<link rel="stylesheet" href="${path}/resources/static/css/routes/course.css">
<script src="https://code.jquery.com/jquery-3.7.1.js"></script>
<script type="module" src="${path}/resources/static/js/course/view.js"></script>
<script type="module" src="${path}/resources/static/js/common.js"></script>
<script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=d8de9ed5ee23a0becf5c950f18bbddf4"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/canvg@3.0.10/lib/umd.min.js"></script>
