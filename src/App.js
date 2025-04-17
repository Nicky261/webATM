import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';

// Importăm paginile
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  // Simulăm starea de autentificare (în proiectul real, veți verifica tokenul sau sesiunea)
  const isAuthenticated = localStorage.getItem('token') !== null;

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard/*" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;