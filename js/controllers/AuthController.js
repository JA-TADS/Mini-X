const AuthController = {
  async handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorDiv = document.getElementById('login-error');
    errorDiv.textContent = '';
    try {
      const res = await AuthRepository.login(email, password);
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      ViewManager.renderFeed();
    } catch (err) {
      errorDiv.textContent = err.message || 'Erro ao fazer login';
    }
  },
  async handleRegister(e) {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const errorDiv = document.getElementById('register-error');
    errorDiv.textContent = '';
    try {
      const res = await AuthRepository.register(username, email, password);
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      ViewManager.renderFeed();
    } catch (err) {
      errorDiv.textContent = err.message || 'Erro ao cadastrar';
    }
  },
  handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    ViewManager.renderLogin();
  }
}; 