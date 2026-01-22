// src/hooks/useCanvas.js
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

	// State
	const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
	const [isDrawing, setIsDrawing] = useState(false);
	const [currentPoints, setCurrentPoints] = useState([]);

	// Redux State
	const { tool, color, strokeWidth, history } = useSelector((state) => state);

	// 1. Resize Observer Logic
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

	// 2. History Re-render Logic
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
			setCurrentPoints([pct]);

			// Draw initial dot
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

			// Add point to local state
			setCurrentPoints((prev) => [...prev, pct]);

			// Live Render
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
			const lastPointPercent = currentPoints[currentPoints.length - 1];
			// Guard clause: ensure we have a last point
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
		[isDrawing, dimensions, currentPoints, strokeWidth, color, tool]
	);

	const stopDrawing = useCallback(() => {
		if (!isDrawing) return;
		setIsDrawing(false);

		if (currentPoints.length > 0) {
			dispatch(
				addStroke({
					tool,
					color,
					width: strokeWidth,
					points: currentPoints,
				})
			);
		}
		setCurrentPoints([]);
	}, [isDrawing, currentPoints, tool, color, strokeWidth, dispatch]);

	return {
		refs: { canvasRef, containerRef },
		state: { dimensions, tool, color, strokeWidth },
		handlers: { startDrawing, draw, stopDrawing },
	};
};
