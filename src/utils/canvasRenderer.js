import { TOOLS, COMPOSITE_OPS, DEFAULTS } from '../constants';
import { toPx } from './canvasMath';

const drawArrow = (ctx, fromX, fromY, toX, toY, width) => {
	const headLength = 20;
	const dx = toX - fromX;
	const dy = toY - fromY;
	const angle = Math.atan2(dy, dx);

	ctx.beginPath();
	ctx.lineWidth = width;
	ctx.moveTo(fromX, fromY);
	ctx.lineTo(toX, toY);
	ctx.stroke();

	// Arrowhead
	ctx.beginPath();
	ctx.moveTo(toX, toY);
	ctx.lineTo(
		toX - headLength * Math.cos(angle - Math.PI / 6),
		toY - headLength * Math.sin(angle - Math.PI / 6)
	);
	ctx.moveTo(toX, toY);
	ctx.lineTo(
		toX - headLength * Math.cos(angle + Math.PI / 6),
		toY - headLength * Math.sin(angle + Math.PI / 6)
	);
	ctx.stroke();
};

export const drawStroke = (ctx, stroke, width, height) => {
	if (!stroke.points || stroke.points.length === 0) return;

	ctx.lineCap = 'round';
	ctx.lineJoin = 'round';

	if (stroke.tool === TOOLS.HIGHLIGHTER) {
		ctx.lineWidth = stroke.width * DEFAULTS.HIGHLIGHTER_WIDTH_MULTIPLIER;
		ctx.globalAlpha = DEFAULTS.HIGHLIGHTER_OPACITY;
		ctx.globalCompositeOperation = COMPOSITE_OPS.SOURCE_OVER;
		ctx.strokeStyle = stroke.color;
	} else if (stroke.tool === TOOLS.ERASER) {
		ctx.lineWidth = stroke.width;
		ctx.globalAlpha = 1.0;
		ctx.globalCompositeOperation = COMPOSITE_OPS.DESTINATION_OUT;
	} else {
		ctx.lineWidth = stroke.width;
		ctx.globalAlpha = 1.0;
		ctx.globalCompositeOperation = COMPOSITE_OPS.SOURCE_OVER;
		ctx.strokeStyle = stroke.color;
	}

	// 2. Convert Coordinates
	const start = toPx(stroke.points[0], width, height);

	// 3. Draw Shapes or Freehand
	if (stroke.tool === TOOLS.RECTANGLE || stroke.tool === TOOLS.ARROW) {
		const end = toPx(stroke.points[stroke.points.length - 1], width, height);

		if (stroke.tool === TOOLS.RECTANGLE) {
			const w = end.x - start.x;
			const h = end.y - start.y;
			ctx.strokeRect(start.x, start.y, w, h);
		} else if (stroke.tool === TOOLS.ARROW) {
			drawArrow(ctx, start.x, start.y, end.x, end.y, stroke.width);
		}
	} else {
		// Freehand
		ctx.beginPath();
		ctx.moveTo(start.x, start.y);
		for (let i = 1; i < stroke.points.length; i++) {
			const p = toPx(stroke.points[i], width, height);
			ctx.lineTo(p.x, p.y);
		}
		ctx.stroke();
	}
};
