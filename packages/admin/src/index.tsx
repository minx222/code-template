import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import '@/assets/scss/tailwind.scss'
import '@/assets/scss/App.scss'

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
