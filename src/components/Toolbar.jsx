import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTool, setColor, setStrokeWidth, undo } from '../redux/actions';
import { startShareRequest, stopShareRequest } from '../redux/actions';

const Toolbar = () => {
	const dispatch = useDispatch();
	const { tool, color, strokeWidth } = useSelector((state) => state);

	const styles = {
		container: {
			padding: '10px',
			background: '#eee',
			marginBottom: '10px',
			display: 'flex',
			gap: '20px',
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: '8px',
		},
		button: (isActive) => ({
			padding: '8px 16px',
			border: 'none',
			borderRadius: '4px',
			background: isActive ? '#333' : '#ddd',
			color: isActive ? '#fff' : '#000',
			cursor: 'pointer',
		}),
	};

	const { isSharing } = useSelector((state) => state);

	return (
		<div style={styles.container}>
			{/* New Start/Stop Section */}
			<div
				style={{
					marginRight: '20px',
					borderRight: '1px solid #ccc',
					paddingRight: '20px',
				}}
			>
				{!isSharing ? (
					<button
						onClick={() => dispatch(startShareRequest())}
						style={{
							...styles.button(false),
							background: '#007bff',
							color: 'white',
						}}
					>
						Start Share
					</button>
				) : (
					<button
						onClick={() => dispatch(stopShareRequest())}
						style={{
							...styles.button(false),
							background: '#dc3545',
							color: 'white',
						}}
					>
						Stop Share
					</button>
				)}
			</div>
			{/* 1. Tool Selectors */}
			<div>
				<button
					style={styles.button(tool === 'pen')}
					onClick={() => dispatch(setTool('pen'))}
				>
					🖊️ Pen
				</button>
				<button
					style={styles.button(tool === 'eraser')}
					onClick={() => dispatch(setTool('eraser'))}
					className="ml-2"
				>
					🧼 Eraser
				</button>
			</div>

			{/* 2. Color Picker (Only show if not eraser) */}
			{tool !== 'eraser' && (
				<div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
					<label>Color:</label>
					<input
						type="color"
						value={color}
						onChange={(e) => dispatch(setColor(e.target.value))}
					/>
				</div>
			)}

			{/* 3. Stroke Width Slider */}
			<div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
				<label>Size: {strokeWidth}px</label>
				<input
					type="range"
					min="1"
					max="20"
					value={strokeWidth}
					onChange={(e) => dispatch(setStrokeWidth(Number(e.target.value)))}
				/>
			</div>
			<div style={{ marginLeft: 'auto' }}>
				{' '}
				{/* Push to right side */}
				<button
					onClick={() => dispatch(undo())}
					style={{
						...styles.button(false),
						background: '#f8f9fa',
						color: 'black',
						border: '1px solid #ccc',
					}}
				>
					↩️ Undo
				</button>
			</div>
		</div>
	);
};

export default Toolbar;
