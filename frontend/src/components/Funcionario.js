import React, { useState, useEffect } from 'react';
import { fetchFuncionarios, addFuncionario, updateFuncionario, deleteFuncionario } from '../api';
import '../assets/css/Funcionario.css'; // Certifique-se de criar este arquivo CSS e ajustá-lo conforme necessário

const Funcionario = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [newFuncionario, setNewFuncionario] = useState({ id_usuario: '', contato: '', cargo: '' });
  const [editFuncionario, setEditFuncionario] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const getFuncionarios = async () => {
      const data = await fetchFuncionarios(token);
      setFuncionarios(data);
    };
    getFuncionarios();
  }, [token]);

  const handleAdd = async () => {
    await addFuncionario(newFuncionario, token);
    const data = await fetchFuncionarios(token);
    setFuncionarios(data);
    setNewFuncionario({ id_usuario: '', contato: '', cargo: '' });
  };

  const handleUpdate = async (id) => {
    await updateFuncionario(id, editFuncionario, token);
    const data = await fetchFuncionarios(token);
    setFuncionarios(data);
    setEditFuncionario(null);
  };

  const handleDelete = async (id) => {
    await deleteFuncionario(id, token);
    const data = await fetchFuncionarios(token);
    setFuncionarios(data);
  };

  return (
    <div className="funcionario-container">
      <h1>Gerenciar Funcionários</h1>
      <div className="form-group">
        <input
          type="text"
          placeholder="ID do Usuário"
          value={newFuncionario.id_usuario}
          onChange={(e) => setNewFuncionario({ ...newFuncionario, id_usuario: e.target.value })}
        />
        <input
          type="text"
          placeholder="Contato"
          value={newFuncionario.contato}
          onChange={(e) => setNewFuncionario({ ...newFuncionario, contato: e.target.value })}
        />
        <input
          type="text"
          placeholder="Cargo"
          value={newFuncionario.cargo}
          onChange={(e) => setNewFuncionario({ ...newFuncionario, cargo: e.target.value })}
        />
        <button onClick={handleAdd}>Adicionar Funcionário</button>
      </div>
      <div className="funcionario-list">
        {funcionarios.map((funcionario) => (
          <div key={funcionario.id} className="funcionario-item">
            {editFuncionario && editFuncionario.id === funcionario.id ? (
              <>
                <input
                  type="text"
                  value={editFuncionario.contato}
                  onChange={(e) => setEditFuncionario({ ...editFuncionario, contato: e.target.value })}
                />
                <input
                  type="text"
                  value={editFuncionario.cargo}
                  onChange={(e) => setEditFuncionario({ ...editFuncionario, cargo: e.target.value })}
                />
                <button onClick={() => handleUpdate(funcionario.id)}>Salvar</button>
              </>
            ) : (
              <>
                <span>{funcionario.id_usuario} - {funcionario.contato} - {funcionario.cargo}</span>
                <button onClick={() => setEditFuncionario(funcionario)}>Editar</button>
                <button onClick={() => handleDelete(funcionario.id)}>Excluir</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Funcionario;
