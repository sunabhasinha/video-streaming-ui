import React from 'react';
import { FaPen, FaMousePointer } from 'react-icons/fa';

const ToggleSwitch = ({ isOn, handleToggle, title }) => {
	return (
		<label className="switch" data-tooltip={title} aria-label={title}>
			<input
				type="checkbox"
				checked={isOn}
				onChange={handleToggle}
				aria-checked={isOn}
			/>
			<span className="slider round"></span>
			<div className="icon-knob">
				{isOn ? <FaPen size={10} /> : <FaMousePointer size={10} />}
			</div>
		</label>
	);
};

export default ToggleSwitch;
