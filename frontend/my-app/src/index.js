import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom'; 
import { store } from './store';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store={store}> 
      <AuthProvider>
        <BrowserRouter> 
          <App />
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
} else {
  console.error('Root element not found');
}