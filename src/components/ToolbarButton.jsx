import React from 'react';
const ToolbarButton = ({ onClick, isActive, title, children }) => {
	return (
		<button
			className={`tool-btn ${isActive ? 'active' : ''}`}
			onClick={onClick}
			title={title}
		>
			{children}
		</button>
	);
};

export default ToolbarButton;
