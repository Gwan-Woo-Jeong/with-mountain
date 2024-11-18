<%@ page contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:set var="path" value="${pageContext.request.contextPath}"/>

<script>
    const previousPage = document.referrer;
    if (previousPage) {
        alert('로그인 후 이용해주세요 😀');
        location.replace(previousPage + '?login-required=true');
    } else {
        alert('잘못된 접근입니다 🚧');
        location.replace('${path}/home');
    }
</script>