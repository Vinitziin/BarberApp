import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import Agendamento from './components/Agendamento';
import AdminPanel from './components/AdminPanel';
import AdminAgendamentos from './components/AdminAgendamentos'; 
import Usuarios from './components/Usuarios';
import Servicos from './components/Servicos';
import Funcionario from './components/Funcionario'; // Certifique-se de que o caminho esteja correto
import Main from './components/Main';
import PrivateRoute from './components/PrivateRoute';

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
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/agendamento" element={<Agendamento />} />
        <Route path="/admin" element={isAuthenticated && role === 'admin' ? <AdminPanel /> : <Navigate to="/login" />} />
        <Route path="/admin/usuarios" element={isAuthenticated && role === 'admin' ? <Usuarios /> : <Navigate to="/login" />} />
        <Route path="/admin/agendamentos" element={isAuthenticated && role === 'admin' ? <AdminAgendamentos /> : <Navigate to="/login" />} />
        <Route path="/admin/funcionarios" element={isAuthenticated && role === 'admin' ? <Funcionario /> : <Navigate to="/login" />} />
        <Route path="/admin/servicos" element={isAuthenticated && role === 'admin' ? <Servicos /> : <Navigate to="/login" />} />
        <Route path="/" element={<Main />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
