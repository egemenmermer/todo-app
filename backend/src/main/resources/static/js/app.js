const API_URL = '/api/v1/tasks';

async function fetchTodos() {
    const response = await fetch(API_URL);
    const todos = await response.json();
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = todo.text;
        li.className = todo.completed ? 'completed' : '';

        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'Toggle';
        toggleButton.onclick = () => toggleTodo(todo.id);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTodo(todo.id);

        li.appendChild(toggleButton);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    });
}

async function addTodo() {
    const input = document.getElementById('new-todo');
    const text = input.value.trim();
    if (!text) return;

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: text,          // Title field
            description: text,       // Default description
            priority: 0,           // Default priority
            status: 'PENDING'      // Default status
        })
    });

    input.value = '';
    fetchTodos();
}

async function toggleTodo(id) {
    await fetch(`${API_URL}/${id}`, { method: 'PUT' });
    fetchTodos();
}

async function deleteTodo(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchTodos();
}

fetchTodos();