document.addEventListener('DOMContentLoaded', (event) => {
  const todoForm = document.getElementById('todoForm');

  todoForm.addEventListener('submit', e => {

  e.preventDefault();

  const todoTitle = e.target[0].value;

  window.electronAPIs.ipcRenderer.send('save-todo', {
    title: todoTitle,
    id: Date.now().toString(),
    completed: false
  });

  todoForm.reset();
})});
