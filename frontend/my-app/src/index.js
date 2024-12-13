import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom'; 

import configureStore from './redux/store/configureStore';
import { Provider } from 'react-redux';

// Initialize the store
const store = configureStore(); // Add this line to create the store

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store={store}>  {/* Use store here */}
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
