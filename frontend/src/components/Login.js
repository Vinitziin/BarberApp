import React, { useState } from 'react';
import { login } from '../api';
import '../assets/css/Login.css'; // Importando o arquivo CSS
import logo from '../assets/images/logo.png'; // Importando a logo diretamente

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await login(email, password);
      onLogin(token);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-logo">
        <img src={logo} alt="Logo Barbearia Laguna" />
      </div>
      <form onSubmit={handleSubmit} className="login-form">
        <h2>LOGIN</h2>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            placeholder="Senha"
          />
        </div>
        <div className="form-group form-check">
          <input type="checkbox" className="form-check-input" id="rememberMe" />
          <label className="form-check-label" htmlFor="rememberMe">
            Lembrar senha?
          </label>
        </div>
        <button type="submit" className="btn-login">
          Login
        </button>
        <p className="signup-link">
          Não tem conta? <a href="/cadastro">Cadastrar</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
