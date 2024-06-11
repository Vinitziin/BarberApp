import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/AdminAgendamentos.css';

const AdminAgendamentos = () => {
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/agendamentos')
      .then(response => setAgendamentos(response.data))
      .catch(error => console.error('Error fetching agendamentos:', error));
  }, []);

  return (
    <div className="admin-agendamentos">
      <h1>Agendamentos</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Serviço</th>
            <th>Data</th>
            <th>Horário</th>
            <th>Profissional</th>
          </tr>
        </thead>
        <tbody>
          {agendamentos.map(agendamento => (
            <tr key={agendamento.id}>
              <td>{agendamento.id}</td>
              <td>{agendamento.servico}</td>
              <td>{new Date(agendamento.data).toLocaleDateString()}</td>
              <td>{agendamento.horario}</td>
              <td>{agendamento.profissional}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminAgendamentos;
