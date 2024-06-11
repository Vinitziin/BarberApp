import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/Usuarios.css';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/usuarios')
      .then(response => {
        console.log('API response:', response.data); // Adicione este console.log para verificar os dados recebidos
        setUsuarios(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the users!", error);
      });
  }, []);

  return (
    <div className="usuarios-container">
      <h1>Gerenciamento de Usuários</h1>
      <table className="usuarios-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuario => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nome}</td>
              <td>{usuario.email}</td>
              <td>{usuario.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Usuarios;
