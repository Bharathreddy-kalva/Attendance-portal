import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // Your main App component
import { StrictMode } from 'react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
