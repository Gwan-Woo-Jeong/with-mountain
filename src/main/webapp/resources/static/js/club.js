
/**
 * 플러스 버튼을 클릭할 때 otpbtn과 addbtn의 가시성을 토글하는 함수입니다.
 * 플러스 버튼 이미지에 rotate 클래스를 추가하거나 제거합니다.
 */
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


/**
 * 팝업창을 띄우는 함수입니다.
 * 팝업창이 열릴 때 페이지의 스크롤을 비활성화합니다.
 */
function showModal() {
    $('html, body').css({
        overflow: 'hidden',
        height: '100%'
    });
    $('#popup').css('display', 'flex');
}

/**
 * 팝업창을 닫는 함수입니다.
 * 팝업창이 닫힐 때 페이지의 스크롤을 활성화합니다.
 */
function popupClose() {
	$('html, body').css({
        overflow: 'visible',
        height: '100%'
    });
	$('#popup').css('display', 'none');
}


/**
 * 6자리의 랜덤 초대 코드를 생성하여 입력 필드에 설정하는 함수입니다.
 * 생성된 코드는 대문자 알파벳과 숫자로 구성됩니다.
 */
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
//window.onload = generateRandomCode;

