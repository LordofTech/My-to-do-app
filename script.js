// Get references to DOM elements
const todoList = document.getElementById('todo-list');
const newTodoInput = document.getElementById('new-todo');
const addTodoButton = document.getElementById('add-todo');
const clearCompletedButton = document.getElementById('clear-completed');
const filterAllButton = document.getElementById('filter-all');
const filterIncompleteButton = document.getElementById('filter-incomplete');
const filterCompletedButton = document.getElementById('filter-completed');

// Function to create a new list item for a task
function createTodoListItem(task) {
  const listItem = document.createElement('li');
  listItem.textContent = task;

  // Checkbox to mark the task complete
  const completeCheckbox = document.createElement('input');
  completeCheckbox.type = 'checkbox';
  completeCheckbox.addEventListener('change', function() {
    listItem.classList.toggle('completed');
    updateLocalStorage(); // Update local storage on checkbox change
  });
  listItem.appendChild(completeCheckbox);

  // Button to remove the task
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.addEventListener('click', function() {
    todoList.removeChild(listItem);
    updateLocalStorage(); // Update local storage after removing a task
  });
  listItem.appendChild(removeButton);

  return listItem;
}

// Function to update local storage with the current tasks
function updateLocalStorage() {
  const storedTodos = [];
  const todoItems = document.querySelectorAll('#todo-list li');

  todoItems.forEach(item => {
    storedTodos.push({
      task: item.textContent.trim(),
      completed: item.classList.contains('completed')
    });
  });

  localStorage.setItem('todos', JSON.stringify(storedTodos));
}

// Load tasks from local storage on page load
const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
storedTodos.forEach(task => {
  const newTodoListItem = createTodoListItem(task.task);
  newTodoListItem.classList.toggle('completed', task.completed); // Set initial completion status
  todoList.appendChild(newTodoListItem);
});

// Add event listener for adding new tasks
addTodoButton.addEventListener('click', function() {
  const newTask = newTodoInput.value.trim();
  if (newTask) {
    const newTodoListItem = createTodoListItem(newTask);
    todoList.appendChild(newTodoListItem);
    newTodoInput.value = ''; // Clear input field after adding a task
    updateLocalStorage(); // Update local storage after adding a new task
  } else {
    alert("Please enter a task!");
  }
});

// Clear Completed Button functionality
clearCompletedButton.addEventListener('click', function() {
  const todoItems = document.querySelectorAll('#todo-list li');
  todoItems.forEach(item => {
    if (item.classList.contains('completed')) {
      item.remove();
    }
  });
  updateLocalStorage(); // Update local storage after clearing completed tasks
});

// Function to handle editing a task (using a modal)
function editTask(listItem) {
  const taskToEdit = listItem.textContent.trim();
  const newTask = prompt("Edit Task:", taskToEdit); // Replace with modal UI (if desired)

  if (newTask) {
    const todoIndex = [...listItem.parentElement.children].indexOf(listItem);
    storedTodos[todoIndex].task = newTask;
    localStorage.setItem('todos', JSON.stringify(storedTodos));
    listItem.textContent = newTask;
  }
}

// Add click event listener to each list item for editing
const todoItems = document.querySelectorAll('#todo-list li');
todoItems.forEach(item => {
  item.addEventListener('dblclick', function() { // Edit on double click
    editTask(item);
  });
});

// Function to filter tasks based on completion status
function filterTasks(criteria) {
  const todoItems = document.querySelectorAll('#todo-list li');
  todoItems.forEach(item => {
    const taskIndex = [...item.parentElement.children].indexOf(item);
    const taskToShow = criteria(storedTodos[taskIndex]);
    item.style.display = taskToShow ? '' : 'none'; // Show/hide based on criteria
  });
}
