import React from 'react';
import { createRoot } from 'react-dom/client';
import ScreenSharePreview from './components/ScreenSharePreview';
import CanvasOverlay from './components/CanvasOverlay'; // Import

const App = () => (
	<div>
		<ScreenSharePreview />
		<hr />
		<CanvasOverlay />
	</div>
);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
