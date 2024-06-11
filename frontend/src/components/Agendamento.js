import React, { useState, useEffect } from 'react';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import axios from 'axios';
import '../assets/css/Agendamento.css';

function Agendamento() {
  const [date, setDate] = useState(new Date());
  const [servico, setServico] = useState('');
  const [profissional, setProfissional] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [servicos, setServicos] = useState([]);
  const [profissionais, setProfissionais] = useState([]);

  useEffect(() => {
    // Fetch services from the backend
    axios.get('http://localhost:5000/api/servicos')
      .then(response => setServicos(response.data))
      .catch(error => console.error('Error fetching services:', error));

    // Fetch professionals from the backend
    axios.get('http://localhost:5000/api/funcionarios')
      .then(response => {
        console.log(response.data); // Adicione este log para verificar os dados
        setProfissionais(response.data);
      })
      .catch(error => console.error('Error fetching professionals:', error));
  }, []);

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/agendamentos', {
        servico,
        data: date,
        profissional,
      });
      setMensagem('Agendamento realizado com sucesso!');
    } catch (error) {
      setMensagem('Erro ao realizar agendamento. Tente novamente.');
    }
  };

  return (
    <div className="agendamento-container">
      <h2>AGENTE AGORA</h2>
      <form onSubmit={handleSubmit}>
        <label>Serviço:</label>
        <select value={servico} onChange={(e) => setServico(e.target.value)} required>
          <option value="">Selecione um serviço</option>
          {servicos.map(s => (
            <option key={s.id} value={s.descricao}>{s.descricao}</option>
          ))}
        </select>

        <label>Data e Horário:</label>
        <DateTimePicker
          onChange={handleDateChange}
          value={date}
          format="dd/MM/yyyy HH:mm"
          className="datetime-picker"
          required
        />

        <label>Profissional:</label>
        <select value={profissional} onChange={(e) => setProfissional(e.target.value)} required>
          <option value="">Selecione um profissional</option>
          {profissionais.map(p => (
            <option key={p.id} value={p.id}>{p.cargo}</option>
          ))}
        </select>

        <input type="submit" value="AGENDAR AQUI" />
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default Agendamento;
