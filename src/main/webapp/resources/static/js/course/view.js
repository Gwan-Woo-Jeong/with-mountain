/**
 * view.jsp가 참조하는 JavaScript 파일입니다.
 * 등산로 데이터와 Kakao 지도 API 기능을 혼합하여 view.jsp로 출력하는 용도로 사용됩니다.
 * 일부 설정은 common.js를 참조해야 합니다.
 * @author Kim Young-jin, Jeong Gwan-woo
 */
import {initMap} from './common.js';
import Graph from './Graph.js';
import MapStack from './MapStack.js';
import {captureHTML} from "./capture.js";

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
    '시종점': {imgSrc: '/hike/resources/static/images/spot-start.svg', imgSize: [16, 16]},
    '분기점': {imgSrc: '/hike/resources/static/images/point.svg', imgSize: [5, 5]}
};

const SELECT_MARKERS = {
    'EASY': {imgSrc: '/hike/resources/static/images/point-green.svg', imgSize: [20, 20]},
    'MEDIUM': {imgSrc: '/hike/resources/static/images/point-yellow.svg', imgSize: [20, 20]},
    'HARD': {imgSrc: '/hike/resources/static/images/point-red.svg', imgSize: [20, 20]},
}

const data = await loadJSON(); // For Test
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const mtY = urlParams.get('mtY');
const mtX = urlParams.get('mtX');
const roadList = data["roadList"];

const SUMMARY_KEYS = {
    COUNT: 'count',
    DISTANCE: 'distance',
    TIME: 'time'
}

const SUMMARY_DEFAULT_VALUE = {
    EASY: 0,
    MEDIUM: 0,
    HARD: 0
}

const AUTO_MODE_TYPE = {
    SHORTEST: 'SHORTEST',
    FASTEST: 'FASTEST',
    HARDEST: 'HARDEST',
    EASIEST: 'EASIEST'
}

const summary = {
    count: {...SUMMARY_DEFAULT_VALUE},
    distance: {...SUMMARY_DEFAULT_VALUE},
    time: {...SUMMARY_DEFAULT_VALUE},
};

const autoMode = {
    isActive: false,
    isFinished: false,
    type: AUTO_MODE_TYPE.SHORTEST
}

let isCapturing = false;

const kakaoMap = initMap(
    '#view-map',
    parseFloat(mtY),
    parseFloat(mtX),
    MIN_ZOOM_LEVEL,
    MAX_ZOOM_LEVEL);

console.log(data);

const graph = new Graph();
const selects = new MapStack();
const roads = new Map();

drawRoads();
drawSpotMarkers();

// 메뉴 조작
$(document).ready(function () {
    $('#same').on('change', function () {
        if ($(this).is(':checked')) {
            handleModeChange(false);
        }
    });

    $('#diff').on('change', function () {
        if ($(this).is(':checked')) {
            handleModeChange(true);
        }
    });

    $('input[name="type"]').on('change', function () {
        const key = $(this).val().toUpperCase();
        autoMode.type = AUTO_MODE_TYPE[key];

        if (selects.size() >= 2) {
            findAutoTypeCourse();
        }
    });
});

function handleModeChange(isAutoSelected) {
    if (!selects.isEmpty() && !confirmResetCourse()) {
        const oppositeRadio = isAutoSelected ? $('#same') : $('#diff');
        oppositeRadio.prop('checked', true);
        return;
    }
    resetCourse();
    $('.mode-menu').toggleClass('disabled', !isAutoSelected);
    autoMode.isActive = isAutoSelected;
}

