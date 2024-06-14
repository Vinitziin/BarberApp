import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getServicos, getFuncionarios, createAgendamento } from '../api';
import '../assets/css/Agendamento.css';

function Agendamento() {
  const [servicos, setServicos] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [selectedServico, setSelectedServico] = useState('');
  const [selectedFuncionario, setSelectedFuncionario] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('token');
      const servicos = await getServicos(token);
      const funcionarios = await getFuncionarios(token);
      setServicos(servicos);
      setFuncionarios(funcionarios);
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const id_usuario = localStorage.getItem('user_id'); // Supondo que o ID do usuário esteja salvo no localStorage

    const agendamento = {
      id_usuario,
      id_funcionario: selectedFuncionario,
      id_servico: selectedServico,
      data,
      hora
    };

    try {
      const response = await createAgendamento(token, agendamento);
      if (response.message) {
        alert(response.message);
        navigate('/');
      } else {
        alert('Erro ao criar agendamento');
      }
    } catch (error) {
      console.error('Error creating agendamento:', error);
      alert('Erro ao criar agendamento');
    }
  };

  return (
    <div className="agendamento-container">
      <h2>Agendar Serviço</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Serviço:</label>
          <select value={selectedServico} onChange={(e) => setSelectedServico(e.target.value)} required>
            <option value="">Selecione um serviço</option>
            {servicos.map((servico) => (
              <option key={servico.id_servico} value={servico.id_servico}>
                {servico.descricao}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Funcionário:</label>
          <select value={selectedFuncionario} onChange={(e) => setSelectedFuncionario(e.target.value)} required>
            <option value="">Selecione um funcionário</option>
            {funcionarios.map((funcionario) => (
              <option key={funcionario.id} value={funcionario.id}>
                {funcionario.cargo}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Data:</label>
          <input type="date" value={data} onChange={(e) => setData(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Hora:</label>
          <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} required />
        </div>
        <button type="submit">Agendar</button>
      </form>
    </div>
  );
}

export default Agendamento;
