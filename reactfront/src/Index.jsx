
import React from 'react';
//import ReactDOM from 'react-dom/client';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; // Correct import

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter> 
            <App />
        </BrowserRouter>
    </React.StrictMode>
);


