import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TOOLS, UI_TEXT } from '../constants';
import {
	setTool,
	setColor,
	setStrokeWidth,
	startShareRequest,
	stopShareRequest,
	undo,
	clearCanvas,
	toggleAnnotation,
} from '../redux/actions';
import {
	FaPen,
	FaEraser,
	FaUndo,
	FaTrash,
	FaRegSquare,
	FaLongArrowAltRight,
	FaHighlighter,
	FaCamera,
} from 'react-icons/fa';

// Import our modular components
import ToolbarButton from './ToolbarButton';
import ToggleSwitch from './ToggleSwitch';
import ColorPicker from './ColorPicker';
import SizeSlider from './SizeSlider';
import { takeSnapshot } from '../redux/actions';

const Toolbar = () => {
	const dispatch = useDispatch();
	const { isSharing, tool, color, strokeWidth, isAnnotationMode } = useSelector(
		(state) => state
	);

	return (
		<div className="toolbar">
			{/* 1. Start/Stop Actions */}
			{!isSharing ? (
				<button
					className="btn-primary"
					onClick={() => dispatch(startShareRequest())}
				>
					{UI_TEXT.START_SHARE}
				</button>
			) : (
				<button
					className="btn-danger"
					onClick={() => dispatch(stopShareRequest())}
				>
					{UI_TEXT.STOP_SHARE}
				</button>
			)}

			<div className="separator"></div>

			{/* 2. Mode Toggle */}
			<ToggleSwitch
				isOn={isAnnotationMode}
				handleToggle={() => dispatch(toggleAnnotation())}
				title={UI_TEXT.TOGGLE_MODE}
			/>

			<div className="separator"></div>

			{/* 3. Drawing Tools Group */}
			<div
				style={{
					display: 'flex',
					gap: '10px',
					opacity: isAnnotationMode ? 1 : 0.3,
					pointerEvents: isAnnotationMode ? 'auto' : 'none',
					transition: '0.3s',
					alignItems: 'center',
				}}
			>
				<ToolbarButton
					isActive={tool === TOOLS.PEN}
					onClick={() => dispatch(setTool(TOOLS.PEN))}
					title={UI_TEXT.PEN_TOOL}
				>
					<FaPen size={16} />
				</ToolbarButton>

				<ToolbarButton
					isActive={tool === TOOLS.ERASER}
					onClick={() => dispatch(setTool(TOOLS.ERASER))}
					title={UI_TEXT.ERASER_TOOL}
				>
					<FaEraser size={18} />
				</ToolbarButton>

				<ColorPicker
					color={color}
					onChange={(val) => dispatch(setColor(val))}
					disabled={tool === TOOLS.ERASER}
				/>

				<SizeSlider
					width={strokeWidth}
					color={tool === TOOLS.ERASER ? '#fff' : color}
					onChange={(val) => dispatch(setStrokeWidth(val))}
				/>

				<div className="separator" style={{ height: '16px' }}></div>

				<ToolbarButton onClick={() => dispatch(undo())} title={UI_TEXT.UNDO}>
					<FaUndo size={16} />
				</ToolbarButton>

				<ToolbarButton
					onClick={() => dispatch(clearCanvas())}
					title={UI_TEXT.CLEAR}
				>
					<FaTrash size={16} />
				</ToolbarButton>
				<ToolbarButton
					isActive={tool === TOOLS.RECTANGLE}
					onClick={() => dispatch(setTool(TOOLS.RECTANGLE))}
					title={UI_TEXT.RECT_TOOL}
				>
					<FaRegSquare size={16} />
				</ToolbarButton>

				<ToolbarButton
					isActive={tool === TOOLS.ARROW}
					onClick={() => dispatch(setTool(TOOLS.ARROW))}
					title={UI_TEXT.ARROW_TOOL}
				>
					<FaLongArrowAltRight size={16} />
				</ToolbarButton>
				<ToolbarButton
					isActive={tool === TOOLS.HIGHLIGHTER}
					onClick={() => dispatch(setTool(TOOLS.HIGHLIGHTER))}
					title={UI_TEXT.HIGHLIGHTER_TOOL}
				>
					<FaHighlighter size={16} />
				</ToolbarButton>
				<ToolbarButton
					onClick={() => dispatch(takeSnapshot())}
					title={UI_TEXT.SNAPSHOT}
				>
					<FaCamera size={16} />
				</ToolbarButton>
			</div>
		</div>
	);
};

export default Toolbar;
