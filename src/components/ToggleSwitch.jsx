import React from 'react';
import { FaPen, FaMousePointer } from 'react-icons/fa';

const ToggleSwitch = ({ isOn, handleToggle, title }) => {
	return (
		<label className="switch" title={title}>
			<input type="checkbox" checked={isOn} onChange={handleToggle} />
			<span className="slider round"></span>
			<div className="icon-knob">
				{isOn ? <FaPen size={10} /> : <FaMousePointer size={10} />}
			</div>
		</label>
	);
};

export default ToggleSwitch;
