import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addStroke } from '../redux/actions';

const CanvasOverlay = () => {
	const canvasRef = useRef(null);
	const containerRef = useRef(null);
	const dispatch = useDispatch();

	const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

	const [isDrawing, setIsDrawing] = useState(false);
	const [currentPoints, setCurrentPoints] = useState([]);
	const { tool, color, strokeWidth, history } = useSelector((state) => state);

	useEffect(() => {
		const resizeObserver = new ResizeObserver((entries) => {
			for (let entry of entries) {
				const { width, height } = entry.contentRect;
				setDimensions({ width, height });
			}
		});

		if (containerRef.current) {
			resizeObserver.observe(containerRef.current);
		}

		return () => resizeObserver.disconnect();
	}, []);

	const toPx = (point, width, height) => ({
		x: point.x * width,
		y: point.y * height,
	});

	const toPercent = (x, y, width, height) => ({
		x: x / width,
		y: y / height,
	});

	const drawStroke = useCallback((ctx, stroke, width, height) => {
		if (stroke.points.length < 2) return;

		ctx.beginPath();
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';
		ctx.lineWidth = stroke.width;

		if (stroke.tool === 'eraser') {
			ctx.globalCompositeOperation = 'destination-out';
		} else {
			ctx.globalCompositeOperation = 'source-over';
			ctx.strokeStyle = stroke.color;
		}

		const first = toPx(stroke.points[0], width, height);
		ctx.moveTo(first.x, first.y);

		for (let i = 1; i < stroke.points.length; i++) {
			const p = toPx(stroke.points[i], width, height);
			ctx.lineTo(p.x, p.y);
		}
		ctx.stroke();
	}, []);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (canvas) {
			const ctx = canvas.getContext('2d');
			ctx.clearRect(0, 0, dimensions.width, dimensions.height);

			history.forEach((stroke) =>
				drawStroke(ctx, stroke, dimensions.width, dimensions.height)
			);
		}
	}, [history, dimensions, drawStroke]);

	const startDrawing = ({ nativeEvent }) => {
		const { offsetX, offsetY } = nativeEvent;
		setIsDrawing(true);

		const point = toPercent(
			offsetX,
			offsetY,
			dimensions.width,
			dimensions.height
		);
		setCurrentPoints([point]);

		const ctx = canvasRef.current.getContext('2d');
		ctx.beginPath();
		ctx.fillStyle = tool === 'eraser' ? 'rgba(0,0,0,1)' : color;
		ctx.arc(offsetX, offsetY, strokeWidth / 2, 0, Math.PI * 2);
		ctx.fill();
	};

	const draw = ({ nativeEvent }) => {
		if (!isDrawing) return;
		const { offsetX, offsetY } = nativeEvent;

		const point = toPercent(
			offsetX,
			offsetY,
			dimensions.width,
			dimensions.height
		);
		setCurrentPoints((prev) => [...prev, point]);

		const ctx = canvasRef.current.getContext('2d');
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';
		ctx.lineWidth = strokeWidth;

		if (tool === 'eraser') {
			ctx.globalCompositeOperation = 'destination-out';
		} else {
			ctx.globalCompositeOperation = 'source-over';
			ctx.strokeStyle = color;
		}

		const lastPointPercent = currentPoints[currentPoints.length - 1];
		const lastPointPx = toPx(
			lastPointPercent,
			dimensions.width,
			dimensions.height
		);

		ctx.beginPath();
		ctx.moveTo(lastPointPx.x, lastPointPx.y);
		ctx.lineTo(offsetX, offsetY);
		ctx.stroke();
	};

	const stopDrawing = () => {
		if (!isDrawing) return;
		setIsDrawing(false);

		if (currentPoints.length > 0) {
			const newStroke = {
				tool,
				color,
				width: strokeWidth,
				points: currentPoints,
			};
			dispatch(addStroke(newStroke));
		}
		setCurrentPoints([]);
	};

	return (
		<div
			ref={containerRef}
			style={{
				width: '100%',
				height: '100%',
				position: 'absolute',
				top: 0,
				left: 0,
			}}
		>
			<canvas
				ref={canvasRef}
				width={dimensions.width}
				height={dimensions.height}
				style={{
					display: 'block',
					cursor: tool === 'eraser' ? 'cell' : 'crosshair',
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
