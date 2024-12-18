const API_URL = '/api/v1/tasks';
let currentTaskId = null; // To track the task being edited

// Fetch and render tasks
async function fetchTodos() {
    const response = await fetch(API_URL);
    const todos = await response.json();
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    todos.forEach(todo => {
        const row = document.createElement('tr');

        // Status
        const statusCell = document.createElement('td');
        statusCell.textContent = todo.status || 'Pending';
        row.appendChild(statusCell);

        // Title
        const titleCell = document.createElement('td');
        titleCell.textContent = todo.title || 'No Title';
        row.appendChild(titleCell);

        // Description
        const descriptionCell = document.createElement('td');
        descriptionCell.textContent = todo.description || 'No Description';
        row.appendChild(descriptionCell);

        /* Priority
        const priorityCell = document.createElement('td');
        priorityCell.textContent = todo.priority || 'Low';
        row.appendChild(priorityCell);

         */

        // Edit Button
        const editCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-button';
        editButton.onclick = () => openEditModal(todo);
        editCell.appendChild(editButton);
        row.appendChild(editCell);

        // Delete Button
        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = () => deleteTodo(todo.taskId);
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        todoList.appendChild(row);
    });
}

// Add a new task
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
            id: currentTaskId,
            title: title,
            description: 'Default description',
            status: 'Pending',
        }),
    });

    input.value = '';
    fetchTodos();
}



// Open edit modal with task details
function openEditModal(task) {
    const modal = document.getElementById('modal');
    document.getElementById('edit-title').value = task.title || '';
    document.getElementById('edit-description').value = task.description || '';
    //document.getElementById('edit-priority').value = task.priority || 'Low';
    document.getElementById('edit-status').value = task.status || 'Pending';
    currentTaskId = task.taskId; // Set the current task ID
    modal.classList.remove('hidden');
}

// Close modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.add('hidden');
}

// Save task (update)
async function saveTask(event) {
    event.preventDefault();
    const title = document.getElementById('edit-title').value.trim();
    const description = document.getElementById('edit-description').value.trim();
    //const priority = document.getElementById('edit-priority').value;
    const status = document.getElementById('edit-status').value.trim();
    if (!title) {
        alert('Title cannot be empty.');
        return;
    }

    await fetch(`${API_URL}/${currentTaskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            taskId: currentTaskId,
            title: title,
            description: description,
            //priority: priority,
            status: status,
        }),
    });

    closeModal();
    fetchTodos();
}

/// Delete task
//async function deleteTodo(id) {
//    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
//    fetchTodos();
//}

async function deleteTodo(id) {
    if (!id) {
        console.error("ID is undefined or null");
        return;
    }
    await fetch(`/api/v1/tasks/${id}`, { method: "DELETE" });
    fetchTodos();
}

// Initial load
fetchTodos();