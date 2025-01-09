/**
 * view.jsp가 참조하는 JavaScript 파일입니다.
 * 등산로 데이터와 Kakao 지도 API 기능을 혼합하여 view.jsp로 출력하는 용도로 사용됩니다.
 * 일부 설정은 common.js를 참조해야 합니다.
 * @author Kim Young-jin, Jeong Gwan-woo
 */
import {initMap} from './common.js';

const MIN_ZOOM_LEVEL = 7;
const MAX_ZOOM_LEVEL = 1;
const COLORS = {
    OUT: '#ADB5BD',
    OVER: '#343A40',
    FORESTGREEN: 'forestgreen'
};
const SPOT_TYPES = {
    '시종점': {imgSrc: '/hike/resources/static/images/spot-startend.svg', imgSize: [16, 16]},
    '분기점': {imgSrc: '/hike/resources/static/images/point.svg', imgSize: [5, 5]}
};

const data = await loadJSON(); // For Test
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const mtY = urlParams.get('mtY');
const mtX = urlParams.get('mtX');
const roadList = data["roadList"];
const summary = {
    count: 0,
    distance: 0,
    time: 0,
}

const map = initMap(
    '#view-map',
    parseFloat(mtY),
    parseFloat(mtX),
    MIN_ZOOM_LEVEL,
    MAX_ZOOM_LEVEL);

console.log(data);

drawRoads();
drawSpotMarkers();

async function loadJSON() {
    try {
        const jsonPath = new URL('resources/static/data/mountain.json', 'http://localhost:8090/hike/');
        const response = await fetch(jsonPath); // JSON 파일 경로
        if (!response.ok) {
            throw new Error('JSON 불러오기 결과 실패');
        }
        return await response.json();
    } catch (error) {
        console.error('JSON: 불러오는 도중 실패', error);
    }
}

function drawSpotMarkers() {
    spotList.forEach(spot => {
        const spotType = spot.spotType;
        const point = new kakao.maps.LatLng(spot.spotY, spot.spotX);
        const markerConfig = SPOT_TYPES[spotType];
        if (markerConfig) {
            const markerImg = new kakao.maps.MarkerImage(markerConfig.imgSrc, new kakao.maps.Size((markerConfig.imgSize)[0], (markerConfig.imgSize)[1]));
            new kakao.maps.Marker({
                map: map,
                position: point,
                image: markerImg
            });
        }
    });
}

function drawRoads() {
    for (let i = 0; i < roadList.length; i++) {
        const road = roadList[i];
        const path = road.coordList.map(coord => new kakao.maps.LatLng(coord.roadY, coord.roadX));
        const polyline = new kakao.maps.Polyline({
            map,
            path,
            strokeWeight: 5,
            strokeColor: COLORS.OUT,
            strokeOpacity: 1,
            strokeStyle: 'solid',
            lineNum: i,
        });

        polyline.isClicked = false;
        polyline.setMap(map);

        polyline.addListener('mouseover', () => {
            if (!polyline.isClicked) setStrokeColor(COLORS.OVER);
        });

        polyline.addListener('mouseout', () => {
            if (!polyline.isClicked) setStrokeColor(COLORS.OUT);
        });

        polyline.addListener('click', () => {
            console.log(road);
            polyline.isClicked = !polyline.isClicked;
            setStrokeColor(polyline.isClicked ? COLORS.FORESTGREEN : COLORS.OVER);
            updateSummary(polyline.isClicked, road);
        });

        function setStrokeColor(color) {
            polyline.setOptions({'strokeColor': color})
        }

        function updateSummary(isClicked, {roadKm, roadTimeUp, roadTimeDown}) {
            const time = (roadTimeUp + roadTimeDown) / 2;
            const plusOrMinus = isClicked ? 1 : -1;

            summary.count += plusOrMinus;
            summary.distance = truncDecimal(summary.distance + plusOrMinus * truncDecimal(roadKm));
            summary.time += plusOrMinus * time;

            $('#hike-lines span').text(summary.count);
            $('#hike-distance span').text(summary.distance);
            $('#hike-time span').text(summary.time);
        }
    }
}

function truncDecimal(num) {
    return parseFloat(num.toFixed(2));
}


/*
    function roadData() {
        const token = $("meta[name='_csrf']").attr("content")
        const header = $("meta[name='_csrf_header']").attr("content");

        $.ajax({
            url: 'view',
            type: 'POST',
            data: {
                lines: lines,
                hikeTime: hikeTime,
                hikeDistance: hikeDistance
            },
            // ajax용 CSRF 토큰
            //beforeSend : function(xhr) {
            //    xhr.setRequestHeader(header, token);
            //},
            success: function (response) {
                console.log('roadData 전송 성공');
                $('#hike-lines span').text(lines);
                $('#hike-distance span').text(hikeDistance);
                $('#hike-time span').text(hikeTime);
            },
            error: function (error) {
                console.error('roadData 전송 실패', error);
            }
        });
    }
*/

$('.switch-mode').click(() => {
    alert('추후 업데이트 예정입니다.');
});

