import React from 'react';

const ColorPicker = ({ color, onChange, disabled }) => {
	return (
		<div
			style={{
				opacity: disabled ? 0.3 : 1,
				transition: '0.3s',
				display: 'flex',
				alignItems: 'center',
			}}
		>
			<input
				type="color"
				value={color}
				onChange={(e) => onChange(e.target.value)}
				disabled={disabled}
				title="Stroke Color"
			/>
		</div>
	);
};

export default ColorPicker;
