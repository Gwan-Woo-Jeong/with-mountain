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
import {AUTO_MODE_TYPE, MESSAGES, OPACITIES, STROKE_WEIGHTS, SUMMARY_DEFAULT_VALUE} from "./constants.js";
import {decreaseSummary, increaseSummary, resetSummary, showSummaries, toggleDisableSaveButton} from "./custom/menu.js";
import {confirmResetCourse, getColor, getLevel, loadJSON, processAfterIndex, truncDecimal} from "./custom/utils.js";
import {
    drawSpotMarkers,
    hideSelectRoad,
    hideSelectRoads,
    setStrokeColor,
    showSelectRoad,
    showSelectRoads
} from "./custom/mapUtils.js";
import {showLoginModal} from "../common.js";

const data = await loadJSON(); // For Test
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const mtY = urlParams.get('mtY');
const mtX = urlParams.get('mtX');
const roadList = data["roadList"];

const appState = {
    summary: {
        count: {...SUMMARY_DEFAULT_VALUE},
        distance: {...SUMMARY_DEFAULT_VALUE},
        time: {...SUMMARY_DEFAULT_VALUE},
    },
    autoMode: {
        isActive: false,
        isFinished: false,
        type: AUTO_MODE_TYPE.SHORTEST
    },
    isCapturing: false
}

const kakaoMap = initMap(
    '#view-map',
    parseFloat(mtY),
    parseFloat(mtX),
    7,
    1);

const graph = new Graph();
const selects = new MapStack();
const roads = new Map();

