// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './screens/auth/login';
import Register from './screens/auth/register';
import Acceuil from './screens/acceuil';
import AddAnalyse from './screens/add/analyse';
import ProtectedRoute from './components/ProtectedRoute';
import FloatingLogoutButton from './components/FloatingLogoutButton';

export default function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={
        localStorage.getItem("token") ? <Navigate to="/acceuil" /> : <Login />
          } />
        {/* Protected Routes with Floating Logout Button */}
        <Route
          path="/acceuil"
          element={
            <ProtectedRoute>
              <>
                <FloatingLogoutButton />
                <Acceuil />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add/analyse"
          element={
            <ProtectedRoute>
              <>
                <FloatingLogoutButton />
                <AddAnalyse />
              </>
            </ProtectedRoute>
          }
        />

        {/* Fallback: redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
