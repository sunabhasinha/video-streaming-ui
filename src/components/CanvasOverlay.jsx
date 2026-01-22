// src/components/CanvasOverlay.jsx
import React from 'react';
import { useCanvas } from '../hooks/useCanvas';
import { TOOLS } from '../constants';

const CanvasOverlay = ({ id }) => {
	const { refs, state, handlers } = useCanvas();

	return (
		<div
			ref={refs.containerRef}
			style={{
				width: '100%',
				height: '100%',
				position: 'absolute',
				top: 0,
				left: 0,
			}}
		>
			<canvas
				id={id}
				ref={refs.canvasRef}
				width={state.dimensions.width}
				height={state.dimensions.height}
				style={{
					display: 'block',
					cursor: state.tool === TOOLS.ERASER ? 'cell' : 'crosshair',
				}}
				onMouseDown={handlers.startDrawing}
				onMouseMove={handlers.draw}
				onMouseUp={handlers.stopDrawing}
				onMouseLeave={handlers.stopDrawing}
			/>
		</div>
	);
};

export default CanvasOverlay;
