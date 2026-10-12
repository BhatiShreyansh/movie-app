import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Watchlist from './pages/Watchlist';
// Toast Notifications ke liye imports
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar onSearch={setSearchQuery} />
        
        <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
        
        {/* Ye component poori website par notification dikhane ka kaam karega */}
        <ToastContainer position="bottom-right" theme="dark" autoClose={3000} />
      </div>
    </BrowserRouter>
  );
}

export default App;
