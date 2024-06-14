import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/AdminAgendamentos.css';

const AdminAgendamentos = () => {
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5000/api/agendamentos', {
          headers: {
            'x-access-token': token,
          },
        });
        setAgendamentos(response.data);
      } catch (error) {
        console.error('Error fetching agendamentos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="admin-agendamentos container">
      <h1 className="text-center mb-4">Agendamentos</h1>
      <table className="table table-striped table-hover">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Serviço</th>
            <th>Data</th>
            <th>Horário</th>
            <th>Profissional</th>
          </tr>
        </thead>
        <tbody>
          {agendamentos.map((agendamento) => (
            <tr key={agendamento.id_agendamento}>
              <td>{agendamento.id_agendamento}</td>
              <td>{agendamento.servico_descricao}</td>
              <td>{new Date(agendamento.data).toLocaleDateString()}</td>
              <td>{agendamento.hora}</td>
              <td>{agendamento.funcionario_nome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminAgendamentos;
