import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api';
import logo from '../assets/images/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/Cadastro.css';

function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }
    try {
      const response = await register(nome, email, senha);
      console.log(response);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="cadastro-container d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="cadastro-logo mb-4">
        <img src={logo} alt="Logo Barbearia Laguna" className="img-fluid" />
      </div>
      <form onSubmit={handleSubmit} className="cadastro-form bg-light p-4 rounded shadow text-center w-100" style={{ maxWidth: '400px' }}>
        <h2 className="mb-4">CADASTRO</h2>
        <div className="form-group mb-3">
          <label htmlFor="nome" className="form-label">Nome Completo:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="form-control"
            placeholder="Nome Completo"
          />
        </div>
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
        <div className="form-group mb-3">
          <label htmlFor="confirmarSenha" className="form-label">Confirmar Senha:</label>
          <input
            type="password"
            id="confirmarSenha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            className="form-control"
            placeholder="Confirmar Senha"
          />
        </div>
        <div className="form-check mb-3 text-start">
          <input type="checkbox" className="form-check-input" id="rememberMe" />
          <label className="form-check-label" htmlFor="rememberMe">
            Lembrar senha?
          </label>
        </div>
        <div className="form-check mb-3 text-start">
          <input type="checkbox" className="form-check-input" id="terms" />
          <label className="form-check-label" htmlFor="terms">
            Eu li e <a href="/termos">concordo com os termos de uso</a>
          </label>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Cadastrar
        </button>
        <p className="signin-link mt-3">
          Já tem uma conta? <a href="/login">Acessar</a>
        </p>
      </form>
    </div>
  );
}

export default Cadastro;
