// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // For React 18+
import App from './App';
import './index.css'; // Import your global CSS (Tailwind base and custom styles)

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Root element with ID "root" not found in the DOM.');
}
