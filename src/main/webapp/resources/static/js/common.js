import {PATHS} from "./constants.js";


// DOM이 로드된 후 실행될 초기화 함수들
$(document).ready(function () {
    checkLoginRequired();
    setActiveNavFromUrl();
    initializeEventListeners();
    initializePasswordToggles();
    initializeFormValidation();
});

// 이벤트 리스너 초기화
function initializeEventListeners() {
    // 로그인/회원가입 모달 관련
    $('#main-menu .log-in').click(showLoginModal);
    $('#main-menu .log-out').click(handleLogout);
    $('#emailsignup-btn').click(loginToSignUp);
    $('#login-container .exitImage').click(closeLoginModal);
    $('#signup-container .exitImage').click(closeSignUpModal);

    // 이메일 입력 필드에 blur 이벤트 추가
    $('#signup-container #email').on('blur', checkEmailDuplicate);

    // 프로필 이미지 관련
    $('#profileImage').on('change', handleProfileImageChange);

    // 이메일 중복 확인 버튼 클릭 이벤트
    $('#email-check-btn').click(checkEmailDuplicate);

    // 폼 제출
    // 로그인 폼 제출 이벤트는 한 번만 바인딩
    // $('#login-container form').off('submit').on('submit', handleLogin);

    // 회원가입 버튼 타입 변경 및 이벤트 바인딩
    $('#emailsignup-btn').attr('type', 'button').off('click').on('click', loginToSignUp);

    //배경 클릭 시 모달 끄기
    $('#login-container').click((event) => event.stopPropagation());
    $('#signup-container').click((event) => event.stopPropagation());
    $('#login-overlay').click(closeLoginModal);
    $('#signup-overlay').click(closeSignUpModal);
}

// 네비게이션 활성화
function setActiveNavFromUrl() {
    const urlPath = window.location.pathname;
    const secondPathIdx = urlPath.indexOf('/', urlPath.indexOf('/') + 1);
    const thirdPathIdx = urlPath.indexOf('/', secondPathIdx + 1);

    let result = thirdPathIdx !== -1
        ? urlPath.substring(secondPathIdx + 1, thirdPathIdx)
        : urlPath.substring(secondPathIdx + 1);

    result = result.toLowerCase();
    const selectedPath = PATHS[result];

    if (selectedPath) {
        $("#nav-" + selectedPath).addClass("selected");
    }
}

// 모달 제어 함수들
function showLoginModal() {
    $('#login-overlay').css('display', 'flex');
    lockScroll();
}

function closeLoginModal() {
    $('#login-overlay').css('display', 'none');

    //입력하고 로그인창 닫고 다시 로그인창 열었을 떄 입력값 초기화하려고 만듦
    // 입력값 초기화
    $('#login-container #email').val('');
    $('#login-container #password').val('');
    // 에러 메시지 초기화
    $('#emailorpassword-confirm-error').text('');

    unlockScroll();
}

function showSignUpModal() {

    // 활동지역 데이터 가져오기
    $.ajax({
        url: path + '/getAllLocations.do',  // 또는 적절한 URL
        type: 'GET',
        success: function (locations) {
            // select 옵션 채우기
            const locationSelect = $('#location_id');
            locationSelect.empty(); // 기존 옵션 비우기
            locationSelect.append('<option value="">활동지역을 선택해주세요</option>');

            locations.forEach(function (location) {
                locationSelect.append(`<option value="${location.locationId}">${location.name}</option>`);
            });

            // 모달 표시
            $('#signup-overlay').css('display', 'flex');
            lockScroll();
        },
        error: function () {
            alert('활동지역 정보를 불러오는데 실패했습니다.');
        }
    });

}

function closeSignUpModal() {
    $('#signup-overlay').css('display', 'none');

    // 모든 입력 필드 초기화
    $('#signup-container form')[0].reset();

    // 프로필 이미지 기본 이미지로 초기화
    $('#profilePreview').attr('src', `${path}/resources/static/images/default-profile.svg`);

    // 모든 에러 메시지 초기화
    $('#email-error').text('');
    $('#password-error').text('');
    $('#password-confirm-error').text('');
    $('#name-error').text('');
    $('#nickname-error').text('');
    $('#locationId-error').text('');

    unlockScroll();
}

function loginToSignUp() {
    closeLoginModal();
    showSignUpModal();
}

// 스크롤 제어
function lockScroll() {
    const scrollY = window.scrollY;
    $('html, body').css({
        overflow: 'hidden',
        height: '100%',
        position: 'fixed',
        width: '100%'
    }).data('scroll-position', scrollY);
}

