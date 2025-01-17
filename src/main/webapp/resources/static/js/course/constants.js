export const LEVELS = {
    1: 'EASY',
    2: 'MEDIUM',
    3: 'HARD'
};

export const COLORS = {
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

export const OPACITIES = {
    LIGHT: "LIGHT",
    MIDDLE: "MIDDLE",
    DARK: "DARK",
}

export const STROKE_WEIGHTS = {
    DEFAULT: 4,
    THICK: 5
}

export const SPOT_TYPES = {
    '시종점': {imgSrc: '/hike/resources/static/images/spot-start.svg', imgSize: [16, 16]},
    '분기점': {imgSrc: '/hike/resources/static/images/point.svg', imgSize: [5, 5]}
};

export const SELECT_MARKERS = {
    'EASY': {imgSrc: '/hike/resources/static/images/point-green.svg', imgSize: [20, 20]},
    'MEDIUM': {imgSrc: '/hike/resources/static/images/point-yellow.svg', imgSize: [20, 20]},
    'HARD': {imgSrc: '/hike/resources/static/images/point-red.svg', imgSize: [20, 20]},
}

export const SUMMARY_KEYS = {
    COUNT: 'count',
    DISTANCE: 'distance',
    TIME: 'time'
}

export const SUMMARY_DEFAULT_VALUE = {
    EASY: 0,
    MEDIUM: 0,
    HARD: 0
}

export const AUTO_MODE_TYPE = {
    SHORTEST: 'SHORTEST',
    FASTEST: 'FASTEST',
    HARDEST: 'HARDEST',
    EASIEST: 'EASIEST'
}

export const MESSAGES = {
    RESET_COURSE: "선택 경로가 초기화됩니다. 진행하시겠습니까?",
    NO_CONNECTION: "이전 등산로과 연결된 등산로를 선택해주세요!",
    START_END_FIRST: "시종점과 연결된 등산로부터 선택해주세요!",
    SAVE_COURSE: '코스를 캡처한 후 저장합니다.\n코스가 잘 보이도록 해당 영역을 드래그하여 캡처해주세요!',
    SAVE_SUCCESS: '커스텀 코스가 성공적으로 저장되었습니다!',
    NEED_LOGIN: '로그인 후 이용해주세요!'
}