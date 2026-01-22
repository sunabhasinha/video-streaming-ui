import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store';
import Toolbar from './components/Toolbar';
import StreamContainer from './components/StreamContainer';
import './App.css';
import { APP_NAME } from './constants';

const Main = () => {
	const { isSharing } = useSelector((state) => state);

	return (
		<div className="app-container">
			{/* Header */}
			<div className="header">
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
						<h2>Ready to Create?</h2>
						<p>Click "Start Sharing" below to begin annotating.</p>
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
