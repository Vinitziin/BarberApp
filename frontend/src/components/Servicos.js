import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css//Servicos.css';  // Certifique-se de que o caminho está correto

const Servicos = () => {
  const [servicos, setServicos] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [duracao, setDuracao] = useState('');
  const [editing, setEditing] = useState(false);
  const [currentServico, setCurrentServico] = useState(null);

  useEffect(() => {
    fetchServicos();
  }, []);

  const fetchServicos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/servicos');
      setServicos(response.data);
    } catch (error) {
      console.error('Erro ao buscar serviços:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await updateServico(currentServico.id_servico);
    } else {
      await addServico();
    }
  };

  const addServico = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/servico', {
        descricao,
        preco,
        duracao,
      });
      setServicos([...servicos, response.data]);
      setDescricao('');
      setPreco('');
      setDuracao('');
    } catch (error) {
      console.error('Erro ao adicionar serviço:', error);
    }
  };

  const updateServico = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/servico/${id}`, {
        descricao,
        preco,
        duracao,
      });
      const updatedServicos = servicos.map((servico) =>
        servico.id_servico === id ? response.data : servico
      );
      setServicos(updatedServicos);
      setDescricao('');
      setPreco('');
      setDuracao('');
      setEditing(false);
      setCurrentServico(null);
    } catch (error) {
      console.error('Erro ao atualizar serviço:', error);
    }
  };

  const deleteServico = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/servico/${id}`);
      const updatedServicos = servicos.filter((servico) => servico.id_servico !== id);
      setServicos(updatedServicos);
    } catch (error) {
      console.error('Erro ao deletar serviço:', error);
    }
  };

  const editServico = (servico) => {
    setEditing(true);
    setCurrentServico(servico);
    setDescricao(servico.descricao);
    setPreco(servico.preco);
    setDuracao(servico.duracao);
  };

  return (
    <div className="servicos-container">
      <h2>Gerenciar Serviços</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Duração"
          value={duracao}
          onChange={(e) => setDuracao(e.target.value)}
          required
        />
        <button type="submit">{editing ? 'Atualizar' : 'Adicionar'} Serviço</button>
      </form>
      <ul>
        {servicos.map((servico) => (
          <li key={servico.id_servico}>
            {servico.descricao} - {servico.preco} - {servico.duracao}
            <div>
              <button onClick={() => editServico(servico)}>Editar</button>
              <button onClick={() => deleteServico(servico.id_servico)}>Deletar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Servicos;
