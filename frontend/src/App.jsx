import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  // Yahan hum search bar ka data (state) store kar rahe hain
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="app">
      {/* Navbar ko bata rahe hain ki jab search ho toh state update kare */}
      <Navbar onSearch={setSearchQuery} />
      
      {/* Home ko search word bhej rahe hain taaki wo movies filter kar sake */}
      <Home searchQuery={searchQuery} />
    </div>
  );
}

export default App;
