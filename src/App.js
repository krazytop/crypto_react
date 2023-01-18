import React, { useState, useEffect } from 'react';
import { BrowserRouter as Switch, Routes, Route } from 'react-router-dom';
import { auth } from "./config/firebase";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Coin from './pages/Coin';
import Api from './data/Api';

function App() {

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        if (window.location.pathname !== '/login') {
          window.location.pathname = '/login';
        }
      } else {
        if (window.location.pathname !== '/dashboard' && window.location.pathname !== '/api' && !window.location.pathname.startsWith('/coin/')) {
          window.location.pathname = '/dashboard';
        }
      }
    });
  }, []);

  return (
    <Switch>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/api" element={<Api />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route path="/coin/*" element={<Coin />} />
      </Routes>
    </Switch>
  );
}

export default App;