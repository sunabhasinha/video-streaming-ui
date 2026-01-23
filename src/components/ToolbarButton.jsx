import React, { memo } from 'react';

const ToolbarButton = memo(({ onClick, isActive, title, children }) => {
	return (
		<button
			className={`tool-btn ${isActive ? 'active' : ''}`}
			onClick={onClick}
			data-tooltip={title}
			aria-label={title}
			tabIndex={0}
		>
			{children}
		</button>
	);
});

ToolbarButton.displayName = 'ToolbarButton';

export default ToolbarButton;
