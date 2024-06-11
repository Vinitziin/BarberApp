// src/api.js
const API_URL = 'http://localhost:5000/api';

export async function login(email, senha) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, senha }),
  });

  const data = await response.json();

  if (response.ok) {
    return data.token;
  } else {
    throw new Error(data.message || 'Login failed');
  }
}

export async function register(nome, email, senha) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nome, email, senha, role: 'cliente' }), // Inclua o papel como 'cliente' por padrão
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

// Funções para os serviços
export async function getServicos(token) {
  const response = await fetch(`${API_URL}/servicos`, {
    headers: {
      'x-access-token': token,
    },
  });
  return response.json();
}

export async function createServico(token, servico) {
  const response = await fetch(`${API_URL}/servicos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(servico),
  });
  return response.json();
}

export async function updateServico(token, id, servico) {
  const response = await fetch(`${API_URL}/servicos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(servico),
  });
  return response.json();
}

export async function deleteServico(token, id) {
  const response = await fetch(`${API_URL}/servicos/${id}`, {
    method: 'DELETE',
    headers: {
      'x-access-token': token,
    },
  });
  return response.json();
}

// Adicione outras funções de API conforme necessário
// endpoints para funcionários
export const fetchFuncionarios = async (token) => {
  const response = await fetch('http://localhost:5000/api/funcionarios', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  });
  return response.json();
};

export const addFuncionario = async (funcionario, token) => {
  const response = await fetch('http://localhost:5000/api/funcionario', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    body: JSON.stringify(funcionario)
  });
  return response.json();
};

export const updateFuncionario = async (id, funcionario, token) => {
  const response = await fetch(`http://localhost:5000/api/funcionario/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    body: JSON.stringify(funcionario)
  });
  return response.json();
};

export const deleteFuncionario = async (id, token) => {
  const response = await fetch(`http://localhost:5000/api/funcionario/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  });
  return response.json();
};
