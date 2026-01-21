import { createRoot } from 'react-dom/client';
import ScreenSharePreview from './components/ScreenSharePreview';
import CanvasOverlay from './components/CanvasOverlay';
import { Provider } from 'react-redux'; // Import Provider
import store from './redux/store';

const App = () => (
	<Provider store={store}>
		<div>
			<ScreenSharePreview />
			<hr />
			<CanvasOverlay />
		</div>
	</Provider>
);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
