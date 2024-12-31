// frontend/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';  // Use 'react-dom/client' for React 18+
import './index.css';
import App from './App';
import './styles/Theme.css';
import { ThemeProvider } from './context/ThemeContext';

// Create the root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app inside the root element
root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