// 코스 캡처
$(document).ready(function () {
    const saveButton = $('.save');
    const captureButton = $('.capturing');
    const captureArea = $('#capture-area');
    let isSelecting = false;
    let startX, startY, imageUrl;

    $(document).on('mousedown', function (e) {
        if (!isCapturing) return;
        if (e.button !== 0) return;

        kakaoMap.setDraggable(false);

        isSelecting = true;
        startX = e.pageX - 20;
        startY = e.pageY - 80;

        captureArea.css({
            left: startX + 'px',
            top: startY + 'px',
            width: '0px',
            height: '0px',
            display: 'block',
        });
    });

    $(document).on('mousemove', function (e) {
        if (!isCapturing) return;
        if (!isSelecting) return;

        let currentX = e.pageX - 20;
        let currentY = e.pageY - 80;

        let width = Math.abs(currentX - startX);
        let height = Math.abs(currentY - startY);

        captureArea.css({
            width: width + 'px',
            height: height + 'px',
            left: (currentX > startX ? startX : currentX) + 'px',
            top: (currentY > startY ? startY : currentY) + 'px',
        });
    });


    $(document).on('mouseup', async function () {
        if (!isCapturing) return;
        if (!isSelecting) return;
        isSelecting = false;

        const rect = captureArea[0].getBoundingClientRect();

        const option = {
            x: rect.left + window.scrollX,
            y: rect.top + window.scrollY,
            width: rect.width,
            height: rect.height,
            scale: 2,
            allowTaint: false,
            logging: false,
            proxy: path + '/html2canvas/proxy'
        };

        captureArea.css('display', 'none');
        imageUrl = await captureHTML(document.body, option);
        isCapturing = false;
        saveButton.show();
        captureButton.hide();
        kakaoMap.setDraggable(true);

        $('.dialog-background').addClass('show');
        $('.dialog-background .image').prop('src', imageUrl);
    });

    saveButton.on('click', function (e) {
        if (!confirm('코스를 캡처한 후 저장합니다.\n코스가 잘 보이도록 해당 영역을 드래그하여 캡처해주세요!')) {
            return;
        }
        isCapturing = true;
        saveButton.hide();
        captureButton.show();
    });

    $('.dialog-background .cancel').on('click', function (e) {
        e.preventDefault();
        $('.dialog-background').removeClass('show');
        console.log('취소');
    });

    $('.dialog-background .confirm').on('click', function (e) {
        e.preventDefault();
        console.log('저장하기');
    });
});

// 코스 생성
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

function drawMarker(markerConfig, position) {
    const markerImg = new kakao.maps.MarkerImage(markerConfig.imgSrc, new kakao.maps.Size((markerConfig.imgSize)[0], (markerConfig.imgSize)[1]));
    return new kakao.maps.Marker({
        map: kakaoMap,
        position,
        image: markerImg
    });
}

function drawCustomOverlay(position) {
    const content = `<div class ="course-number">${selects.size()}</div>`;
    const xAnchor = 0.426;
    const yAnchor = 1.35;
    return new kakao.maps.CustomOverlay({position, content, xAnchor, yAnchor});
}

function drawSpotMarkers() {
    spotList.forEach(spot => {
        const spotType = spot.spotType;
        const point = new kakao.maps.LatLng(spot.spotY, spot.spotX);
        const markerConfig = SPOT_TYPES[spotType];
        if (markerConfig) {
            drawMarker(markerConfig, point);
        }
    });
}

