// Get references to the DOM elements
const todoList = document.getElementById('todo-list');
const newTodoInput = document.getElementById('new-todo');
const addTodoButton = document.getElementById('add-todo');

// Function to create a new list item for a task
function createTodoListItem(task) {
  const listItem = document.createElement('li');
  listItem.textContent = task.task;  // Access task from the object

  // Add a button to remove the task (explained later)
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.addEventListener('click', function() {
    todoList.removeChild(listItem);
  });
  listItem.appendChild(removeButton);
  return listItem;
  
  // Add a button to mark the task as complete
  const completeButton = document.createElement('button');
  completeButton.textContent = 'Mark Complete';
  completeButton.addEventListener('click', function() {
    // Add functionality to mark the task as complete (explained later)
	// Toggle the "completed" class on the list item
	 const todoIndex = [...listItem.parentElement.children].indexOf(listItem);  // Find task index
  storedTodos[todoIndex].completed = !storedTodos[todoIndex].completed;  // Toggle completed flag

  // Update local storage with the modified task
  localStorage.setItem('todos', JSON.stringify(storedTodos));

  // Toggle the "completed" class on the list item (unchanged)
  listItem.classList.toggle('completed');
  });
  listItem.appendChild(completeButton);
  
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', function() {
    // ... (code to handle editing)
	
	const taskToEdit = listItem.textContent.trim();  // Get the current task text
  const todoIndex = [...listItem.parentElement.children].indexOf(listItem);  // Find task index

  // Prompt user for the new task (using a modal or prompt box)
  const newTask = prompt("Edit Task:", taskToEdit);  // Replace with modal or prompt box

  if (newTask) {  // Check if user entered a new task
    storedTodos[todoIndex].task = newTask;  // Update task in storedTodos
    localStorage.setItem('todos', JSON.stringify(storedTodos));  // Update local storage
    listItem.textContent = newTask;  // Update list item text
  }
  
  });
  listItem.appendChild(editButton);

  
  // Set initial "completed" class based on task object
  if (task.completed) {
    listItem.classList.add('completed');
  }

  return listItem; 
}

// Load tasks from local storage on page load
const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
storedTodos.forEach(task => {
  const newTodoListItem = createTodoListItem(task);
  todoList.appendChild(newTodoListItem);
});

const storedTodos = [
  { task: "Buy groceries", completed: false },  // Object with task & completed flag
  { task: "Finish report", completed: true }    // Object with task & completed flag
];



// Add click event listener to the add button
addTodoButton.addEventListener('click', function() {
  // Get the value from the input field
  const newTask = newTodoInput.value.trim();
  // Check if the task is empty
  if (newTask) {
    const newTodoListItem = createTodoListItem(newTask);
    todoList.appendChild(newTodoListItem);
    // Clear the input field for the next task
    newTodoInput.value = '';
	
	// Get existing tasks from local storage (or initialize empty list)
    let storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    // Add the new task to the stored list
    storedTodos.push(newTask);
    // Update local storage with the updated list
    localStorage.setItem('todos', JSON.stringify(storedTodos));
  }  else {
    alert("Please enter a task!");
  }
});

const clearCompletedButton = document.getElementById('clear-completed');

clearCompletedButton.addEventListener('click', function() {
  // Get all list items
  const todoItems = document.querySelectorAll('#todo-list li');

  // Filter out completed tasks
  const incompleteTodos = Array.from(todoItems).filter(item => !item.classList.contains('completed'));

  // Clear the existing list
  todoList.innerHTML = '';

  // Add back the incomplete tasks
  incompleteTodos.forEach(item => todoList.appendChild(item));
});


const filterAllButton = document.getElementById('filter-all');
const filterIncompleteButton = document.getElementById('filter-incomplete');
const filterCompletedButton = document.getElementById('filter-completed');

// Function to filter tasks based on a criteria (explained later)
function filterTasks(criteria) {
  // ... (code to filter tasks based on criteria)
  const todoItems = document.querySelectorAll('#todo-list li');
  todoItems.forEach(item => {
    const taskIndex = [...item.parentElement.children].indexOf(item);
    const taskToShow = criteria(storedTodos[taskIndex]);
    item.style.display = taskToShow ? '' : 'none';  // Show/hide based on criteria
  });
}

filterAllButton.addEventListener('click', function() {
  filterTasks(() => true);  // Show all tasks
});

filterIncompleteButton.addEventListener('click', function() {
  filterTasks(task => !task.completed);  // Show incomplete tasks
});

filterCompletedButton.addEventListener('click', function() {
  filterTasks(task => task.completed);  // Show completed tasks
});


// core javascript code
const todoList = document.getElementById('todo-list');
const newTodoInput = document.getElementById('new-todo');
const addTodoButton = document.getElementById('add-todo');
const clearCompletedButton = document.getElementById('clear-completed');

// Function to create a new list item for a task
function createTodoListItem(task) {
  const listItem = document.createElement('li');
  listItem.textContent = task;

  // Checkbox to mark the task complete
  const completeCheckbox = document.createElement('input');
  completeCheckbox.type = 'checkbox';
  completeCheckbox.addEventListener('change', function() {
    listItem.classList.toggle('completed');
    updateLocalStorage();  // Update local storage on checkbox change
  });
  listItem.appendChild(completeCheckbox);

  return listItem;
}

// Function to update local storage with the current tasks
function updateLocalStorage() {
  const storedTodos = [];  // Empty array to store tasks
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
  newTodoListItem.classList.toggle('completed', task.completed);  // Set initial completion status
  todoList.appendChild(newTodoListItem);
});

// Add event listener for adding new tasks
addTodoButton.addEventListener('click', function() {
  const newTask = newTodoInput.value.trim();
  if (newTask) {
    const newTodoListItem = createTodoListItem(newTask);
    todoList.appendChild(newTodoListItem);
    newTodoInput.value = '';  // Clear input field after adding a task
    updateLocalStorage();  // Update local storage after adding a new task
  } else {
    alert("Please enter a task!");
  }
});

// Clear Completed Button functionality (optional)
clearCompletedButton.addEventListener('click', function() {
  const todoItems = document.querySelectorAll('#todo-list li');
  todoItems.forEach(item => {
    if (item.classList.contains('completed')) {
      item.remove();  // Remove completed tasks from the list
    }
  });
  updateLocalStorage();  // Update local storage after clearing completed tasks
});





function createTodoListItem(task) {
  const listItem = document.createElement('li');
  listItem.textContent = task;
  // Add a button to remove the task
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  // Add click event listener to the remove button
  removeButton.addEventListener('click', function() {
    todoList.removeChild(listItem);
  });
  listItem.appendChild(removeButton);
  return listItem;
}



 