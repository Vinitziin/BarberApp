import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import Agendamento from './components/Agendamento';
import AdminPanel from './components/AdminPanel';
import Main from './components/Main';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/agendamento" element={<Agendamento />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
