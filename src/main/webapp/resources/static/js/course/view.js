/**
 * view.jsp가 참조하는 JavaScript 파일입니다.
 * 등산로 데이터와 Kakao 지도 API 기능을 혼합하여 view.jsp로 출력하는 용도로 사용됩니다.
 * 일부 설정은 common.js를 참조해야 합니다.
 * @author Kim Young-jin, Jeong Gwan-woo
 */
import {initMap} from './common.js';
import Graph from './Graph.js';
import MapStack from './MapStack.js';

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
    distance: 0,
    time: 0,
}

const kakaoMap = initMap(
    '#view-map',
    parseFloat(mtY),
    parseFloat(mtX),
    MIN_ZOOM_LEVEL,
    MAX_ZOOM_LEVEL);

console.log(data);

const graph = new Graph();
const selects = new MapStack();

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
                map: kakaoMap,
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
        const path = [];
        let startNode;
        let endNode;

        road.coordList.forEach((({coordId, roadX, roadY}, idx, arr) => {
            if (idx === 0) {
                startNode = graph.addNode(coordId, roadX, roadY)
            }
            if (idx === arr.length - 1) {
                endNode = graph.addNode(coordId, roadX, roadY);
                graph.addEdge(startNode, endNode, road.roadKm, road.roadId, level);
            }
            path.push(new kakao.maps.LatLng(roadY, roadX));
        }));

        const line = new kakao.maps.Polyline({
            map: kakaoMap,
            path,
            strokeWeight: STROKE_WEIGHTS.DEFAULT,
            strokeColor: getColor(level, "LIGHT"),
            strokeOpacity: 1,
            strokeStyle: 'solid',
        });

        road.line = line;
        road.isClicked = false;
        road.level = level;

        line.setMap(kakaoMap);

        line.addListener('mouseover', () => {
            if (road.isClicked) {
                hideSelectRoads(road, selects);
                setStrokeColor(line, getColor(level, "LIGHT"));
            } else {
                setStrokeColor(line, getColor(level, "MIDDLE"));
            }
        });

        line.addListener('mouseout', () => {
            if (road.isClicked) {
                showSelectRoads();
            } else {
                setStrokeColor(line, getColor(level, "LIGHT"));
            }
        });

        line.addListener('click', () => {
            if (road.isClicked) {
                deleteSelectRoads(road, selects);
                setStrokeColor(line, getColor(level, "MIDDLE"));
            } else {
                const fromNode = handeUnclick(road);
                if (!fromNode) return;
                addSelectRoad(road, fromNode);
                showSelectRoad(road.roadId);
            }

            road.isClicked = !road.isClicked;
            showSummary();
        });
    }
}

function handeUnclick(road) {
    const size = selects.size();
    let fromNode;
    if (size <= 0) {
        const leafNode = graph.findLeafNodeIncluded(road.roadId)
        if (!leafNode) {
            alert("시종점과 연결된 등산로부터 선택해주세요!");
            return;
        }

        fromNode = graph.getOppositeNode(road.roadId, leafNode);
    }

    if (size >= 1) {
        const oppositeNode = graph.getOppositeNode(road.roadId, selects.peek().fromNode);
        if (!oppositeNode) {
            alert("이전 등산로과 연결된 등산로를 선택해주세요!");
            return;
        }
        fromNode = oppositeNode;
    }

    return fromNode;
}

function addSelectRoad(road, fromNode) {
    road.fromNode = fromNode;
    const {coordList, ...rest} = road;
    selects.push(road.roadId, rest);
    increaseSummary(road);
}

function deleteSelectRoads(road, selects) {
    processAfterIndex(road, (key, road, selects) => {
        hideSelectRoad(key);
        decreaseSummary(selects.findValueByKey(key));
        selects.deleteByKey(key);
    }, selects);
}

function hideSelectRoads(road, selects) {
    processAfterIndex(road, (key) => {
        hideSelectRoad(key);
    }, selects);
}

function hideSelectRoad(key) {
    const road = selects.findValueByKey(key);
    setStrokeColor(road.line, getColor(road.level, "LIGHT"));
    setStrokeWeight(road.line, STROKE_WEIGHTS.DEFAULT);
}

function showSelectRoads() {
    selects.forEach((value, key) => showSelectRoad(key));
}

function showSelectRoad(key) {
    const road = selects.findValueByKey(key);
    if (road === undefined) return;
    setStrokeColor(road.line, getColor(road.level, "DARK"));
    setStrokeWeight(road.line, STROKE_WEIGHTS.THICK);
}

function processAfterIndex(road, callback, selects) {
    const keys = Array.from(selects.keys());
    const index = keys.indexOf(road.roadId);
    if (index === -1) return;
    keys.slice(index).forEach(key => {
        callback(key, road, selects);
    });
}

function increaseSummary({roadKm, roadTimeUp, roadTimeDown}) {
    updateSummary({roadKm, roadTimeUp, roadTimeDown}, 1);
}

function decreaseSummary({roadKm, roadTimeUp, roadTimeDown}) {
    updateSummary({roadKm, roadTimeUp, roadTimeDown}, -1);
}

function updateSummary({roadKm, roadTimeUp, roadTimeDown}, plusOrMinus) {
    const time = (roadTimeUp + roadTimeDown) / 2;
    summary.distance = truncDecimal(summary.distance + plusOrMinus * truncDecimal(roadKm));
    summary.time += plusOrMinus * time;
}

function showSummary() {
    $('#hike-lines span').text(selects.size());
    $('#hike-distance span').text(summary.distance);
    $('#hike-time span').text(summary.time);
}

function setStrokeColor(line, color) {
    line.setOptions({'strokeColor': color})
}

function setStrokeWeight(line, value) {
    line.setOptions({'strokeWeight': value})
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

$('.switch-mode').click(() => {
    alert('추후 업데이트 예정입니다.');
});

