// Verify ipcRenderer availability
if (window.electronAPIs && window.electronAPIs.ipcRenderer) {
  window.electronAPIs.ipcRenderer.on('fetch-todos', (event, todos) => {
    // render the todos in HTML
    console.log(todos);

    const todoItems = todos.reduce(
      (prevValue, currentValue) => {
        return prevValue + `<li class="list-group-item">${currentValue.title}
        <input type="checkbox" id="${currentValue.id}" class="finish-todo">
        </li>`
    }, '')

    const todoList = document.getElementById('todo_list')

    todoList.innerHTML = todoItems

    const finishTodo = e => {
      // alert(`checkbox clicked! with id ${e.target.id}`);
      window.electronAPIs.ipcRenderer.send('update-todo', e.target.id);
    }

    document.querySelectorAll('.finish-todo').forEach(element => {
      element.addEventListener('click', finishTodo);
    })

  });

} else {
  console.error('ipcRenderer is not defined.');
}