// completed.js

// Get completed tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let completedTasks = tasks.filter(task => task.completed); // only completed

const list = document.getElementById("completedList");

completedTasks.forEach(task => {
  const li = document.createElement("li");
  li.textContent = task.text;
  list.appendChild(li);
});

// Reset All button: clears all tasks and refreshes page
function resetTasks() {
  localStorage.removeItem("tasks");
  location.reload();
}
