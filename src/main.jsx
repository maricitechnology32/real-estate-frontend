import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './contexts/AuthContext.jsx';
import './config/i18n';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* 2. Wrap the App */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);