// Repositório responsável por autenticação (login e cadastro) via API
const API_URL = 'https://mini-twitter-api-vy9q.onrender.com';

const AuthRepository = {
  // Realiza login do usuário
  async login(email, password) {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Erro ao fazer login');
    return data;
  },
  // Realiza cadastro de novo usuário
  async register(username, email, password) {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Erro ao cadastrar');
    return data;
  }
}; 