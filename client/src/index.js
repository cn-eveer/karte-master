import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Main from './main.js';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/home" element={<App />} />
      <Route path="/" element={<Main />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root'),
);
