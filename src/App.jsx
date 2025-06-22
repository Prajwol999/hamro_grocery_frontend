import React, { useContext } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';

import { AuthPage } from './pages/authPage';
import { AuthContext } from './auth/AuthContext';
import ProtectedRoute from './routers/ProtectedRoutes';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import NavBar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const { user } = useContext(AuthContext);
  const location = useLocation();

   console.log("User object in App:", user);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {!user && <NavBar />}

      <main className="flex-grow w-full">
        <Routes>
          <Route
            path="/"
            element={!user ? <HomePage /> : <Navigate to="/dashboard" replace />}
          />
          <Route
            path="/login"
            element={!user ? <AuthPage /> : <Navigate to="/dashboard" replace />}
          />
          <Route
            path="/register"
            element={!user ? <AuthPage /> : <Navigate to="/dashboard" replace />}
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                {user?.role === 'admin' ? (
                  <AdminDashboard />
                ) : (
                  <p>I am at user dashboard</p>
                )}
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!user && <Footer />}
    </div>
  );
}

export default App;