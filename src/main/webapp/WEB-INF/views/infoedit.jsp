<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:set var="path" value="${pageContext.request.contextPath}"/>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>회원가입</title>
    <link rel="stylesheet" href="${path}/resources/static/css/inc/signup.css">
</head>
<body>
 	
 	<div id="signup-container">
    <form method="POST" action="${path}/signup" enctype="multipart/form-data">
        <div class="header">
            <h4>회원정보 수정</h4>
            <div class="exitButton">
                <input type="button" name="exit" id="exit" accept="image/*" style="display: none;">
                <label for="exit">
                    <img class="exitImage" src="${path}/resources/static/images/close.svg" alt="종료버튼">
                </label>
            </div>
        </div>
 

            <div id="signup-containerSon">
                <div class="form-group">
                    <div class="profile-upload">
                        <input type="file" name="profileImage" id="profileImage" accept="image/*" style="display: none;">
                        <label for="profileImage">
                            <img class="defaultprofile" src="${path}/resources/static/images/default-profile.svg" alt="기본프로필">
                            <img class="edit_icon" src="${path}/resources/static/images/edit_icon.svg" alt="편집아이콘">  <!-- 추가된 편집 아이콘입니당 건들지 마세요. -->
                        </label>
                    </div>
                    <div class="preview-image"></div>
                </div>

                <div class="form-group">
                    <div class="email-noedit"><label>이메일</label></div>
                    <div class="addon_input">
                        <input type="email" name="email" id="email" value="sist1985@naver.com" readonly> <!-- 여기에 회원 이메일 넣기 -->
                    </div>
                </div>

                <div class="form-group">
                    <div><label>비밀번호</label></div>
                    <div class="addon_input">
                        <input type="password" name="password" id="password" placeholder="새비밀번호를 입력해주세요" required>
                        <div class="addon">
                            <button type="button" class="eye-button">
                                <img alt="보기" loading="lazy" width="20" height="15" decoding="async" src="${path}/resources/static/images/eye.svg" style="color: transparent;">
                            </button>
                        </div>
                    </div>
                    <span class="error-message" id="password-error"></span>
                </div>

                <div class="form-group">
                    <div><label>비밀번호 재입력</label></div>
                    <div class="addon_input">
                        <input type="password" id="password-confirm" placeholder="새비밀번호를 다시 입력해주세요" required>
                        <div class="addon">
                            <button type="button" class="eye-button">
                                <img alt="보기" loading="lazy" width="20" height="15" decoding="async" src="${path}/resources/static/images/eye.svg" style="color: transparent;">
                            </button>
                        </div>
                    </div>
                    <span class="error-message" id="password-confirm-error"></span>
                </div>

                <div class="form-group">
                    <div><label>이름</label></div>
                    <div class="addon_input">
                        <input type="text" name="name" id="name" value="이택조" readonly>
                    </div>
                </div>

                <div class="form-group">
                    <div><label>닉네임</label></div>
                    <div class="addon_input">
                        <input type="text" name="nickname" id="nickname" value="멋진남자" required>
                    </div>
                    <span class="error-message" id="nickname-error"></span>
                </div>

                <div class="form-group">
                    <div><label>성별</label></div>
                    <div class="radio-gender">
                        <label class="chk_round">
                            <input type="radio" name="gender" value="M" required>
                            <span class="radio-btn"></span>
                            <span class="label">남자</span>
                        </label>
                        <label class="chk_round">
                            <input type="radio" name="gender" value="F" required>
                            <span class="radio-btn"></span>    
                            <span class="label">여자</span>
                        </label>
                    </div>
                </div>

                <div class="form-group">
                    <div><label>출생년도</label></div>
                    <div class="addon_input">
                        <input type="date" name="birthday" id="birthday" placeholder="출생년도를 선택해주세요." value="1988-04-29" readonly>
                    </div>
                </div>

                <div class="form-group">
                    <div><label>활동지역</label></div>
                    <div class="addon_input">
                        <select name="locationId" id="locationId" required>
                            <option value="">활동지역을 선택해주세요</option>
                            <c:forEach items="${locations}" var="location">
                                <option value="${location.locationId}">${location.locationName}</option>
                            </c:forEach>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <div><label>소개</label></div>
                    <div class="addon_textarea">
                        <textarea name="intro" maxlength="600" placeholder="자유롭게 소개글을 작성해주세요. (200자 이하)" >중년은 죽지 않아 다 같이 열정 열정 열정!!!!!!!!!!!</textarea>
                    </div>
                </div>

            </div>
           	<button type="submit" id="infoedit-btn">수정하기</button>
        </form>
    </div>

    <script>
        // 비밀번호 보기/숨기기 토글
        document.querySelectorAll('.eye-button').forEach(button => {
            button.addEventListener('click', function() {
                const input = this.closest('.addon_input').querySelector('input');
                if (input.type === 'password') {
                    input.type = 'text';
                    this.querySelector('img').src = '${path}/resources/static/images/icon/eye-off.svg';
                } else {
                    input.type = 'password';
                    this.querySelector('img').src = '${path}/resources/static/images/icon/eye.svg';
                }
            });
        });

        // 폼 제출 전 유효성 검사
        document.querySelector('form').addEventListener('submit', function(e) {
            const password = document.querySelector('#password').value;
            const passwordConfirm = document.querySelector('#password-confirm').value;
            
            if (password !== passwordConfirm) {
                e.preventDefault();
                document.querySelector('#password-confirm-error').textContent = '비밀번호가 일치하지 않습니다.';
                return;
            }
        });
        
        // 프로필 이미지 첨부
        document.getElementById('profileImage').addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    // 기본 프로필 이미지의 src를 새로운 이미지로 변경
                    document.querySelector('.defaultprofile').src = e.target.result;
                }
                reader.readAsDataURL(file);
            }
        });
        
    </script>
</body>
</html>