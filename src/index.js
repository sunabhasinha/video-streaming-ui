import React from 'react';
import { createRoot } from 'react-dom/client';

//testing environment setup
const App = () => <h1>Environment Check: Success</h1>;

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
