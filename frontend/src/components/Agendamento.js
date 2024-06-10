import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import '../assets/css/Agendamento.css';

function Agendamento() {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('10:00');

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleTimeChange = (time) => {
    setTime(time);
  };

  return (
    <div className="agendamento-container">
      <h2>AGENTE AGORA</h2>
      <form>
        <label>Serviço:</label>
        <select>
          <option>Serviço 1</option>
          <option>Serviço 2</option>
          <option>Serviço 3</option>
        </select>

        <label>Data:</label>
        <DatePicker selected={date} onChange={handleDateChange} dateFormat="dd/MM/yyyy" />

        <label>Horário:</label>
        <TimePicker onChange={handleTimeChange} value={time} />

        <label>Profissional:</label>
        <select>
          <option>Profissional 1</option>
          <option>Profissional 2</option>
          <option>Profissional 3</option>
        </select>

        <input type="submit" value="AGENDAR AQUI" />
      </form>
    </div>
  );
}

export default Agendamento;
