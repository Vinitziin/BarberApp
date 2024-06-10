import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/AdminPanel.css';
import logo from '../assets/images/logo.png'; // Certifique-se de ter o logo

function AdminPanel() {
  return (
    <div className="admin-container">
      <header className="admin-header">
        <img src={logo} alt="Logo Barbearia Laguna" className="admin-logo" />
        <nav className="admin-nav">
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/usuarios">Usuários</Link></li>
            <li><Link to="/agendamentos">Agendamentos</Link></li>
            <li><Link to="/servicos">Serviços</Link></li>
            <li><Link to="/colaboradores">Colaboradores</Link></li>
            <li><Link to="/galeria">Galeria</Link></li>
          </ul>
        </nav>
      </header>
      <div className="admin-content">
        <h1>Painel de Administração</h1>
        <div className="admin-sections">
          <div className="admin-section">
            <h2>Usuários</h2>
            <p>Gerencie os usuários cadastrados na plataforma.</p>
            <button>Ver Usuários</button>
          </div>
          <div className="admin-section">
            <h2>Agendamentos</h2>
            <p>Gerencie os agendamentos realizados.</p>
            <button>Ver Agendamentos</button>
          </div>
          <div className="admin-section">
            <h2>Serviços</h2>
            <p>Gerencie os serviços oferecidos.</p>
            <button>Ver Serviços</button>
          </div>
          <div className="admin-section">
            <h2>Colaboradores</h2>
            <p>Gerencie os colaboradores da barbearia.</p>
            <button>Ver Colaboradores</button>
          </div>
          <div className="admin-section">
            <h2>Galeria</h2>
            <p>Gerencie as imagens da galeria.</p>
            <button>Ver Galeria</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
