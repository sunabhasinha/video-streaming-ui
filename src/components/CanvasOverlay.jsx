import { useRef, useState, useEffect } from 'react';

const CanvasOverlay = () => {
	const canvasRef = useRef(null);
	const [isDrawing, setIsDrawing] = useState(false);
	const [context, setContext] = useState(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (canvas) {
			const ctx = canvas.getContext('2d');

			ctx.lineCap = 'round';
			ctx.lineJoin = 'round';
			ctx.lineWidth = 5;
			ctx.strokeStyle = 'red';

			setContext(ctx);
		}
	}, []);

	// 2. Start Drawing (MouseDown)
	const startDrawing = ({ nativeEvent }) => {
		const { offsetX, offsetY } = nativeEvent;
		if (context) {
			context.beginPath();
			context.moveTo(offsetX, offsetY);
			setIsDrawing(true);
		}
	};

	const draw = ({ nativeEvent }) => {
		if (!isDrawing || !context) return;

		const { offsetX, offsetY } = nativeEvent;

		context.lineTo(offsetX, offsetY);
		context.stroke();
	};

	const stopDrawing = () => {
		if (context) {
			context.closePath();
		}
		setIsDrawing(false);
	};

	return (
		<div style={{ textAlign: 'center', marginTop: '20px' }}>
			<h2>Step 2: Canvas Prototype</h2>
			<canvas
				ref={canvasRef}
				// Hardcoded size for now. Later this must match the video size exactly.
				width={800}
				height={600}
				style={{
					border: '2px solid blue',
					cursor: 'crosshair',
					backgroundColor: '#f0f0f0',
				}}
				onMouseDown={startDrawing}
				onMouseMove={draw}
				onMouseUp={stopDrawing}
				onMouseLeave={stopDrawing}
			/>
		</div>
	);
};

export default CanvasOverlay;
