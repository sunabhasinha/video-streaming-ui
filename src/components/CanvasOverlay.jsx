import React, { useRef, useState, useEffect } from 'react';

const CanvasOverlay = () => {
	const canvasRef = useRef(null);
	const [isDrawing, setIsDrawing] = useState(false);
	const [context, setContext] = useState(null);

	// 1. Initialize the Canvas Context
	// The "context" is our toolkit (pen, eraser, colors).
	useEffect(() => {
		const canvas = canvasRef.current;
		if (canvas) {
			const ctx = canvas.getContext('2d');

			// Default Styles
			ctx.lineCap = 'round'; // Makes lines have rounded ends
			ctx.lineJoin = 'round'; // Makes corners round (smoother drawing)
			ctx.lineWidth = 5; // Thickness of the pen
			ctx.strokeStyle = 'red'; // Color of the pen

			setContext(ctx);
		}
	}, []);

	// 2. Start Drawing (MouseDown)
	const startDrawing = ({ nativeEvent }) => {
		const { offsetX, offsetY } = nativeEvent;
		if (context) {
			context.beginPath(); // Start a fresh path (so we don't connect to the previous line)
			context.moveTo(offsetX, offsetY); // Move the "pen" to where the mouse clicked
			setIsDrawing(true);
		}
	};

	// 3. Draw Line (MouseMove)
	const draw = ({ nativeEvent }) => {
		if (!isDrawing || !context) return;

		const { offsetX, offsetY } = nativeEvent;

		// Draw a line from the previous point to this new point
		context.lineTo(offsetX, offsetY);
		context.stroke(); // This command actually makes the line visible on screen
	};

	// 4. Stop Drawing (MouseUp / MouseLeave)
	const stopDrawing = () => {
		if (context) {
			context.closePath(); // Optional: seals the path
		}
		setIsDrawing(false);
	};

	return (
		<div style={{ textAlign: 'center', marginTop: '20px' }}>
			<h2>Step 2: Canvas Prototype</h2>
			<canvas
				ref={canvasRef}
				// We hardcode size for now. Later this must match the video size exactly.
				width={800}
				height={600}
				style={{
					border: '2px solid blue', // Blue border to distinguish from video
					cursor: 'crosshair',
					backgroundColor: '#f0f0f0', // Light gray background to see it clearly
				}}
				onMouseDown={startDrawing}
				onMouseMove={draw}
				onMouseUp={stopDrawing}
				onMouseLeave={stopDrawing} // Stop if mouse leaves the box
			/>
		</div>
	);
};

export default CanvasOverlay;
