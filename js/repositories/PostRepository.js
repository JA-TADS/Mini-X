const PostRepository = {
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
  async getMyPosts() {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/api/posts/my-posts`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Erro ao carregar meus posts');
    return data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },
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