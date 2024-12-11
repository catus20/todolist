window.onload = loadTasks;

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToDOM(task.text, task.completed));
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();
    if (!text) return;

    addTaskToDOM(text, false);
    saveTask(text, false);
    taskInput.value = "";
}

function addTaskToDOM(text, completed) {
    const taskList = document.getElementById("taskList");

    const li = document.createElement("li");
    li.textContent = text;
    li.className = completed ? "completed" : "";
    li.onclick = () => toggleTask(li);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Slett";
    deleteBtn.onclick = (e) => {
        e.stopPropagation();
        deleteTask(li);
    };

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

function toggleTask(taskElement) {
    taskElement.classList.toggle("completed");
    updateStorage();
}

function deleteTask(taskElement) {
    taskElement.style.opacity = "0";
    setTimeout(() => {
        taskElement.remove();
        updateStorage();
    }, 500);
}

function filterTasks() {
    const filter = document.getElementById("filter").value;
    const tasks = document.querySelectorAll("#taskList li");
    tasks.forEach(task => {
        const completed = task.classList.contains("completed");
        task.style.display =
            filter === "all" ||
            (filter === "completed" && completed) ||
            (filter === "uncompleted" && !completed) ? "" : "none";
    });
}

function saveTask(text, completed) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text, completed });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateStorage() {
    const tasks = Array.from(document.querySelectorAll("#taskList li"));
    const updatedTasks = tasks.map(task => ({
        text: task.firstChild.textContent.trim(),
        completed: task.classList.contains("completed")
    }));
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}
