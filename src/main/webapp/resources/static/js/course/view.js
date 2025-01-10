/**
 * view.jsp가 참조하는 JavaScript 파일입니다.
 * 등산로 데이터와 Kakao 지도 API 기능을 혼합하여 view.jsp로 출력하는 용도로 사용됩니다.
 * 일부 설정은 common.js를 참조해야 합니다.
 * @author Kim Young-jin, Jeong Gwan-woo
 */
import {initMap} from './common.js';

const MIN_ZOOM_LEVEL = 7;
const MAX_ZOOM_LEVEL = 1;

const LEVELS = {
    1: 'EASY',
    2: 'MEDIUM',
    3: 'HARD'
};

const COLORS = {
    EASY: {
        LIGHT: '#34C75950',
        MIDDLE: '#34C759B3',
        DARK: '#34C759'
    },
    MEDIUM: {
        LIGHT: '#FFC10750',
        MIDDLE: '#FFC107B3',
        DARK: '#FFC107'
    },
    HARD: {
        LIGHT: '#FF373750',
        MIDDLE: '#FF3737B3',
        DARK: '#FF3737'
    }
};

const STROKE_WEIGHTS = {
    DEFAULT: 4,
    THICK: 5
}

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
        const level = getLevel(road);
        const path = road.coordList.map(coord => new kakao.maps.LatLng(coord.roadY, coord.roadX));
        const line = new kakao.maps.Polyline({
            map,
            path,
            strokeWeight: STROKE_WEIGHTS.DEFAULT,
            strokeColor: getColor(level, "LIGHT"),
            strokeOpacity: 1,
            strokeStyle: 'solid',
        });

        line.isClicked = false;
        line.setMap(map);

        line.addListener('mouseover', () => {
            if (!line.isClicked) setStrokeColor(getColor(level, "MIDDLE"));
        });

        line.addListener('mouseout', () => {
            if (!line.isClicked) setStrokeColor(getColor(level, "LIGHT"));
        });

        line.addListener('click', () => {
            console.log(road);
            line.isClicked = !line.isClicked;
            setStrokeColor(line.isClicked ? getColor(level, "DARK") : getColor(level, 70));
            setStrokeWeight(line.isClicked ? STROKE_WEIGHTS.THICK : STROKE_WEIGHTS.DEFAULT);
            updateSummary(line.isClicked, road);
        });

        function setStrokeColor(color) {
            line.setOptions({'strokeColor': color})
        }

        function setStrokeWeight(value) {
            line.setOptions({'strokeWeight': value})
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

function getLevel({roadTimeUp, roadTimeDown, roadKm}) {
    const ratio = roadTimeUp / (roadTimeDown || 1);
    const measure = Math.pow(ratio, 3) * (roadKm / 2.5);

    if (measure < 1) {
        return 1;
    } else if (measure < 2) {
        return 2;
    } else {
        return 3;
    }
}

function getColor(level, opacity) {
    return COLORS[LEVELS[level]][opacity];
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

