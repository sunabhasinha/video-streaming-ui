import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store';
import Toolbar from './components/Toolbar';
import StreamContainer from './components/StreamContainer';
import { FaMagic, FaArrowDown } from 'react-icons/fa';
import './App.css';
import { APP_NAME } from './constants';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

const Main = () => {
	const { isSharing } = useSelector((state) => state);
	useKeyboardShortcuts();

	return (
		<div className="app-container">
			{/* Header */}
			<div className="header">
				<div className="logo-mark">G</div>
				<h1>{APP_NAME}</h1>
			</div>

			{/* Video Stage */}
			<div className="stage">
				{isSharing ? (
					<div className="video-wrapper">
						<StreamContainer />
					</div>
				) : (
					<div className="placeholder">
						<div className="floating-icon">
							<FaMagic size={60} />
						</div>
						<h2 className="gradient-text">Unleash Your Creativity</h2>
						<p>
							Share your screen to start annotating, highlighting, and creating
							magic.
						</p>
						<p style={{ marginTop: '12px', fontSize: '0.9rem', opacity: 0.7 }}>
							💡 Pro Tip: Press <b>'d'</b> to toggle drawing mode.
						</p>

						<div className="instruction-arrow">
							<span>Start here</span>
							<FaArrowDown />
						</div>
					</div>
				)}
			</div>

			<Toolbar />
		</div>
	);
};

const App = () => (
	<Provider store={store}>
		<Main />
	</Provider>
);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
