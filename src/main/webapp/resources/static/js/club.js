
/* 플러스버튼으로 버튼 안보이게 하기 */
function plusBtnToggle() {
  
  // 토글 할 버튼 선택 (otpbtn,addbtn)
  const otpbtn = document.getElementById('club-otp-btn');
  const addbtn = document.getElementById('club-add-btn');
  
  // 플러스버튼 이미지 찾기
  const plusImage = document.getElementById('plus-image');

    // 플러스버튼 이미지에 rotate 클래스를 토글
    plusImage.classList.toggle('rotate');

  // otpbtn,addbtn 숨기기 (visibility: hidden)
  if(otpbtn.style.visibility !== 'hidden'
  && addbtn.style.visibility !== 'hidden') {
    otpbtn.style.visibility = 'hidden';
    addbtn.style.visibility = 'hidden';

  }
  // otpbtn,addbtn 보이기 (visibility: visible)
  else {
      otpbtn.style.visibility = 'visible';
      addbtn.style.visibility = 'visible';
  }
}


//팝업창 띄우기
function showModal() {
    $('html, body').css({
        overflow: 'hidden',
        height: '100%'
    });
    $('#popup').css('display', 'flex');
}

//팝업창 닫기
function popupClose() {
	$('html, body').css({
        overflow: 'visible',
        height: '100%'
    });
	$('#popup').css('display', 'none');
}


// 초대 코드 랜덤 생성하기
function generateRandomCode() {
    // 랜덤 코드 생성 (예: 6자리의 알파벳과 숫자 조합)
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    // 생성된 코드를 입력 필드에 설정
    document.getElementById('clubCode').value = code;
}


// 페이지 로드 시 자동으로 코드 생성 (원하는 경우 추가)
// window.onload = generateRandomCode;

//
// // 어떤게 폼으로 보내지는지 봐보자!!
// const btn = document.querySelector("#addclub-btn");
//
// btn.addEventListener("click", function(){
//
//     const name = document.getElementById('name').value;
//     const maxMember = document.getElementById('max_member').value;
//     const locationId = document.getElementById('location_id').value;
//     const image = document.getElementById('image').value;
//     const tag = document.getElementById('tag').value;
//     const code = document.getElementById('code').value;
//     const isPrivate = document.querySelector('input[name="is_private"]:checked').value;
//
//     // 폼 데이터 확인
//     alert(`모임명: ${name}\n최대 인원수: ${maxMember}\n활동지역 ID: ${locationId}\n대표사진: ${image}\n해시태그: ${tag}\n초대코드: ${code}\n공개 여부: ${isPrivate}`);
// });