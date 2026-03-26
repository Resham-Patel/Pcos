import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Navbar /> {/* This must be inside the Router (which is usually in main.jsx) */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* If you have other pages, add them here */}
      </Routes>
    </>
  );
}

export default App;