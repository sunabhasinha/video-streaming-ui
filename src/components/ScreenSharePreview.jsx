import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startShareRequest, stopShareRequest } from '../redux/actions';

const ScreenSharePreview = () => {
	const videoRef = useRef(null);
	const dispatch = useDispatch();

	const { isSharing, stream, error } = useSelector((state) => state);

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.srcObject = stream;
		}
	}, [stream]);

	const handleStart = () => {
		dispatch(startShareRequest());
	};

	const handleStop = () => {
		if (stream) {
			stream.getTracks().forEach((track) => track.stop());
		}
		dispatch(stopShareRequest());
	};

	return (
		<div style={{ textAlign: 'center', marginTop: '20px' }}>
			<h2>Step 3: Redux Integration</h2>

			{error && <p style={{ color: 'red' }}>Error: {error}</p>}

			<video
				ref={videoRef}
				style={{
					width: '80%',
					border: isSharing ? '2px solid green' : '2px solid black',
					backgroundColor: '#000',
				}}
				autoPlay
				playsInline
				muted
			/>

			<div style={{ marginTop: '10px' }}>
				{!isSharing ? (
					<button
						onClick={handleStart}
						style={{
							padding: '10px 20px',
							fontSize: '16px',
							background: '#007bff',
							color: 'white',
							border: 'none',
							borderRadius: '4px',
						}}
					>
						Start Screen Share (via Redux)
					</button>
				) : (
					<button
						onClick={handleStop}
						style={{
							padding: '10px 20px',
							fontSize: '16px',
							background: '#dc3545',
							color: 'white',
							border: 'none',
							borderRadius: '4px',
						}}
					>
						Stop Sharing
					</button>
				)}
			</div>
		</div>
	);
};

export default ScreenSharePreview;
