<%@ page contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:set var="path" value="${pageContext.request.contextPath}"/>

<div id="clubadd-title">모임 생성 하기</div>

<form method="POST" action="${path}/club/addok.do" enctype="multipart/form-data"
	id="club-add-form">
	
	<div class="form-club-header">	
	<div class="form-club-content">
	<div class="form-group">
		<div>
			<label>공개 여부</label>
		</div>
		<div id="radio-private">
			<label class="chk_round"> <input type="radio" name="clubIsPrivate"
				value="0" required> <span class="radio-btn"></span> <span
				class="label">공개</span>
			</label> 
			<label class="chk_round"> <input type="radio" name="clubIsPrivate"
				value="1" required> <span class="radio-btn"></span> <span
				class="label">비공개</span>
			</label>
		</div>
	</div>

	
	<div class="form-group">
		<div>
			<label>모임명</label>
		</div>
		<input class="addclub_input" type="text" name="clubName" id="clubName" placeholder="모임명을 입력해 주세요."
				required>
		<span class="error-message" id="name-error"></span>
	</div>

	<div class="form-group">
		<div>
			<label>활동지역</label>
		</div>
		<select class="addclub_input" name="clubLocationId" id="clubLocationId" required >
			<option value="1">서울특별시</option>
			<option value="2">부산광역시</option>
			<option value="3">대구광역시</option>
			<option value="4">인천광역시</option>
			<option value="5">광주광역시</option>
			<option value="6">대전광역시</option>
			<option value="7">울산광역시</option>
			<option value="8">새종특별자치시</option>
			<option value="9">경기도</option>
			<option value="10">강원도</option>
			<option value="11">충청북도</option>
			<option value="12">충청남도</option>
			<option value="13">전라북도</option>
			<option value="14">전라남도</option>
			<option value="15">경상북도</option>
			<option value="16">경상남도</option>
			<option value="17">제주도</option>
<%--			<c:forEach items="${locations}" var="location">--%>
<%--				<option value="${location.locationId}">${location.name}</option> <!-- locationName 속성 사용 -->--%>
<%--			</c:forEach>--%>
		</select>
	</div>

	<div class="form-group">
		<div>
			<label>최대 인원수 (1~50명)</label>
		</div>
		<input class="addclub_input" type="number" name="clubMaxMember" id="clubMaxMember" min=1 max=50 placeholder="모임 최대 인원수를 선택해주세요."
				required>
	</div>
	</div>
	
	
	<div class="form-club-img">
	<div class="form-group">
		<div>
			<label>대표사진</label>
		</div>
		<div class="club-img-upload">
			<input type="file" name="clubImage" id="clubImage" accept="image/*"
				style="display: none;">
			<!-- <div class="inner"> -->
			<label for="clubImage">
				<img class="club-upload-image"
									 src="${path}/resources/static/images/club-upload-image.jpg" alt="모임기본이미지">
			</label>
			<!-- </div> -->
		</div>
		<div class="preview-image"></div>
	</div>
	</div>
	</div>
	
	
	<div class="form-club-footer">
	<div class="form-group">
		<div>
			<label>모임 소개</label>
		</div>
		<textarea class="addclub_input addclub_full" name="clubIntro" id="clubIntro" maxlength="600"
				placeholder="내가 만드는 모임의 소개를 간단하게 작성해 주세요 !"></textarea>
	</div>

	<div class="form-group">
		<div>
			<label>해시 태그</label>
		</div>
		<input class="addclub_input" type="text" name="clubTag" id="clubTag"
				placeholder="해시태그 입력(15자), (엔터)를 눌러주세요.">
		<div id="addclub-tagcontent">엔터를 누르면 해시태그가 완성돼요. 최대 5개</div>
	</div>

	<div class="form-group" id="addclub-code">
		<div>
			<label>초대코드</label>
		</div>
		<span>
			<input value="" class="addclub_input" type="text" name="clubCode" id="clubCode" placeholder="초대코드생성 버튼을 누르면 자동으로 생성됩니다 !"
				required readonly>
		</span>
		<span>
			<button type="button" id="random-code-btn" onclick="generateRandomCode();">초대 코드 생성</button>
		</span>

	</div>
	
	<div class="addclub-btn-area">
		<button type="submit" id="addclub-btn" onclick="confirmSubmission();">모임 생성하기</button>
<%--		onclick="location.href='http://localhost:8090/hike/club';"--%>
	</div>
	</div>

</form>

<script>
	//태그 생성하기
	const input = document.getElementById('tag');
	const tagify = new Tagify(input);
	//new Tagify(document.getElementById('tag-input'));


	// 프로필 이미지 첨부
	document.getElementById('image').addEventListener('change', function(e) {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = function(e) {
				// 기본 프로필 이미지의 src를 새로운 이미지로 변경
				document.querySelector('.club-upload-image').src = e.target.result;
			}
			reader.readAsDataURL(file);
		}
	});


	function confirmSubmission() {
		// 폼 데이터 가져오기
		const name = document.getElementById('clubName').value;
		const locationId = document.getElementById('clubLocationId').value;
		const maxMember = document.getElementById('clubMaxMember') ? document.getElementById('maxMember').value : '';
		const intro = document.getElementById('clubIntro').value;
		const code = document.getElementById('clubCode').value;
		// 선택된 라디오 버튼의 값 가져오기
		const isPrivate = document.querySelector('input[name="clubIsPrivate"]:checked').value;
		// 태그 배열 가져오기
		const tags = tagify.value.map(tag => tag.value).join(', '); // 태그를 문자열로 변환

		// Alert로 데이터 확인
		alert("모임명: " + name + "\n" +
				"활동지역: " + locationId + "\n" +
				"최대 인원수: " + maxMember + "\n" +
				"모임 소개: " + intro + "\n" +
				"초대 코드: " + code + "\n" +
				"태그: " + tags + "\n" +
				"공개 여부: " + (isPrivate === '0' ? '공개' : '비공개'));

		// true를 반환하면 폼이 제출되고, false를 반환하면 제출이 취소됩니다.
		return true; // 데이터를 확인한 후 제출
	}

</script>