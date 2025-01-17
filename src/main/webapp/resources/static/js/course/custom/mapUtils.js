import {LEVELS, OPACITIES, SELECT_MARKERS, SPOT_TYPES, STROKE_WEIGHTS} from "../constants.js";
import {getColor, processAfterIndex} from "./utils.js";

export function drawMarker(markerConfig, position, map) {
    const markerImg = new kakao.maps.MarkerImage(markerConfig.imgSrc, new kakao.maps.Size((markerConfig.imgSize)[0], (markerConfig.imgSize)[1]));
    return new kakao.maps.Marker({
        map,
        position,
        image: markerImg
    });
}

export function drawCustomOverlay(position, selects) {
    const content = `<div class ="course-number">${selects.size()}</div>`;
    const xAnchor = 0.426;
    const yAnchor = 1.35;
    return new kakao.maps.CustomOverlay({position, content, xAnchor, yAnchor});
}

export function drawSpotMarkers(spotList, map) {
    spotList.forEach(spot => {
        const spotType = spot.spotType;
        const point = new kakao.maps.LatLng(spot.spotY, spot.spotX);
        const markerConfig = SPOT_TYPES[spotType];
        if (markerConfig) {
            drawMarker(markerConfig, point, map);
        }
    });
}

export function hideSelectRoads(road, selects) {
    processAfterIndex(road, (_, value) => {
        hideSelectRoad(value);
    }, selects);
}

export function hideSelectRoad(road) {
    road.marker.setMap(null);
    road.customOverlay.setMap(null);
    setStrokeColor(road.line, getColor(road.level, "LIGHT"));
    setStrokeWeight(road.line, STROKE_WEIGHTS.DEFAULT);
}

export function setStrokeColor(line, color) {
    line.setOptions({'strokeColor': color})
}

export function setStrokeWeight(line, value) {
    line.setOptions({'strokeWeight': value})
}

export function showSelectRoads(selects, map) {
    selects.forEach((value) => showSelectRoad(value, selects, map));
}

export function showSelectRoad(road, selects, map) {
    if (!road.marker) {
        const markerConfig = SELECT_MARKERS[LEVELS[road.level]];
        const position = new kakao.maps.LatLng(road.fromNode.y, road.fromNode.x);
        road.marker = drawMarker(markerConfig, position,map);
        road.customOverlay = drawCustomOverlay(position, selects);
    }
    road.marker.setMap(map);
    road.customOverlay.setMap(map);

    setStrokeColor(road.line, getColor(road.level, OPACITIES.DARK));
    setStrokeWeight(road.line, STROKE_WEIGHTS.THICK);
}


