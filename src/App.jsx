import React, { useContext } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';

import { AuthPage } from './pages/authPage';
import { AuthContext } from './auth/AuthContext';
import ProtectedRoute from './routers/ProtectedRoutes';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import NavBar from './components/Navbar';
import Footer from './components/Footer';



  return (
    <div><Navbar/>
    </div>
  )
}

export default App;
