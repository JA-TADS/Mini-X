// Aguarda o carregamento completo do DOM para iniciar a aplicação
// e renderizar a view inicial (login ou feed)
document.addEventListener('DOMContentLoaded', () => {
  ViewManager.renderInitialView();
}); 