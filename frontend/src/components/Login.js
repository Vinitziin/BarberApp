import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
import { useAuth } from '../contexts/AuthContext';
import '../assets/css/Login.css';
import logo from '../assets/images/logo.png';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberMe');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await login(email, senha);
      authLogin(token);

      if (rememberMe) {
        localStorage.setItem('rememberMe', email);
      } else {
        localStorage.removeItem('rememberMe');
      }

      const userRole = JSON.parse(atob(token.split('.')[1])).role;
      if (userRole === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Credenciais inválidas!');
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
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="form-input"
            placeholder="Senha"
          />
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
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
