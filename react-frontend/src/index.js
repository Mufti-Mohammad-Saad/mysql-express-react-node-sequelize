import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";
import * as serviceWorkerRegistration from "./registerServiceWorker"; // Updated to use service worker registration

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);


serviceWorkerRegistration.register();
