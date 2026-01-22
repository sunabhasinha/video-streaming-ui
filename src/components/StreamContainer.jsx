import React, { useEffect } from 'react';
import ScreenSharePreview from './ScreenSharePreview';
import CanvasOverlay from './CanvasOverlay';
import { useSelector } from 'react-redux';
import { exportCompositeImage } from '../utils/exportImage';
import { DOM_IDS } from '../constants';
const StreamContainer = () => {
	const { isAnnotationMode } = useSelector((state) => state);
	const { snapshotTrigger } = useSelector((state) => state);

	const videoId = DOM_IDS.VIDEO;
	const canvasId = DOM_IDS.CANVAS;

	useEffect(() => {
		if (snapshotTrigger) {
			const video = document.getElementById(videoId);
			const canvas = document.getElementById(canvasId);
			if (video && canvas) {
				exportCompositeImage(video, canvas);
			}
		}
	}, [snapshotTrigger]);

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				marginTop: '20px',
			}}
		>
			{/* The Stack Wrapper */}
			<div
				style={{
					position: 'relative',
					width: '100%',
					maxWidth: '1000px',
					aspectRatio: '16/9',
					height: '600px',
					border: '2px solid #333',
					backgroundColor: '#000',
				}}
			>
				{/* Layer 1: The Video (Bottom) */}
				<div
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						zIndex: 1,
					}}
				>
					<ScreenSharePreview
						id={videoId}
						style={{ width: '100%', height: '100%' }}
					/>
				</div>

				{/* Layer 2: The Canvas (Top) */}
				<div
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						zIndex: 2,
						pointerEvents: isAnnotationMode ? 'auto' : 'none',
					}}
				>
					<CanvasOverlay id={canvasId} />
				</div>
			</div>
		</div>
	);
};

export default StreamContainer;
