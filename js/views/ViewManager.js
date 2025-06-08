// Gerencia as views/telas da aplicação SPA
const ViewManager = {
  // Renderiza a tela inicial (login ou feed, dependendo do token)
  renderInitialView() {
    const token = localStorage.getItem('token');
    if (token) {
      this.renderFeed();
    } else {
      this.renderLogin();
    }
  },
  // Renderiza a tela de login
  renderLogin() {
    document.getElementById('app').innerHTML = `
      <div class="login-container">
        <h2>Entrar</h2>
        <form id="login-form">
          <input type="email" id="login-email" placeholder="Email" required />
          <input type="password" id="login-password" placeholder="Senha" required />
          <button type="submit">Entrar</button>
          <p>Não tem conta? <a href="#" id="to-register">Cadastre-se</a></p>
          <div id="login-error" style="color:red;"></div>
        </form>
      </div>
    `;
    // Troca para tela de cadastro
    document.getElementById('to-register').onclick = (e) => {
      e.preventDefault();
      this.renderRegister();
    };
    // Submete o formulário de login
    document.getElementById('login-form').onsubmit = AuthController.handleLogin;
  },
  // Renderiza a tela de cadastro
  renderRegister() {
    document.getElementById('app').innerHTML = `
      <div class="login-container">
        <h2>Criar Conta</h2>
        <form id="register-form">
          <input type="text" id="register-username" placeholder="Usuário" required />
          <input type="email" id="register-email" placeholder="Email" required />
          <input type="password" id="register-password" placeholder="Senha" required />
          <button type="submit">Cadastrar</button>
          <p>Já tem conta? <a href="#" id="to-login">Entrar</a></p>
          <div id="register-error" style="color:red;"></div>
        </form>
      </div>
    `;
    // Troca para tela de login
    document.getElementById('to-login').onclick = (e) => {
      e.preventDefault();
      this.renderLogin();
    };
    // Submete o formulário de cadastro
    document.getElementById('register-form').onsubmit = AuthController.handleRegister;
  },
  // Renderiza o feed principal
  renderFeed() {
    const user = JSON.parse(localStorage.getItem('user'));
    const initial = user ? user.username.charAt(0).toUpperCase() : '?';
    document.getElementById('app').innerHTML = `
      <nav>
        <div style="display:flex;align-items:center;gap:8px;">
          <button id="to-feed" class="nav-home-btn">
            <span class="nav-home-icon" aria-label="Página inicial">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 10.5L12 4L21 10.5V19C21 19.8284 20.3284 20.5 19.5 20.5H4.5C3.67157 20.5 3 19.8284 3 19V10.5Z" stroke="#1da1f2" stroke-width="2"/>
                <path d="M9 20.5V14.5H15V20.5" stroke="#1da1f2" stroke-width="2"/>
              </svg>
            </span>
            Feed
          </button>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button id="to-profile" class="nav-avatar-btn">
            <span class="nav-avatar">${initial}</span>
          </button>
        </div>
      </nav>
      <section id="new-post-section">
        <form id="post-form">
          <textarea id="post-content" maxlength="280" placeholder="O que está acontecendo?" required></textarea>
          <button type="submit">Publicar</button>
        </form>
      </section>
      <section>
        <div id="posts-list"></div>
      </section>
    `;
    // Botão para ir ao perfil
    document.getElementById('to-profile').onclick = () => this.renderProfile();
    // Botão para recarregar o feed
    document.getElementById('to-feed').onclick = () => this.renderFeed();
    // Submete o formulário de novo post
    document.getElementById('post-form').onsubmit = PostController.handleCreatePost;
    // Carrega os posts do feed
    PostController.loadPosts();
  },
  // Renderiza a tela de perfil do usuário
  renderProfile() {
    const user = JSON.parse(localStorage.getItem('user'));
    const initial = user ? user.username.charAt(0).toUpperCase() : '?';
    document.getElementById('app').innerHTML = `
      <nav>
        <div style="display:flex;align-items:center;gap:8px;">
          <button id="to-feed" class="nav-home-btn">
            <span class="nav-home-icon" aria-label="Página inicial">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 10.5L12 4L21 10.5V19C21 19.8284 20.3284 20.5 19.5 20.5H4.5C3.67157 20.5 3 19.8284 3 19V10.5Z" stroke="#1da1f2" stroke-width="2"/>
                <path d="M9 20.5V14.5H15V20.5" stroke="#1da1f2" stroke-width="2"/>
              </svg>
            </span>
            Feed
          </button>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button id="to-profile" class="nav-avatar-btn">
            <span class="nav-avatar">${initial}</span>
          </button>
        </div>
      </nav>
      <div class="profile-container">
        <section>
          <div class="profile-header">
            <h2>Meu Perfil</h2>
            <button id="logout" class="logout-btn">Sair</button>
          </div>
          <div id="profile-info"></div>
          <form id="edit-profile-form">
            <input type="text" id="edit-username" placeholder="Novo usuário" required />
            <input type="email" id="edit-email" placeholder="Novo email" required />
            <button type="submit">Atualizar Perfil</button>
            <div id="edit-profile-error" style="color:red;"></div>
          </form>
          <h3>Minhas Postagens</h3>
          <div id="my-posts-list"></div>
        </section>
      </div>
    `;
    // Botão de logout
    document.getElementById('logout').onclick = AuthController.handleLogout;
    // Botão para voltar ao feed
    document.getElementById('to-feed').onclick = () => this.renderFeed();
    // Botão para recarregar o perfil
    document.getElementById('to-profile').onclick = () => this.renderProfile();
    // Submete o formulário de edição de perfil
    document.getElementById('edit-profile-form').onsubmit = ProfileController.handleEditProfile;
    // Carrega dados do perfil e posts do usuário
    ProfileController.loadProfile();
    PostController.loadMyPosts();
  }
}; 