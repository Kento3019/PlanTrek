import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/styles/globals.css'

/**開発中はTailWindCSS CDNを使用する
  import './output.css';
*/
import App from './App';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
