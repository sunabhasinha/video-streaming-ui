import {
	START_SHARE_SUCCESS,
	START_SHARE_FAILURE,
	STOP_SHARE_SUCCESS,
	SET_TOOL,
	SET_COLOR,
	SET_STROKE_WIDTH,
	ADD_STROKE,
	UNDO,
} from './actions';

const initialState = {
	isSharing: false,
	stream: null,
	error: null,
	tool: 'pen',
	color: 'red',
	strokeWidth: 5,
	history: [],
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case START_SHARE_SUCCESS:
			return {
				...state,
				isSharing: true,
				stream: action.payload,
				error: null,
			};
		case START_SHARE_FAILURE:
			return {
				...state,
				isSharing: false,
				error: action.payload,
			};
		case STOP_SHARE_SUCCESS:
			return {
				...state,
				isSharing: false,
				stream: null,
			};
		case SET_TOOL:
			return { ...state, tool: action.payload };
		case SET_COLOR:
			return { ...state, color: action.payload };
		case SET_STROKE_WIDTH:
			return { ...state, strokeWidth: action.payload };
		case ADD_STROKE:
			return {
				...state,
				history: [...state.history, action.payload],
			};

		case UNDO:
			return {
				...state,
				history: state.history.slice(0, -1),
			};
		default:
			return state;
	}
};

export default rootReducer;
