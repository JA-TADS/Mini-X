// Controlador responsável por gerenciar autenticação (login, cadastro e logout)
const AuthController = {
  // Lida com o login do usuário
  async handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorDiv = document.getElementById('login-error');
    errorDiv.textContent = '';
    try {
      // Chama o repositório para autenticar
      const res = await AuthRepository.login(email, password);
      // Salva token e dados do usuário no localStorage
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      // Redireciona para o feed
      ViewManager.renderFeed();
    } catch (err) {
      errorDiv.textContent = err.message || 'Erro ao fazer login';
    }
  },
  // Lida com o cadastro de novo usuário
  async handleRegister(e) {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const errorDiv = document.getElementById('register-error');
    errorDiv.textContent = '';
    try {
      // Chama o repositório para registrar
      const res = await AuthRepository.register(username, email, password);
      // Salva token e dados do usuário no localStorage
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      // Redireciona para o feed
      ViewManager.renderFeed();
    } catch (err) {
      errorDiv.textContent = err.message || 'Erro ao cadastrar';
    }
  },
  // Realiza logout do usuário
  handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    ViewManager.renderLogin();
  }
}; 