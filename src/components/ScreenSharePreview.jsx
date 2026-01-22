import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { stopShareRequest } from '../redux/actions'; // Import the action

const ScreenSharePreview = ({ id }) => {
	const videoRef = useRef(null);
	const dispatch = useDispatch();
	const { stream } = useSelector((state) => state);

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.srcObject = stream;
		}

		if (stream) {
			const videoTrack = stream.getVideoTracks()[0];

			const handleNativeStop = () => {
				console.log('Browser stop button clicked. Syncing Redux...');
				dispatch(stopShareRequest());
			};

			videoTrack.addEventListener('ended', handleNativeStop);

			return () => {
				videoTrack.removeEventListener('ended', handleNativeStop);
			};
		}
	}, [stream, dispatch]);

	return (
		<video
			id={id}
			ref={videoRef}
			style={{ width: '100%', height: '100%', objectFit: 'contain' }}
			autoPlay
			playsInline
			muted
		/>
	);
};

export default ScreenSharePreview;