function unlockScroll() {
    const scrollY = $('html, body').data('scroll-position') || 0;
    $('html, body').css({
        overflow: 'auto',
        height: 'auto',
        position: '',
        width: ''
    });
    window.scrollTo(0, scrollY);
}

// 비밀번호 토글 초기화
function initializePasswordToggles() {
    $('.eye-button').click(function () {
        const input = $(this).closest('.addon_input').find('input');
        const img = $(this).find('img');

        input.attr('type', input.attr('type') === 'password' ? 'text' : 'password');

    });
}

// 폼 유효성 검사 초기화
function initializeFormValidation() {
    $('#signup-container form').on('submit', function (e) {
        e.preventDefault(); // 폼 제출 일단 막기

        const password = $('#signup-password').val();
        const passwordConfirm = $('#password-confirm').val();

        console.log('Password:', password); // 값 확인용
        console.log('Password Confirm:', passwordConfirm); // 값 확인용

        if (password !== passwordConfirm) {
            $('#password-confirm-error').text('비밀번호가 일치하지 않습니다.');
            return false;
        }

        // 비밀번호가 일치하면 회원가입 처리 진행
        handleSignup(e);
    });
}


// AJAX 처리 함수들
function ajaxRequest(url, data, successCallback, errorCallback) {
    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        processData: false,
        contentType: false,
        success: function (response) {
            successCallback(response);
        },
        error: function (xhr, status, error) {
            if (errorCallback) {
                errorCallback(xhr, status, error);
            } else {
                alert('서버 오류가 발생했습니다.');
            }
        }
    });
}


//로그인
// common.js 파일 내 handleLogin 함수 수정
// function handleLogin() {
//
//     const email = $('#login-email').val();
//     const password = $('#login-password').val();
//
//     if (!email || !password) {
//         $('#emailorpassword-confirm-error').text('이메일과 비밀번호를 입력해주세요.');
//         return;
//     }
//
//     // URL을 login.do로 변경
//     $.ajax({
//         url: path + '/login/',
//         type: 'POST',
//         data: {
//             email: email,
//             password: password
//         },
//         contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
//         success: function (response) {
//             console.log('서버 응답:', response);
//             if (response.success) {
//                 window.location.href = path + '/home';
//             } else {
//                 $('#emailorpassword-confirm-error').text(response.message || '로그인에 실패했습니다.');
//             }
//         },
//         error: function (xhr, status, error) {
//             console.error('로그인 에러:', xhr.responseText);
//             $('#emailorpassword-confirm-error').text('로그인 처리 중 오류가 발생했습니다.');
//         }
//     });
// }


// 이벤트 리스너 수정
// $(document).ready(function () {
    // 로그인 폼 제출 이벤트
    // $('#login-container form').on('submit', function (e) {
    //     e.preventDefault();
    //     handleLogin();
    // });
// });


// 회원가입 버튼 type도 수정이 필요함
//$('#emailsignup-btn').attr('type', 'button'); // type="submit"을 "button"으로 변경

// Signup handler 수정
function handleSignup(e) {
    e.preventDefault();

    // 필수 필드 검증
    const email = $('#signup-email').val();
    const password = $('#signup-password').val();
    const passwordConfirm = $('#password-confirm').val();
    const name = $('#name').val();
    const nickname = $('#nickname').val();
    const gender = $('input[name="gender"]:checked').val();
    const birthday = $('#birthday').val();
    const locationId = $('#location_id').val();

    // 기본 유효성 검사
    if (!email || !password || !passwordConfirm || !name || !nickname || !gender || !birthday) {
        alert('모든 필수 항목을 입력해주세요.');
        return;
    }

    /* 
    // 비밀번호 일치 검사
    if (password !== passwordConfirm) {
        $('#password-confirm-error').text('비밀번호가 일치하지 않습니다.');
        return;
    } */

    // 이메일 중복 확인 메시지 체크
    const emailErrorMsg = $('#email-error').text();
    if (emailErrorMsg !== '사용 가능한 이메일입니다.') {
        alert('이메일 중복 확인을 해주세요.');
        return;
    }

    // FormData 객체 생성
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('name', name);
    formData.append('nickname', nickname);
    formData.append('gender', gender);
    formData.append('birthday', birthday);
    formData.append('locationId', locationId);

    // 프로필 이미지가 있는 경우 추가
    const profileImage = $('#profileImage')[0].files[0];
    if (profileImage) {
        formData.append('profileImage', profileImage);
    }

    // 소개글이 있는 경우 추가
    const intro = $('#intro').val();
    if (intro) {
        formData.append('intro', intro);
    }

    $.ajax({
        url: path + '/signup.do',  // .do 패턴 사용
        type: 'POST',
        data: formData,
        processData: false,  // FormData를 사용하므로 false로 설정
        contentType: false,  // FormData를 사용하므로 false로 설정
        success: function (response) {
            console.log('서버 응답:', response);
            if (response.success) {
                alert(response.message || '회원가입이 완료되었습니다.');
                closeSignUpModal();
                showLoginModal();
            } else {
                if (response.errors) {
                    // 각 필드별 에러 메시지 표시
                    Object.keys(response.errors).forEach(field => {
                        $(`#${field}-error`).text(response.errors[field]);
                    });
                } else {
                    alert(response.message || '회원가입 처리 중 오류가 발생했습니다.');
                }
            }
        },
        error: function (xhr, status, error) {
            console.error('회원가입 에러:', xhr.responseText);
            alert('회원가입 처리 중 오류가 발생했습니다.');
        }
    });
}


