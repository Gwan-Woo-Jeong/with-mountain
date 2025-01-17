import {LEVELS, SUMMARY_DEFAULT_VALUE, SUMMARY_KEYS} from "../constants.js";
import {minuteToHourMinute, roundMinuteIfHour, truncDecimal, updateDisplay, updateText} from "./utils.js";

export function toggleDisableSaveButton(disabled) {
    const saveButton = $('.save');
    if (saveButton.prop('disabled') !== disabled) {
        saveButton.prop('disabled', disabled);
    }
}

export function increaseSummary({roadKm, time, level}, appState) {
    updateSummary(roadKm, time, level, appState, 1);
}

export function decreaseSummary({roadKm, time, level}, appState) {
    updateSummary(roadKm, time, level, appState, -1);
}

export function resetSummary(appState) {
    appState.summary.count = {...SUMMARY_DEFAULT_VALUE};
    appState.summary.time = {...SUMMARY_DEFAULT_VALUE};
    appState.summary.distance = {...SUMMARY_DEFAULT_VALUE};
}

function updateSummary(roadKm, time, level, appState, plusOrMinus) {
    appState.summary.count[LEVELS[level]] += plusOrMinus;
    appState.summary.distance[LEVELS[level]] = truncDecimal(appState.summary.distance[LEVELS[level]] + plusOrMinus * roadKm);
    appState.summary.time[LEVELS[level]] += plusOrMinus * time;
}

export function showSummaries(appState) {
    showSummary(SUMMARY_KEYS.COUNT, appState.summary.count);
    showSummary(SUMMARY_KEYS.DISTANCE, appState.summary.distance);
    for (const key in appState.summary.time) {
        showTimeSummary(key, appState.summary.time[key]);
    }
    showTotalTimeSummary(appState);
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

function showTotalTimeSummary(appState) {
    const {EASY, MEDIUM, HARD} = appState.summary.time;
    const totalMinutes = EASY + MEDIUM + HARD;
    const {hour, minute} = minuteToHourMinute(totalMinutes);
    const selector = `#time .total`;

    updateDisplay(`${selector} .hour`, hour);
    updateText(`${selector} .hour`, hour);
    updateText(`${selector} .minute`, roundMinuteIfHour(hour, minute));
}
