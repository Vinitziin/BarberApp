import React, { useState, useEffect } from 'react';
import { getFuncionarios, addFuncionario, updateFuncionario, deleteFuncionario } from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/Funcionario.css';

const Funcionario = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [newFuncionario, setNewFuncionario] = useState({ id_usuario: '', contato: '', cargo: '' });
  const [editFuncionario, setEditFuncionario] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchFuncionarios = async () => {
      const data = await getFuncionarios(token);
      setFuncionarios(data);
    };
    fetchFuncionarios();
  }, [token]);

  const handleAdd = async () => {
    await addFuncionario(newFuncionario, token);
    const data = await getFuncionarios(token);
    setFuncionarios(data);
    setNewFuncionario({ id_usuario: '', contato: '', cargo: '' });
  };

  const handleUpdate = async (id) => {
    await updateFuncionario(id, editFuncionario, token);
    const data = await getFuncionarios(token);
    setFuncionarios(data);
    setEditFuncionario(null);
  };

  const handleDelete = async (id) => {
    await deleteFuncionario(id, token);
    const data = await getFuncionarios(token);
    setFuncionarios(data);
  };

  return (
    <div className="container funcionario-container">
      <h1 className="text-center mb-4">Gerenciar Funcionários</h1>
      <div className="form-group mb-4">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="ID do Usuário"
          value={newFuncionario.id_usuario}
          onChange={(e) => setNewFuncionario({ ...newFuncionario, id_usuario: e.target.value })}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Contato"
          value={newFuncionario.contato}
          onChange={(e) => setNewFuncionario({ ...newFuncionario, contato: e.target.value })}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Cargo"
          value={newFuncionario.cargo}
          onChange={(e) => setNewFuncionario({ ...newFuncionario, cargo: e.target.value })}
        />
        <button className="btn btn-primary" onClick={handleAdd}>Adicionar Funcionário</button>
      </div>
      <div className="funcionario-list">
        {funcionarios.map((funcionario) => (
          <div key={funcionario.id} className="funcionario-item p-2 mb-2">
            {editFuncionario && editFuncionario.id === funcionario.id ? (
              <>
                <input
                  type="text"
                  className="form-control mb-2"
                  value={editFuncionario.contato}
                  onChange={(e) => setEditFuncionario({ ...editFuncionario, contato: e.target.value })}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  value={editFuncionario.cargo}
                  onChange={(e) => setEditFuncionario({ ...editFuncionario, cargo: e.target.value })}
                />
                <button className="btn btn-success me-2" onClick={() => handleUpdate(funcionario.id)}>Salvar</button>
              </>
            ) : (
              <>
                <span>{funcionario.id_usuario} - {funcionario.contato} - {funcionario.cargo}</span>
                <button className="btn btn-warning me-2" onClick={() => setEditFuncionario(funcionario)}>Editar</button>
                <button className="btn btn-danger" onClick={() => handleDelete(funcionario.id)}>Excluir</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Funcionario;
