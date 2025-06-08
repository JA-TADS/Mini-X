// Repositório responsável por operações de perfil de usuário via API
const UserRepository = {
  // Busca os dados do perfil do usuário logado
  async getProfile() {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/api/users/profile`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Erro ao carregar perfil');
    return data;
  },
  // Atualiza os dados do perfil do usuário
  async updateProfile(username, email) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/api/users/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ username, email })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Erro ao atualizar perfil');
    return data;
  }
}; 