const API_URL = '/api/v1/tasks';
let currentTaskId = null; // To track the task being edited

async function fetchTodos() {
    const response = await fetch(API_URL);
    const todos = await response.json();
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = todo.title || 'No Title';
        li.className = todo.completed ? 'completed' : '';

        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'Edit';
        toggleButton.onclick = () => openEditModal(todo);

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
    const title = input.value.trim();

    if (!title) {
        alert('Please enter a todo item.');
        return;
    }

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: title,
            status: 'PENDING' })
    });

    input.value = '';
    fetchTodos();
}

function openEditModal(task) {
    const modal = document.getElementById('modal');
    document.getElementById('edit-title').value = task.title || '';
    document.getElementById('edit-description').value = task.description || '';
    modal.classList.remove('hidden');
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.add('hidden');
}

function saveTask(event) {
    event.preventDefault();
    const title = document.getElementById('edit-title').value;
    const description = document.getElementById('edit-description').value;

    // Perform API call to save task
    console.log('Saving task:', { title, description });
    closeModal();
}

async function deleteTodo(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchTodos();
}

// Initial load
fetchTodos();