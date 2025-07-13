import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter> {/* ✅ THIS FIXES THE ERROR */}
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
);
