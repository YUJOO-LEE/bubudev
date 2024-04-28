import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'
import GlobalStyled from './component/GlobalStyled';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyled />
    <App />
  </React.StrictMode>,
)
