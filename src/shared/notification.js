export function showErrorNotification(errText) {
  const errorContainer = document.createElement('div');
  errorContainer.textContent = errText;
  errorContainer.className = 'error-notification alert alert-danger';
  document.querySelector('body').append(errorContainer);
}
