import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './auth/AuthContext.jsx'; 
import ProtectedRoute from './routers/ProtectedRoutes.jsx'; 
import MainLayout from './layouts/MainLayout.jsx'; 
import HomePage from './pages/HomePage.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import UserDashboard from './pages/UserDashboard.jsx';
import LoginPage from './components/auth/LoginPage.jsx';
import SignupPage from './components/auth/SignupPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import EsewaVerifyPage from './pages/EsewaVerifyPage.jsx';


export default function App() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      {/* --- PUBLIC ROUTES --- */}
      <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
      
      {/* --- AUTH ROUTES --- */}
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/dashboard" replace />} />
      <Route path="/register" element={!user ? <SignupPage /> : <Navigate to="/dashboard" replace />} />
      
      {/* --- PROTECTED ROUTES --- */}

      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <MainLayout>
              <CheckoutPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      
      <Route
        path="/payment/verify"
        element={
          <ProtectedRoute>
            <EsewaVerifyPage />
          </ProtectedRoute>
        }
      />

      {/* DASHBOARD ROUTE */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            {user?.role === 'admin' ? <AdminDashboard /> : <UserDashboard />}
          </ProtectedRoute>
        }
      />
      
      {/* CATCH-ALL ROUTE */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}