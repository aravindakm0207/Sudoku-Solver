import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter


const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
   
      <AuthProvider>
        <BrowserRouter> {/* Wrap with BrowserRouter */}
          <App />
        </BrowserRouter>
      </AuthProvider>
  
  );
} else {
  console.error('Root element not found');
}
