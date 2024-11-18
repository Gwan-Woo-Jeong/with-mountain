/**
 * Community 관련 jsp가 참조하는 JavaScript 파일입니다.
 * @author Son Min-ji
 */

//----------글쓰기 툴 라이브러리
/**
 * add.jsp와 edit.jsp 글 작성 및 수정 폼에 사용되는 라이브러리 method입니다.
 */
document.addEventListener("DOMContentLoaded", function() {
    // Quill 에디터 초기화
    var quill = new Quill('#content-container', {
        theme: 'snow', // 기본 테마 'snow' 사용
        modules: {
            toolbar: [
                [{ 'header': '1' }, { 'header': '2' }, 'bold', 'italic', 'underline', 'strike'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['link', 'image']
            ]
        },
        placeholder: '내용을 작성해주세요.' // Quill 에디터의 placeholder 설정
    });

    // MutationObserver 예시 (DOM 변경을 감지하고 실행)
    const observer = new MutationObserver(function(mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                console.log('DOM 변경 발생:', mutation);
                // 여기서 DOM 변화가 있을 때 할 작업을 넣어줍니다.
            }
        }
    });

    // 감시할 대상 (예: #content-container)
    const contentContainer = document.getElementById('content-container');
    if (contentContainer) {
        observer.observe(contentContainer, { childList: true, subtree: true });
    }

    // 폼 제출 시 Quill 에디터 내용 textarea로 복사
    const form = document.querySelector('form');
    const contentTextarea = document.querySelector('#content');
    
    if (form && contentTextarea) {
        // 폼 제출 시 이벤트 리스너
        form.addEventListener('submit', function(event) {
            // Quill 에디터의 내용을 textarea에 복사
            contentTextarea.value = quill.root.innerHTML;
        });
    } else {
        console.error("폼 또는 텍스트 영역(#content)가 존재하지 않습니다.");
    }
});


//글 삭제
/**
 * view.jsp에서 글 삭제하기 버튼에 실행되도록 한 method입니다.
 */
document.addEventListener('DOMContentLoaded', function () {
    const deleteButton = document.getElementById('deleteBtn');
    
    deleteButton.addEventListener('click', confirmDelete);
});

function confirmDelete() {
    if (confirm("정말 삭제하시겠습니까?")) {
        fetch('/delete-endpoint', { 
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ })
        })
        .then(response => {
            if (response.ok) {
                // 삭제가 성공적으로 이루어졌다면 다른 페이지로 리다이렉션
                window.location.href = '/success-page'; // 성공 후 이동할 페이지 URL
            } else {
                alert("삭제에 실패했습니다.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("삭제 중 오류가 발생했습니다.");
        });
    } else {
        console.log("삭제 취소됨");
    }
}



function submitComment() {
    // 댓글 내용 가져오기
    const commentText = document.getElementById('new-comment').value;

    // 댓글 내용이 비어있지 않은지 확인
    if (!commentText.trim()) {
        alert('댓글 내용을 입력해주세요.');
        return;
    }

    // AJAX 요청
    $.ajax({
        url: `${path}/community/comment`, // 댓글 등록을 위한 URL
        type: 'POST', // 요청 방식
        contentType: 'application/json', // 전송할 데이터의 형식
        data: JSON.stringify({ comment: commentText }), // 전송할 데이터
        success: function(response) {
            console.log('서버 응답:', response);
            // 성공 시 처리 (댓글 목록 갱신 등)
            alert('댓글이 등록되었습니다.'); // 사용자에게 알림
            document.getElementById('new-comment').value = ''; // 입력 필드 초기화
            // 댓글 목록을 갱신하는 함수 호출 (필요 시)
            // loadComments(); // 예시: 댓글 목록을 다시 불러오는 함수
        },
        error: function(a, b, c) {
            console.log('에러 발생:', a, b, c); // 에러 처리
            alert('댓글 등록 중 오류가 발생했습니다.'); // 사용자에게 오류 알림
        }
    });
}
    