import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from '../src/store/appContext.jsx';



import Home from './pages/home.jsx';
import Login from './pages/Login.jsx';





function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route element={<h1>Not found!</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default injectContext(App);
