import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import Agendamento from './components/Agendamento';
import AdminPanel from './components/AdminPanel';
import AdminAgendamentos from './components/AdminAgendamentos';
import Usuarios from './components/Usuarios';
import Servicos from './components/Servicos';
import Funcionario from './components/Funcionario';
import Main from './components/Main';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    if (token) {
      setIsAuthenticated(true);
      setRole(userRole);
    }
  }, []);

  const handleLogin = (newToken) => {
    const userRole = JSON.parse(atob(newToken.split('.')[1])).role;
    localStorage.setItem('token', newToken);
    localStorage.setItem('role', userRole);
    setIsAuthenticated(true);
    setRole(userRole);
  };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/agendamento" element={<PrivateRoute><Agendamento /></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute admin={true}><AdminPanel /></PrivateRoute>} />
          <Route path="/admin/usuarios" element={<PrivateRoute admin={true}><Usuarios /></PrivateRoute>} />
          <Route path="/admin/agendamentos" element={<PrivateRoute admin={true}><AdminAgendamentos /></PrivateRoute>} />
          <Route path="/admin/funcionarios" element={<PrivateRoute admin={true}><Funcionario /></PrivateRoute>} />
          <Route path="/admin/servicos" element={<PrivateRoute admin={true}><Servicos /></PrivateRoute>} />
          <Route path="/" element={<Main />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
