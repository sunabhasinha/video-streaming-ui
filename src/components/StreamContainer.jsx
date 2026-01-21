import React from 'react';
import ScreenSharePreview from './ScreenSharePreview';
import CanvasOverlay from './CanvasOverlay';

const StreamContainer = () => {
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
					<ScreenSharePreview style={{ width: '100%', height: '100%' }} />
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
						pointerEvents: 'auto',
					}}
				>
					<CanvasOverlay />
				</div>
			</div>
		</div>
	);
};

export default StreamContainer;