$(document).ready(function () {
    // 코스 그리기
    drawRoads();
    drawSpotMarkers(spotList, kakaoMap);

    // 코스 캡처
    const saveButton = $('.save');
    const captureButton = $('.capturing');
    const captureArea = $('#capture-area');
    let isSelecting = false;
    let startX, startY, imageData;

    $(document).on('mousedown', function (e) {
        if (!appState.isCapturing) return;
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
        if (!appState.isCapturing) return;
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
        if (!appState.isCapturing) return;
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
        imageData = await captureHTML(document.body, option);
        appState.isCapturing = false;
        saveButton.show();
        captureButton.hide();
        kakaoMap.setDraggable(true);

        $('.dialog-background').addClass('show');
        $('.dialog-background .image').prop('src', imageData);
    });

    saveButton.on('click', function () {
        if (!userInfo.userId) {
            alert(MESSAGES.NEED_LOGIN);
            showLoginModal();
            return;
        }
        if (!confirm(MESSAGES.SAVE_COURSE)) {
            return;
        }
        appState.isCapturing = true;
        saveButton.hide();
        captureButton.show();
    });

    $('.dialog-background .course-name-input').on('input', function () {
        const courseName = $(this).val();
        $('.dialog-background .confirm').prop('disabled', courseName.length === 0);
    })

    $('.dialog-background .cancel').on('click', function (e) {
        e.preventDefault();
        $('.dialog-background').removeClass('show');
    });

    $('.dialog-background .confirm').on('click', function (e) {
        e.preventDefault();
        const courseItems = []

        selects.forEach((select, _, index) => {
            courseItems.push({
                courseItemId: null,
                roadId: select.roadId,
                courseId: null,
                courseOrder: index + 1,
            })
        })

        $.ajax({
            type: 'POST',
            url: path + '/course/add',
            contentType: 'application/json',
            data: JSON.stringify({
                course: {
                    userId: userInfo.userId,
                    courseId: null,
                    mtId: data.mtId,
                    title: $('.dialog-background .course-name-input').val(),
                    type: 'CUSTOM',
                    image: imageData,
                    time: appState.summary.time.EASY + appState.summary.time.MEDIUM + appState.summary.time.HARD,
                    distance: truncDecimal(appState.summary.distance.EASY + appState.summary.distance.MEDIUM + appState.summary.distance.HARD)
                },
                courseItems
            }),
            success: function () {
                alert(MESSAGES.SAVE_SUCCESS)
                $('.dialog-background').removeClass('show');
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error(`POST 실패\n
                Status: ${xhr.status}\n
                Error: ${xhr.statusText}\n
                Response: ${xhr.responseText}\n
                Text Status: ${textStatus}\n
                Error: ${errorThrown}`);
            },
        });
    });

    // 메뉴 조작
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
        appState.autoMode.type = AUTO_MODE_TYPE[key];

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
    appState.autoMode.isActive = isAutoSelected;
}

// 코스 생성
function drawRoads() {
    roadList.forEach((road) => {
        road.time = (road.roadTimeUp + road.roadTimeDown) / 2;
        road.level = getLevel(road);
        road.isClicked = false;
        road.line = new kakao.maps.Polyline({
            map: kakaoMap,
            path: graph.generatePair(road),
            strokeWeight: STROKE_WEIGHTS.DEFAULT,
            strokeColor: getColor(road.level, OPACITIES.LIGHT),
            strokeOpacity: 1,
            strokeStyle: 'solid',
        });
        road.line.setMap(kakaoMap);

        road.line.addListener('mouseover', () => {
            if (appState.autoMode.isActive && selects.size() > 1 || appState.isCapturing) {
                return;
            }

            if (road.isClicked) {
                hideSelectRoads(road, selects);
                setStrokeColor(road.line, getColor(road.level, OPACITIES.LIGHT));
            } else {
                setStrokeColor(road.line, getColor(road.level, OPACITIES.MIDDLE));
            }
        });

        road.line.addListener('mouseout', () => {
            if (appState.isCapturing) return;
            if (road.isClicked) {
                setStrokeColor(road.line, getColor(road.level, OPACITIES.LIGHT));
                showSelectRoads(selects, kakaoMap);
            } else {
                if (appState.autoMode.isFinished) {
                    return;
                }
                setStrokeColor(road.line, getColor(road.level, OPACITIES.LIGHT));
            }
        });

        road.line.addListener('click', () => {
            if (appState.isCapturing) return;
            if (appState.autoMode.isActive) {
                handleAutoRoadClick(road);
            } else {
                handleManualRoadClick(road);
            }
        });

        roads.set(road.roadId, road);
    })
}

function handleAutoRoadClick(road) {
    if (appState.autoMode.isFinished) {
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
        alert(MESSAGES.START_END_FIRST);
        return;
    }

    road.isClicked = true;
    const fromNodeId = graph.getOppositeNode(road.roadId, leafNodeId);
    selectRoad(road, fromNodeId, leafNodeId);

    if (selects.size() === 2) {
        findAutoTypeCourse();
        showSummaries(appState);
    }
}

function handleManualRoadClick(road) {
    if (road.isClicked) {
        unselectRoad(road);
        toggleDisableSaveButton(true);
    } else {
        const leafNodeId = graph.findLeafNodeIncluded(road.roadId);
        const fromNodeId = handleClick(road.roadId);

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
    showSummaries(appState);
}

function resetCourse() {
    if (!selects.isEmpty()) {
        deleteSelectRoads(selects.first());
    }
    resetSummary(appState);
    showSummaries(appState);
    if (appState.autoMode.isActive) {
        appState.autoMode.isFinished = false;
    }

    toggleDisableSaveButton(true);
}

function findAutoTypeCourse() {
    const roadIds = graph.findAutoPath(appState, selects);
    resetCourse();
    roadIds.forEach(roadId => {
        const fromNodeId = handleClick(roadId);
        const road = roads.get(roadId);
        road.isClicked = true;
        selectRoad(road, fromNodeId);
    });

    showSummaries(appState);
    appState.autoMode.isFinished = true;
    toggleDisableSaveButton(false);
}

function handleClick(roadId) {
    let fromNodeId;
    if (selects.isEmpty()) {
        const leafNode = graph.findLeafNodeIncluded(roadId);
        if (!leafNode) {
            alert(MESSAGES.START_END_FIRST);
            return;
        }
        fromNodeId = graph.getOppositeNode(roadId, leafNode);
    } else {
        const oppositeNodeId = graph.getOppositeNode(roadId, selects.peek().fromNode.id);
        if (!oppositeNodeId) {
            alert(MESSAGES.NO_CONNECTION);
            return;
        }
        fromNodeId = oppositeNodeId;
    }
    return fromNodeId;
}

function selectRoad(road, fromNodeId, leafNodeId = null) {
    addSelectRoad(road, fromNodeId, leafNodeId);
    showSelectRoad(road, selects, kakaoMap);
}

function unselectRoad(road) {
    deleteSelectRoads(road);
    setStrokeColor(road.line, getColor(road.level, OPACITIES.MIDDLE));
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
    increaseSummary(road, appState);
}

function deleteSelectRoads(road) {
    processAfterIndex(road, (key, value) => {
        decreaseSummary(value, appState);
        hideSelectRoad(value);

        value.isClicked = false;
        if (value.marker) {
            delete value.marker;
            delete value.customOverlay;
        }

        selects.deleteByKey(key);
    }, selects);
}
