// script.js

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const taskList = document.getElementById("taskList");

// Load existing tasks when page loads
window.onload = () => {
  taskList.innerHTML = ""; // clear old content
  tasks.forEach((task, index) => {
    renderTask(task, index);
  });
};

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (taskText === "") return;

  const task = { text: taskText, completed: false };
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTask(task, tasks.length - 1);
  input.value = "";
}

function renderTask(task, index) {
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;

  checkbox.onchange = () => {
    tasks[index].completed = checkbox.checked;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderAllTasks(); // update styling
  };

  const span = document.createElement("span");
  span.textContent = task.text;
  if (task.completed) {
    span.style.textDecoration = "line-through";
    span.style.color = "lightgray";
  }

  const delBtn = document.createElement("button");
  delBtn.textContent = "❌";
  delBtn.className = "delete-btn";
  delBtn.onclick = () => {
    tasks.splice(index, 1); // remove from array
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderAllTasks();
  };

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(delBtn);
  taskList.appendChild(li);
}

// Rerender full task list after delete/update
function renderAllTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => renderTask(task, index));
}
