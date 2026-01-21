import { takeLatest, put, call } from 'redux-saga/effects';
import {
	START_SHARE_REQUEST,
	STOP_SHARE_REQUEST,
	startShareSuccess,
	startShareFailure,
	stopShareSuccess,
} from './actions';

function getDisplayMedia() {
	return navigator.mediaDevices.getDisplayMedia({
		video: { cursor: 'always' },
		audio: false,
	});
}

// WORKER SAGA: Handles the Start Action
function* handleStartShare() {
	try {
		const stream = yield call(getDisplayMedia);

		yield put(startShareSuccess(stream));
	} catch (error) {
		yield put(startShareFailure(error.message));
	}
}

// WORKER SAGA: Handles the Stop Action
function* handleStopShare() {
	yield put(stopShareSuccess());
}

// WATCHER SAGA: Watches for dispatched actions
export default function* rootSaga() {
	yield takeLatest(START_SHARE_REQUEST, handleStartShare);
	yield takeLatest(STOP_SHARE_REQUEST, handleStopShare);
}
