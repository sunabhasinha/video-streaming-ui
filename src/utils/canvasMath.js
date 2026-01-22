// src/utils/canvasMath.js

export const toPx = (point, width, height) => ({
	x: point.x * width,
	y: point.y * height,
});

export const toPercent = (x, y, width, height) => ({
	x: x / width,
	y: y / height,
});

export const getPointFromEvent = (nativeEvent, width, height) => {
	const { offsetX, offsetY } = nativeEvent;
	return {
		px: { x: offsetX, y: offsetY },
		pct: toPercent(offsetX, offsetY, width, height),
	};
};
