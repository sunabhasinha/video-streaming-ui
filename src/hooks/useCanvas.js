import { useState, useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addStroke } from '../redux/actions';
import { TOOLS, COMPOSITE_OPS } from '../constants';
import { getPointFromEvent, toPx } from '../utils/canvasMath';
import { drawStroke } from '../utils/canvasRenderer';

export const useCanvas = () => {
	const canvasRef = useRef(null);
	const containerRef = useRef(null);
	const dispatch = useDispatch();

	// OPTIMIZATION: Use Ref instead of State for high-frequency updates
	// This prevents React from re-rendering 60 times a second while drawing.
	const currentPointsRef = useRef([]);

	const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
	const [isDrawing, setIsDrawing] = useState(false);

	// Redux State
	const { tool, color, strokeWidth, history } = useSelector((state) => state);

	// 1. Resize Observer (Keeps canvas sharp)
	useEffect(() => {
		const resizeObserver = new ResizeObserver((entries) => {
			for (let entry of entries) {
				const { width, height } = entry.contentRect;
				setDimensions({ width, height });
			}
		});
		if (containerRef.current) resizeObserver.observe(containerRef.current);
		return () => resizeObserver.disconnect();
	}, []);

	// 2. History Re-render (Only runs when history changes)
	useEffect(() => {
		const canvas = canvasRef.current;
		if (canvas) {
			const ctx = canvas.getContext('2d');
			ctx.clearRect(0, 0, dimensions.width, dimensions.height);
			history.forEach((stroke) =>
				drawStroke(ctx, stroke, dimensions.width, dimensions.height)
			);
		}
	}, [history, dimensions]);

	// 3. Mouse Handlers
	const startDrawing = useCallback(
		({ nativeEvent }) => {
			const { px, pct } = getPointFromEvent(
				nativeEvent,
				dimensions.width,
				dimensions.height
			);
			setIsDrawing(true);

			// Reset the Ref Buffer
			currentPointsRef.current = [pct];

			// Visual Feedback (Dot)
			const ctx = canvasRef.current.getContext('2d');
			ctx.beginPath();
			ctx.fillStyle = tool === TOOLS.ERASER ? 'rgba(0,0,0,1)' : color;
			ctx.arc(px.x, px.y, strokeWidth / 2, 0, Math.PI * 2);
			ctx.fill();
		},
		[dimensions, tool, color, strokeWidth]
	);

	const draw = useCallback(
		({ nativeEvent }) => {
			if (!isDrawing) return;
			const { px, pct } = getPointFromEvent(
				nativeEvent,
				dimensions.width,
				dimensions.height
			);

			// OPTIMIZATION: Push to Ref (No Re-render)
			currentPointsRef.current.push(pct);

			// Live Render (Direct DOM Manipulation)
			const ctx = canvasRef.current.getContext('2d');
			ctx.lineCap = 'round';
			ctx.lineJoin = 'round';
			ctx.lineWidth = strokeWidth;
			ctx.strokeStyle = color;
			ctx.globalCompositeOperation =
				tool === TOOLS.ERASER
					? COMPOSITE_OPS.DESTINATION_OUT
					: COMPOSITE_OPS.SOURCE_OVER;

			// Connect previous point to current point
			// We grab the previous point directly from the Ref
			const pointsBuffer = currentPointsRef.current;
			const lastPointPercent = pointsBuffer[pointsBuffer.length - 2]; // Get second to last

			if (lastPointPercent) {
				const lastPointPx = toPx(
					lastPointPercent,
					dimensions.width,
					dimensions.height
				);
				ctx.beginPath();
				ctx.moveTo(lastPointPx.x, lastPointPx.y);
				ctx.lineTo(px.x, px.y);
				ctx.stroke();
			}
		},
		[isDrawing, dimensions, strokeWidth, color, tool]
	);

	const stopDrawing = useCallback(() => {
		if (!isDrawing) return;
		setIsDrawing(false);

		// Read from the Ref Buffer
		const points = currentPointsRef.current;

		if (points.length > 0) {
			dispatch(
				addStroke({
					tool,
					color,
					width: strokeWidth,
					points: points, // Send the buffered points to Redux
				})
			);
		}

		// Clear Buffer
		currentPointsRef.current = [];
	}, [isDrawing, tool, color, strokeWidth, dispatch]);

	return {
		refs: { canvasRef, containerRef },
		state: { dimensions, tool },
		handlers: { startDrawing, draw, stopDrawing },
	};
};
