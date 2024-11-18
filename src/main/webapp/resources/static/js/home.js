document.addEventListener('DOMContentLoaded', function() {
    const contextPath = '${path}';
    const buttons = document.querySelectorAll('.mtnbtn');
    const mountainImage = document.getElementById('mountainImage');
    const imagePath = '/hike/resources/static/images/mtn/';

    // 마운틴 버튼 클릭 이벤트 리스너
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const mountainName = this.textContent;
            mountainImage.src = imagePath + mountainName + '.jpg';
            // 해당 산 페이지로 이동하는 코드 추가
            const url = `http://localhost:8090/hike/course/view?mtId=13&mtName=%EB%B6%81%ED%95%9C%EC%82%B0&mtY=37.6594&mtX=126.9822`;
            window.location.href = url;
        });
    });


    // 마운틴 이미지 호버 이벤트 리스너
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            const mountainName = this.textContent;
            mountainImage.src = imagePath + mountainName + '.jpg';
        });
    });
});

const mountains = document.querySelectorAll('.img-rad');
mountains.forEach(mountain => {
    mountain.addEventListener('click', function() {
        const mountainName = mountain.getAttribute('data-mountain');
        const url = `http://localhost:8090/hike/course/view?mtId=13&mtName=%EB%B6%81%ED%95%9C%EC%82%B0&mtY=37.6594&mtX=126.9822`;
        window.location.href = url;
    });
});


    document.addEventListener("DOMContentLoaded", function() {
        // 탭 전환 함수
        function switchTab(tabId) {
            // 모든 탭 내용을 숨김
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('active');
            });
            
            // 모든 탭 버튼의 활성화 상태 제거
            document.querySelectorAll('.tab-button').forEach(button => {
                button.classList.remove('active');
            });
            
            // 선택된 탭 내용과 버튼을 활성화
            document.getElementById(tabId).classList.add('active');
            document.querySelector(`.tab-button[data-tab="${tabId}"]`).classList.add('active');
        }

        // 모든 탭 버튼에 클릭 이벤트 추가
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                switchTab(tabId);
            });
        });

        // 초기 로드 시 자유 게시판 탭을 자동으로 활성화
        switchTab('free');
    });
