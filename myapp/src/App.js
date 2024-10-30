import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Product from './Product';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/login"
            element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate to="/product" />}
          />
          <Route
            path="/product"
            element={isLoggedIn ? <Product /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
