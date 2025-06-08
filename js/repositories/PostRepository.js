// Repositório responsável por operações de postagens via API
const PostRepository = {
  // Cria um novo post
  async createPost(content) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ content })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Erro ao publicar');
    return data;
  },
  // Busca todos os posts do feed
  async getPosts() {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/api/posts`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Erro ao carregar posts');
    // Ordena do mais recente para o mais antigo
    return data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },
  // Busca apenas os posts do usuário logado
  async getMyPosts() {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/api/posts/my-posts`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Erro ao carregar meus posts');
    return data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },
  // Deleta um post pelo ID
  async deletePost(postId) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/api/posts/${postId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Erro ao deletar');
    return data;
  }
}; 