function drawRoads() {
    for (let i = 0; i < roadList.length; i++) {
        const road = roadList[i];
        const level = getLevel(road);
        const time = (road.roadTimeUp + road.roadTimeDown) / 2;
        const path = [];
        let startNode;
        let endNode;

        road.coordList.forEach((({coordId, roadX, roadY}, idx, arr) => {
            if (idx === 0) {
                startNode = graph.addNode(coordId, roadX, roadY)
            }
            if (idx === arr.length - 1) {
                endNode = graph.addNode(coordId, roadX, roadY);
                graph.addEdge(startNode, endNode, road.roadKm, road.roadId, level, time);
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
        road.level = level;
        road.time = time;
        road.isClicked = false;
        roads.set(road.roadId, road);

        line.setMap(kakaoMap);

        line.addListener('mouseover', () => {
            if (autoMode.isActive && selects.size() > 1 || isCapturing) {
                return;
            }

            if (road.isClicked) {
                hideSelectRoads(road, selects);
                setStrokeColor(line, getColor(level, "LIGHT"));
            } else {
                setStrokeColor(line, getColor(level, "MIDDLE"));
            }
        });

        line.addListener('mouseout', () => {
            if (isCapturing) return;
            if (road.isClicked) {
                setStrokeColor(line, getColor(level, "LIGHT"));
                showSelectRoads();
            } else {
                if (autoMode.isFinished) {
                    return;
                }
                setStrokeColor(line, getColor(level, "LIGHT"));
            }
        });

        line.addListener('click', () => {
            if (isCapturing) return;
            if (autoMode.isActive) {
                handleAutoRoadClick(road);
            } else {
                handleManualRoadClick(road);
            }
        });
    }
    console.log(graph);
}

function handleAutoRoadClick(road) {
    if (autoMode.isFinished) {
        if (confirmResetCourse()) {
            resetCourse();
        }
        return;
    }

    const leafNodeId = graph.findLeafNodeIncluded(road.roadId);
    if (road.isClicked && selects.size() === 1) {
        unselectRoad(road);
        road.isClicked = false;
        return;
    }

    if (!leafNodeId) {
        alert("시종점과 연결된 등산로 2개를 선택해주세요!");
        return;
    }

    road.isClicked = true;
    const fromNodeId = graph.getOppositeNode(road.roadId, leafNodeId);
    selectRoad(road, fromNodeId, leafNodeId);

    if (selects.size() === 2) {
        findAutoTypeCourse();
        showSummaries();
    }
}

function handleManualRoadClick(road) {
    if (road.isClicked) {
        unselectRoad(road);
        toggleDisableSaveButton(true);
    } else {
        const leafNodeId = graph.findLeafNodeIncluded(road.roadId);
        const fromNodeId = handleClick(road.roadId);

        console.log(leafNodeId);
        if (fromNodeId) {
            selectRoad(road, fromNodeId, leafNodeId);
        }

        if (selects.size() > 1) {
            const last = selects.peek();
            const first = selects.first();
            if (last.leafNodeId && first.leafNodeId) {
                toggleDisableSaveButton(false);
            }
        }
    }

    road.isClicked = !road.isClicked;
    showSummaries();
}

function toggleDisableSaveButton(disabled) {
    const saveButton = $('.save');
    if (saveButton.prop('disabled') !== disabled) {
        saveButton.prop('disabled', disabled);
    }
}

function confirmResetCourse() {
    return confirm("선택 경로가 초기화됩니다. 진행하시겠습니까?");
}

function resetCourse() {
    if (!selects.isEmpty()) {
        deleteSelectRoads(selects.first());
    }
    resetSummary();
    showSummaries();
    if (autoMode.isActive) {
        autoMode.isFinished = false;
    }

    toggleDisableSaveButton(true);
}

function unselectRoad(road) {
    deleteSelectRoads(road);
    setStrokeColor(road.line, getColor(road.level, "MIDDLE"));
}

function findAutoTypeCourse() {
    const current = selects.peek();
    const previous = selects.first();
    let roadIds;

    if (autoMode.type === AUTO_MODE_TYPE.SHORTEST) {
        roadIds = graph.findShortestPath(previous.leafNodeId, current.leafNodeId);
    } else if (autoMode.type === AUTO_MODE_TYPE.FASTEST) {
        roadIds = graph.findFastestPath(previous.leafNodeId, current.leafNodeId);
    } else if (autoMode.type === AUTO_MODE_TYPE.HARDEST) {
        roadIds = graph.findHardestPath(previous.leafNodeId, current.leafNodeId);
    } else if (autoMode.type === AUTO_MODE_TYPE.EASIEST) {
        roadIds = graph.findEasiestPath(previous.leafNodeId, current.leafNodeId);
    }

    resetCourse();
    roadIds.forEach(roadId => {
        const fromNodeId = handleClick(roadId);
        const road = roads.get(roadId);
        road.isClicked = true;
        selectRoad(road, fromNodeId);
    });

    showSummaries();
    autoMode.isFinished = true;
    toggleDisableSaveButton(false);
}

function selectRoad(road, fromNodeId, leafNodeId = null) {
    addSelectRoad(road, fromNodeId, leafNodeId);
    showSelectRoad(road);
}

function handleClick(roadId) {
    let fromNodeId;
    if (selects.isEmpty()) {
        const leafNode = graph.findLeafNodeIncluded(roadId);
        if (!leafNode) {
            alert("시종점과 연결된 등산로부터 선택해주세요!");
            return;
        }
        fromNodeId = graph.getOppositeNode(roadId, leafNode);
    } else {
        const oppositeNodeId = graph.getOppositeNode(roadId, selects.peek().fromNode.id);
        if (!oppositeNodeId) {
            alert("이전 등산로과 연결된 등산로를 선택해주세요!");
            return;
        }
        fromNodeId = oppositeNodeId;
    }
    return fromNodeId;
}

function addSelectRoad(road, fromNodeId, leafNodeId) {
    if (fromNodeId) {
        const [x, y] = graph.findCoordsById(fromNodeId);
        road.fromNode = {id: fromNodeId, x, y};
    }

    if (leafNodeId) {
        road.leafNodeId = leafNodeId;
    }

    delete road.coordList;
    selects.push(road.roadId, road);
    increaseSummary(road);
}

function deleteSelectRoads(road) {
    processAfterIndex(road, (key, value) => {
        decreaseSummary(value);
        hideSelectRoad(value);

        value.isClicked = false;
        if (value.marker) {
            delete value.marker;
            delete value.customOverlay;
        }

        selects.deleteByKey(key);
    });
}

function hideSelectRoads(road) {
    processAfterIndex(road, (_, value) => {
        hideSelectRoad(value);
    });
}

function hideSelectRoad(road) {
    road.marker.setMap(null);
    road.customOverlay.setMap(null);
    setStrokeColor(road.line, getColor(road.level, "LIGHT"));
    setStrokeWeight(road.line, STROKE_WEIGHTS.DEFAULT);
}

function showSelectRoads() {
    selects.forEach((value) => showSelectRoad(value));
}

function showSelectRoad(road) {
    if (!road.marker) {
        const markerConfig = SELECT_MARKERS[LEVELS[road.level]];
        const position = new kakao.maps.LatLng(road.fromNode.y, road.fromNode.x);
        road.marker = drawMarker(markerConfig, position);
        road.customOverlay = drawCustomOverlay(position);
    }
    road.marker.setMap(kakaoMap);
    road.customOverlay.setMap(kakaoMap);

    setStrokeColor(road.line, getColor(road.level, "DARK"));
    setStrokeWeight(road.line, STROKE_WEIGHTS.THICK);
}

function processAfterIndex(road, callback) {
    const keys = Array.from(selects.keys());
    const index = keys.indexOf(road.roadId);
    if (index === -1) return;
    keys.slice(index).forEach(key => {
        const value = selects.findValueByKey(key);
        callback(key, value);
    });
}

function increaseSummary({roadKm, time, level}) {
    updateSummary({roadKm, time, level}, 1);
}

function decreaseSummary({roadKm, time, level}) {
    updateSummary({roadKm, time, level}, -1);
}

function resetSummary() {
    summary.count = {...SUMMARY_DEFAULT_VALUE};
    summary.time = {...SUMMARY_DEFAULT_VALUE};
    summary.distance = {...SUMMARY_DEFAULT_VALUE};
}

function updateSummary({roadKm, time, level}, plusOrMinus) {
    summary.count[LEVELS[level]] += plusOrMinus;
    summary.distance[LEVELS[level]] = truncDecimal(summary.distance[LEVELS[level]] + plusOrMinus * roadKm);
    summary.time[LEVELS[level]] += plusOrMinus * time;
}

function showSummaries() {
    showSummary(SUMMARY_KEYS.COUNT, summary.count);
    showSummary(SUMMARY_KEYS.DISTANCE, summary.distance);
    for (const key in summary.time) {
        showTimeSummary(key, summary.time[key]);
    }
    showTotalTimeSummary();
}

function showSummary(type, data) {
    let total = 0;

    for (const key in data) {
        const value = data[key];
        const selector = `#${type} .${key.toLowerCase()}`;

        updateDisplay(selector, value > 0);
        updateText(selector, value);

        total += value;
    }

    const totalValue = type === SUMMARY_KEYS.DISTANCE ? truncDecimal(total) : total;
    updateText(`#${type} .total`, totalValue);
}

function showTimeSummary(key, value) {
    const {hour, minute} = minuteToHourMinute(value);
    const selector = `#time .${key.toLowerCase()}`;

    updateDisplay(selector, value > 0);
    updateDisplay(`${selector} .hour`, hour);
    updateText(`${selector} .hour`, hour);
    updateText(`${selector} .minute`, roundMinuteIfHour(hour, minute));
}

function showTotalTimeSummary() {
    const {EASY, MEDIUM, HARD} = summary.time;
    const totalMinutes = EASY + MEDIUM + HARD;
    const {hour, minute} = minuteToHourMinute(totalMinutes);
    const selector = `#time .total`;

    updateDisplay(`${selector} .hour`, hour);
    updateText(`${selector} .hour`, hour);
    updateText(`${selector} .minute`, roundMinuteIfHour(hour, minute));
}

function minuteToHourMinute(min) {
    const hour = Math.floor(min / 60);
    const minute = min % 60;
    return {hour, minute};
}

function roundMinuteIfHour(hour, minute) {
    return hour && minute ? Math.round(minute) : minute;
}

function updateDisplay(selector, isVisible) {
    if (isVisible) {
        $(selector).show();
    } else {
        $(selector).hide();
    }
}

function updateText(selector, value) {
    $(`${selector} .value`).text(value);
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
