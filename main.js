const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const saveButton = document.getElementById('saveButton');
const taskList = document.getElementById('taskList');

// Создание элемента задачи с кнопкой удаления
function createTaskElement(text) {
  const taskItem = document.createElement('div');
  taskItem.className = 'task-item'; 

  const taskTextSpan = document.createElement('span');
  taskTextSpan.textContent = text;

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = '×';
  deleteBtn.title = 'Удалить задачу';

  deleteBtn.addEventListener('click', () => {
    taskItem.remove();
    saveTasks();
  });

  taskItem.appendChild(taskTextSpan);
  taskItem.appendChild(deleteBtn);
  taskList.appendChild(taskItem);
}
// Загрузка задач при старте
function loadTasks() {
  const savedTasks = localStorage.getItem('taskList');
  if (savedTasks) {
    const tasks = JSON.parse(savedTasks);
    tasks.forEach(taskText => {
      createTaskElement(taskText);
    });
  }
}

// Добавление новой задачи
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;
  createTaskElement(taskText);
  taskInput.value = '';
}

// Сохранение списка
function saveTasks() {
  const tasks = Array.from(taskList.children).map(item => {
    return item.querySelector('span').textContent;
  });
  localStorage.setItem('taskList', JSON.stringify(tasks));
  alert('Список сохранён!');
}

// Обработчики
addButton.addEventListener('click', addTask);
saveButton.addEventListener('click', saveTasks);

taskInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') addTask();
});

// Загрузка при старте
loadTasks();