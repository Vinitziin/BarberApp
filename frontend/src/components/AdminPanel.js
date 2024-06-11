import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/AdminPanel.css';
import logo from '../assets/images/logo.png'; // Certifique-se de que o caminho esteja correto

const AdminPanel = () => {
  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <nav className="admin-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/admin">Painel Admin</Link></li>
          </ul>
        </nav>
      </header>
      <div className="admin-content">
        <h1>Painel de Administração</h1>
        <div className="admin-sections">
          <div className="admin-section">
            <h2>Usuários</h2>
            <p>Gerencie os usuários cadastrados na plataforma.</p>
            <Link to="/admin/usuarios">
              <button>Ver Usuários</button>
            </Link>
          </div>
          <div className="admin-section">
            <h2>Agendamentos</h2>
            <p>Gerencie os agendamentos realizados.</p>
            <Link to="/admin/agendamentos">
              <button>Ver Agendamentos</button>
            </Link>
          </div>
          <div className="admin-section">
            <h2>Serviços</h2>
            <p>Gerencie os serviços oferecidos.</p>
            <Link to="/admin/servicos">
              <button>Ver Serviços</button>
            </Link>
          </div>
          <div className="admin-section">
            <h2>Colaboradores</h2>
            <p>Gerencie os colaboradores da barbearia.</p>
            <Link to="/admin/funcionarios">
              <button>Ver Colaboradores</button>
            </Link>
          </div>
          <div className="admin-section">
            <h2>Galeria</h2>
            <p>Gerencie as imagens da galeria.</p>
            <Link to="/admin/galeria">
              <button>Ver Galeria</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
