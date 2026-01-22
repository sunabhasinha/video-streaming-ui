import React from 'react';
import { BsCircleFill } from 'react-icons/bs';

const SizeSlider = ({ width, color, onChange }) => {
	return (
		<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
			<BsCircleFill size={width} color={color} style={{ transition: '0.2s' }} />
			<input
				type="range"
				min="2"
				max="20"
				value={width}
				onChange={(e) => onChange(Number(e.target.value))}
				title="Brush Size"
			/>
		</div>
	);
};

export default SizeSlider;
