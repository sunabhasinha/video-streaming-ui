import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store';
import Toolbar from './components/Toolbar';
import StreamContainer from './components/StreamContainer';

const Main = () => {
	const { isSharing } = useSelector((state) => state);

	return (
		<div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
			<h1>Genea Screen Share</h1>
			<Toolbar />

			{isSharing && <StreamContainer />}

			{!isSharing && (
				<div
					style={{
						marginTop: '50px',
						textAlign: 'center',
						color: '#666',
					}}
				>
					<h3>Ready to Share</h3>
					<p>Click "Start Share" in the toolbar to begin.</p>
				</div>
			)}
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
