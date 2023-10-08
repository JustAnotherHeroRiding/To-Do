const list = document.getElementById("taskList");
const addTaskBtn = document.getElementById("addTask");
const newTaskInput = document.getElementById("newTask");
const searchInput = document.getElementById("searchBar");
const searchForm = document.getElementById("searchForm");
const clearAll = document.getElementById("clearAll");

function getTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem("tasks");
  return storedTasks ? JSON.parse(storedTasks) : [];
}
function searchTasks(query) {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

  const results = tasks.filter((task) => task.toLowerCase().includes(query.toLowerCase()));

  return results;
}

function clearTasks() {
    localStorage.clear();
    list.innerHTML = "";
}

function getTasks(tasks) {
  list.innerHTML = "";

  tasks.forEach((task) => {
    const newListItem = document.createElement("li");
    const removeButton = document.createElement("button");
    removeButton.textContent = "delete_forever";
    removeButton.classList.add("material-symbols-outlined", "remove-btn");
    removeButton.addEventListener("click", () => {
      const taskIndex = tasks.indexOf(task);
      if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        newListItem.remove();
      }
    });
    newListItem.textContent = task;
    list.appendChild(newListItem);
    newListItem.appendChild(removeButton);
  });
}

function updateList() {
  const tasks = getTasksFromLocalStorage();

  newTaskInput.value = "";

  getTasks(tasks);
}

function updateSearchResults() {
  const tasks = searchTasks(searchInput.value);

  searchInput.value = "";

  getTasks(tasks);
}

addTaskBtn.addEventListener("click", () => {
  const tasks = getTasksFromLocalStorage();
  const newTask = newTaskInput.value;
  if (newTask !== "") {
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    updateList();
  }
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  updateSearchResults();
});


clearAll.addEventListener("click", () => {
    clearTasks();
})

updateList();
