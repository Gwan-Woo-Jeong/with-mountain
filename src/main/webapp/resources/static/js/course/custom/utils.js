import {COLORS, LEVELS, MESSAGES} from "../constants.js";

export function processAfterIndex(road, callback, selects) {
    const keys = Array.from(selects.keys());
    const index = keys.indexOf(road.roadId);
    if (index === -1) return;
    keys.slice(index).forEach(key => {
        const value = selects.findValueByKey(key);
        callback(key, value);
    });
}

export function minuteToHourMinute(min) {
    const hour = Math.floor(min / 60);
    const minute = min % 60;
    return {hour, minute};
}

export function roundMinuteIfHour(hour, minute) {
    return hour && minute ? Math.round(minute) : minute;
}

export function truncDecimal(num) {
    return parseFloat(num.toFixed(2));
}

export function updateDisplay(selector, isVisible) {
    if (isVisible) {
        $(selector).show();
    } else {
        $(selector).hide();
    }
}

export function updateText(selector, value) {
    $(`${selector} .value`).text(value);
}

export function confirmResetCourse() {
    return confirm(MESSAGES.RESET_COURSE);
}

export function getLevel({roadTimeUp, roadTimeDown, roadKm}) {
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

export function getColor(level, opacity) {
    return COLORS[LEVELS[level]][opacity];
}

export async function loadJSON() {
    try {
        const jsonPath = new URL('resources/static/data/mountain.json', 'http://localhost:8090/hike/');
        const response = await fetch(jsonPath);
        return await response.json();
    } catch (error) {
        console.error('JSON: 불러오는 도중 실패', error);
    }
}
