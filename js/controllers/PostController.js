// Controlador responsável por gerenciar as postagens
const PostController = {
  // Lida com a criação de um novo post
  async handleCreatePost(e) {
    e.preventDefault();
    const content = document.getElementById('post-content').value.trim();
    if (!content) return;
    try {
      await PostRepository.createPost(content);
      document.getElementById('post-content').value = '';
      PostController.loadPosts(); // Atualiza o feed
    } catch (err) {
      alert(err.message || 'Erro ao publicar');
    }
  },
  // Carrega todos os posts do feed
  async loadPosts() {
    try {
      const posts = await PostRepository.getPosts();
      PostController.renderPosts(posts, 'posts-list', false);
    } catch (err) {
      document.getElementById('posts-list').innerHTML = '<p>Erro ao carregar posts</p>';
    }
  },
  // Carrega apenas os posts do usuário logado
  async loadMyPosts() {
    try {
      const posts = await PostRepository.getMyPosts();
      PostController.renderPosts(posts, 'my-posts-list', true);
    } catch (err) {
      document.getElementById('my-posts-list').innerHTML = '<p>Erro ao carregar meus posts</p>';
    }
  },
  // Lida com a exclusão de um post
  async handleDeletePost(postId) {
    if (!confirm('Deseja deletar esta postagem?')) return;
    try {
      await PostRepository.deletePost(postId);
      PostController.loadMyPosts(); // Atualiza lista de posts do usuário
    } catch (err) {
      alert(err.message || 'Erro ao deletar');
    }
  },
  // Renderiza os posts no HTML
  renderPosts(posts, containerId, isMyPosts) {
    const container = document.getElementById(containerId);
    if (!posts.length) {
      container.innerHTML = '<p>Nenhuma postagem encontrada.</p>';
      return;
    }
    // Função auxiliar para formatar a data
    function formatDate(dateStr) {
      const d = new Date(dateStr);
      const dia = String(d.getDate()).padStart(2, '0');
      const mes = String(d.getMonth() + 1).padStart(2, '0');
      const ano = d.getFullYear();
      const hora = String(d.getHours()).padStart(2, '0');
      const min = String(d.getMinutes()).padStart(2, '0');
      return `${dia}/${mes}/${ano}, ${hora}:${min}`;
    }
    // Monta o HTML de cada post
    container.innerHTML = posts.map(post => {
      const initial = post.author.username.charAt(0).toUpperCase();
      const dateStr = formatDate(post.createdAt);
      return `
        <div class="post">
          <div class="post-header-flex">
            <div class="post-avatar-author">
              <span class="post-avatar">${initial}</span>
              <span class="post-author">@${post.author.username}</span>
            </div>
            <div class="post-date-btns">
              <span class="post-date">${dateStr}</span>
              ${isMyPosts ? `<button onclick=\"PostController.handleDeletePost('${post._id}')\">Deletar</button>` : ''}
            </div>
          </div>
          <div class="post-content-sep">
            <div class="post-content">${post.content}</div>
          </div>
        </div>
      `;
    }).join('');
  }
}; 