import React, { useState } from 'react';
import { register } from '../api';
import '../assets/css/Cadastro.css'; // Importando o arquivo CSS
import logo from '../assets/images/logo.png'; // Importando a logo diretamente

function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(nome, email, senha);
      console.log(response);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-logo">
        <img src={logo} alt="Logo Barbearia Laguna" />
      </div>
      <form onSubmit={handleSubmit} className="cadastro-form">
        <h2>CADASTRO</h2>
        <div className="form-group">
          <label>Nome Completo:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="form-input"
            placeholder="Nome Completo"
          />
        </div>
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
          <input type="checkbox" className="form-check-input" id="rememberMe" />
          <label className="form-check-label" htmlFor="rememberMe">
            Lembrar senha?
          </label>
        </div>
        <div className="form-group form-check">
          <input type="checkbox" className="form-check-input" id="terms" />
          <label className="form-check-label" htmlFor="terms">
            Eu li e <a href="/termos">concordo com os termos de uso</a>
          </label>
        </div>
        <button type="submit" className="btn-cadastro">
          Cadastrar
        </button>
        <p className="signin-link">
          Já tem uma conta? <a href="/login">Acessar</a>
        </p>
      </form>
    </div>
  );
}

export default Cadastro;
