const API_URL = 'http://localhost:5000/api';

export async function login(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (response.ok) {
    return data.token;
  } else {
    throw new Error(data.message || 'Login failed');
  }
}

export async function register(nome, email, password) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nome, email, password }),
  });
  return response.json();
}

export async function getAgendamentos(token) {
  const response = await fetch(`${API_URL}/agendamentos`, {
    headers: {
      'x-access-token': token,
    },
  });
  return response.json();
}

export async function createAgendamento(token, agendamento) {
  const response = await fetch(`${API_URL}/agendamento`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(agendamento),
  });
  return response.json();
}

// Adicione outras funções de API conforme necessário
