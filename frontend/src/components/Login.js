import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
import { useAuth } from '../contexts/AuthContext';
import logo from '../assets/images/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/Login.css';

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
    <div className="login-container d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="login-logo mb-4">
        <img src={logo} alt="Logo Barbearia Laguna" className="img-fluid" />
      </div>
      <form onSubmit={handleSubmit} className="login-form bg-light p-4 rounded shadow text-center w-100" style={{ maxWidth: '400px' }}>
        <h2 className="mb-4">LOGIN</h2>
        <div className="form-group mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            placeholder="Email"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="senha" className="form-label">Senha:</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="form-control"
            placeholder="Senha"
          />
        </div>
        <div className="form-check mb-3 text-start">
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
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
        <p className="signup-link mt-3">
          Não tem conta? <a href="/cadastro">Cadastrar</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
