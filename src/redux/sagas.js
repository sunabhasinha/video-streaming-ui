import { takeLatest, put, call, select } from 'redux-saga/effects';
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

function* handleStartShare() {
	try {
		const stream = yield call(getDisplayMedia);
		yield put(startShareSuccess(stream));
	} catch (error) {
		yield put(startShareFailure(error.message));
	}
}

/**FIX: Physically stop the stream in the Saga */
function* handleStopShare() {
	try {
		const stream = yield select((state) => state.stream);

		if (stream) {
			const tracks = stream.getTracks();
			tracks.forEach((track) => track.stop());
			console.log('Stream stopped by Saga.');
		}
	} catch (err) {
		console.error('Error stopping stream:', err);
	}

	yield put(stopShareSuccess());
}

export default function* rootSaga() {
	yield takeLatest(START_SHARE_REQUEST, handleStartShare);
	yield takeLatest(STOP_SHARE_REQUEST, handleStopShare);
}
