const ProfileController = {
  async loadProfile() {
    try {
      const user = await UserRepository.getProfile();
      document.getElementById('profile-info').innerHTML = `
        <p><b>Usuário:</b> @${user.username}</p>
        <p><b>Email:</b> ${user.email}</p>
        <p><b>Criado em:</b> ${new Date(user.createdAt).toLocaleDateString('pt-BR')}</p>
      `;
      document.getElementById('edit-username').value = user.username;
      document.getElementById('edit-email').value = user.email;
    } catch (err) {
      document.getElementById('profile-info').innerHTML = '<p>Erro ao carregar perfil</p>';
    }
  },
  async handleEditProfile(e) {
    e.preventDefault();
    const username = document.getElementById('edit-username').value;
    const email = document.getElementById('edit-email').value;
    const errorDiv = document.getElementById('edit-profile-error');
    errorDiv.textContent = '';
    try {
      const res = await UserRepository.updateProfile(username, email);
      localStorage.setItem('user', JSON.stringify(res.user));
      alert('Perfil atualizado com sucesso!');
      ProfileController.loadProfile();
    } catch (err) {
      errorDiv.textContent = err.message || 'Erro ao atualizar perfil';
    }
  }
}; 