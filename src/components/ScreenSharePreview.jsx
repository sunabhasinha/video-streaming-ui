import React, { useRef, useState } from 'react';

const ScreenSharePreview = () => {
	// 1. Ref to access the standard HTML <video> element
	const videoRef = useRef(null);

	// 2. Local state to track if we are currently sharing (for UI toggling)
	const [isSharing, setIsSharing] = useState(false);

	// 3. The Function to Start Sharing
	const startCapture = async () => {
		try {
			// ASK: "Can I see your screen?"
			// This returns a Promise that resolves to a MediaStream
			const stream = await navigator.mediaDevices.getDisplayMedia({
				video: { cursor: 'always' }, // Capture the mouse cursor too
				audio: false, // We only need video for this assignment
			});

			// PLUG IN: Connect the stream to the video element
			if (videoRef.current) {
				videoRef.current.srcObject = stream;
			}

			setIsSharing(true);

			// TRACK STOP: Listen for when the user clicks "Stop Sharing" on the browser's native floating bar
			stream.getTracks()[0].onended = () => {
				stopCapture();
			};
		} catch (err) {
			console.error('Error: ' + err);
		}
	};

	// 4. The Function to Stop Sharing
	const stopCapture = () => {
		// If we have an active stream, we must stop all "tracks" (video/audio)
		if (videoRef.current && videoRef.current.srcObject) {
			const tracks = videoRef.current.srcObject.getTracks();
			tracks.forEach((track) => track.stop()); // Physically stop the camera/screen recording
			videoRef.current.srcObject = null;
		}
		setIsSharing(false);
	};

	return (
		<div style={{ textAlign: 'center', marginTop: '20px' }}>
			<h2>Step 1: Raw Media Stream</h2>

			{/* The Video Element
        - autoPlay: Crucial! Starts playing as soon as stream loads.
        - playsInline: Prevents fullscreen on mobile (good practice).
        - muted: Good practice to avoid feedback loops if audio were involved.
      */}
			<video
				ref={videoRef}
				style={{
					width: '80%',
					border: '2px solid black',
					backgroundColor: '#000',
				}}
				autoPlay
				playsInline
				muted
			/>

			<div style={{ marginTop: '10px' }}>
				{!isSharing ? (
					<button
						onClick={startCapture}
						style={{ padding: '10px 20px', fontSize: '16px' }}
					>
						Start Screen Share
					</button>
				) : (
					<button
						onClick={stopCapture}
						style={{ padding: '10px 20px', fontSize: '16px' }}
					>
						Stop Sharing
					</button>
				)}
			</div>
		</div>
	);
};

export default ScreenSharePreview;
