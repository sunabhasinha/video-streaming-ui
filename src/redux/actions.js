// Action Types
export const START_SHARE_REQUEST = 'START_SHARE_REQUEST';
export const START_SHARE_SUCCESS = 'START_SHARE_SUCCESS';
export const START_SHARE_FAILURE = 'START_SHARE_FAILURE';

export const STOP_SHARE_REQUEST = 'STOP_SHARE_REQUEST';
export const STOP_SHARE_SUCCESS = 'STOP_SHARE_SUCCESS';

export const SET_TOOL = 'SET_TOOL';
export const SET_COLOR = 'SET_COLOR';
export const SET_STROKE_WIDTH = 'SET_STROKE_WIDTH';

export const ADD_STROKE = 'ADD_STROKE';
export const UNDO = 'UNDO';
export const CLEAR_CANVAS = 'CLEAR_CANVAS';
export const TOGGLE_ANNOTATION = 'TOGGLE_ANNOTATION';
export const TAKE_SNAPSHOT = 'TAKE_SNAPSHOT';

// Actions Creators
export const startShareRequest = () => ({ type: START_SHARE_REQUEST });

export const startShareSuccess = (stream) => ({
	type: START_SHARE_SUCCESS,
	payload: stream,
});

export const startShareFailure = (error) => ({
	type: START_SHARE_FAILURE,
	payload: error,
});

export const stopShareRequest = () => ({ type: STOP_SHARE_REQUEST });
export const stopShareSuccess = () => ({ type: STOP_SHARE_SUCCESS });

export const setTool = (tool) => ({ type: SET_TOOL, payload: tool });
export const setColor = (color) => ({ type: SET_COLOR, payload: color });
export const setStrokeWidth = (width) => ({
	type: SET_STROKE_WIDTH,
	payload: width,
});

export const addStroke = (stroke) => ({ type: ADD_STROKE, payload: stroke });
export const undo = () => ({ type: UNDO });
export const clearCanvas = () => ({ type: CLEAR_CANVAS });
export const toggleAnnotation = () => ({ type: TOGGLE_ANNOTATION });
export const takeSnapshot = () => ({ type: TAKE_SNAPSHOT });
