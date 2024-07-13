document.addEventListener('DOMContentLoaded', () => {
  const columns = document.querySelectorAll('.column');

  columns.forEach(column => {
      column.addEventListener('dragover', dragOver);
      column.addEventListener('dragenter', dragEnter);
      column.addEventListener('dragleave', dragLeave);
      column.addEventListener('drop', dragDrop);
  });
});

function openTaskModal() {
  document.getElementById('taskModal').style.display = 'block';
}

function closeTaskModal() {
  document.getElementById('taskModal').style.display = 'none';
}

function openEditTaskModal(task) {
  document.getElementById('editTaskModal').style.display = 'block';
  document.getElementById('edit-task-title').value = task.querySelector('strong').textContent;
  document.getElementById('edit-task-description').value = task.querySelector('p').textContent;
  document.getElementById('editTaskForm').setAttribute('data-task-id', task.id);
}

function closeEditTaskModal() {
  document.getElementById('editTaskModal').style.display = 'none';
}

function addTask(event) {
  event.preventDefault();
  const title = document.getElementById('task-title').value;
  const description = document.getElementById('task-description').value;
  const taskId = 'task-' + Date.now();

  const task = document.createElement('div');
  task.classList.add('task');
  task.setAttribute('draggable', 'true');
  task.setAttribute('id', taskId);
  task.innerHTML = `<strong>${title}</strong><p>${description}</p>
                    <button class="edit-button" onclick="openEditTaskModal(document.getElementById('${taskId}'))">Edit</button>`;
  task.addEventListener('dragstart', dragStart);
  task.addEventListener('dragend', dragEnd);

  document.getElementById('todo').appendChild(task);
  closeTaskModal();
  document.getElementById('taskForm').reset(); // Reset the form
  return false;
}

function editTask(event) {
  event.preventDefault();
  const taskId = document.getElementById('editTaskForm').getAttribute('data-task-id');
  const title = document.getElementById('edit-task-title').value;
  const description = document.getElementById('edit-task-description').value;

  const task = document.getElementById(taskId);
  task.querySelector('strong').textContent = title;
  task.querySelector('p').textContent = description;

  closeEditTaskModal();
  return false;
}

function dragStart(event) {
  event.dataTransfer.setData('text', event.target.id);
  setTimeout(() => this.style.display = 'none', 0);
}

function dragEnd() {
  setTimeout(() => this.style.display = 'block', 0);
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.style.backgroundColor = '#f0f0f0';
}

function dragLeave() {
  this.style.backgroundColor = '#ffffff';
}

function dragDrop(e) {
  e.preventDefault();
  this.style.backgroundColor = '#ffffff';
  const data = e.dataTransfer.getData('text');
  const draggedTask = document.getElementById(data) || document.querySelector('.task[style="display: none;"]');
  if (draggedTask) {
      this.appendChild(draggedTask);
  }
}