//로그아웃
function handleLogout() {
    window.location.href = `${path}/logout`;
}

// 프로필 이미지 관련 함수들
// 프로필 이미지 변경 처리
function handleProfileImageChange(e) {
    const file = e.target.files[0];
    const preview = document.getElementById('profilePreview');
    const isSignup = $(e.target).closest('#signup-container').length > 0; // 회원가입 폼 내부인지 확인

    if (file) {
        // 이미지 파일 타입 검증
        if (!file.type.startsWith('image/')) {
            alert('이미지 파일만 업로드할 수 있습니다.');
            return;
        }

        // 파일 크기 제한 (5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('파일 크기는 5MB 이하여야 합니다.');
            return;
        }

        // 이미지 미리보기
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.src = e.target.result;
        };
        reader.readAsDataURL(file);

        // 회원가입 중이 아닐 때만 즉시 업데이트 요청
        if (!isSignup) {
            updateProfileImage(file);
        }
    } else {
        // 파일이 선택되지 않으면 기본 이미지로 되돌리기
        preview.src = `${path}/resources/static/images/default-profile.svg`;
    }
}


// 프로필 이미지 업데이트 함수
function updateProfileImage(file) {
    const formData = new FormData();
    formData.append('profileImage', file);

    $.ajax({
        url: `${path}/updateProfile`,  // 미리 정의된 path 변수 사용
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            if (response.success) {
                // 프로필 이미지 업데이트 성공
                if (response.newImageUrl) {
                    $('#profilePreview').attr('src', response.newImageUrl);
                }
            } else {
                alert(response.message || '프로필 이미지 업데이트에 실패했습니다.');
            }
        },
        error: function () {
            alert('프로필 이미지 업데이트 중 오류가 발생했습니다.');
        }
    });
}


// 이메일 중복 체크 함수 수정
function checkEmailDuplicate() {
    const email = $('#signup-email').val();  // id 수정
    const errorSpan = $('#email-error');

    console.log('Checking email:', email);  // 이메일 값 확인
    console.log('Request URL:', `${path}/hike/checkEmail.do`);  // 요청 URL 확인


    // 이메일 입력 확인
    if (!email) {
        errorSpan.text('이메일을 입력해주세요.').css('color', 'red');
        return;
    }

    // 이메일 형식 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorSpan.text('올바른 이메일 형식이 아닙니다.').css('color', 'red');
        return;
    }

    $.ajax({
        url: path + '/checkEmail.do',  // 경로 수정
        type: 'POST',
        data: {email: email},
        success: function (response) {
            if (response.exists) {
                errorSpan.text('이미 사용중인 이메일입니다.').css('color', 'red');
            } else {
                errorSpan.text('사용 가능한 이메일입니다.').css('color', 'green');
            }
        },
        error: function () {
            errorSpan.text('이메일 중복 확인 중 오류가 발생했습니다.').css('color', 'red');
        }
    });
}

// 로그인 필요 여부 체크 및 리디렉션 처리 함수
function checkLoginRequired() {
    const currentUrl = new URL(window.location.href);
    const params = currentUrl.searchParams;
    const targetParam = 'state';

    if (params.has(targetParam)) {
        const stateValue = params.get(targetParam);

        if (stateValue === 'denied' || stateValue === 'failed') {
            params.delete(targetParam);
            updateUrl(params);
            showLoginModal();
        } else if (stateValue === 'success') {
            params.delete(targetParam);
            updateUrl(params);
        }
    }
}

function updateUrl(params) {
    const currentUrl = new URL(window.location.href);
    const newUrl = currentUrl.origin + currentUrl.pathname + (params.toString() ? ('?' + params.toString()) : '');
    window.history.replaceState({}, '', newUrl);
}


// 이메일 중복확인 버튼 클릭 이벤트
$('#email-check-btn').click(checkEmailDuplicate);

