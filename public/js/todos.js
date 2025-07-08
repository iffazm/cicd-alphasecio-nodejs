const token = localStorage.getItem('token');
const todoList = document.getElementById('todoList');
const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const logoutBtn = document.getElementById('logout');

if (!token) {
  alert('You must login first!');
  window.location.href = '/login.html';
}

const api = '/api/todos';

function fetchTodos() {
  fetch(api, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(data => renderTodos(data))
    .catch(err => alert('Error loading todos'));
}

function renderTodos(todos) {
  todoList.innerHTML = '';
  todos.forEach(todo => {
    const div = document.createElement('div');
    div.className = 'todo-item';

    const input = document.createElement('input');
    input.type = 'text';
    input.value = todo.text;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.done;

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.onclick = () => updateTodo(todo.id, input.value, checkbox.checked);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteTodo(todo.id);

    div.appendChild(checkbox);
    div.appendChild(input);
    div.appendChild(saveBtn);
    div.appendChild(deleteBtn);
    todoList.appendChild(div);
  });
}

function updateTodo(id, text, done) {
  fetch(`${api}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ text, done })
  }).then(fetchTodos);
}

function deleteTodo(id) {
  fetch(`${api}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(fetchTodos);
}

todoForm.addEventListener('submit', e => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (!text) return;
  fetch(api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ text })
  }).then(() => {
    todoInput.value = '';
    fetchTodos();
  });
});

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = '/login.html';
});

// Load todos on start
fetchTodos();
