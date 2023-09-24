document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task-input");
    const addTaskButton = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");

    // Load tasks from local storage on page load
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const taskItem = document.createElement("div");
            taskItem.classList.add("task-item");
            taskItem.innerHTML = `
                <span>${task}</span>
                <button class="edit" data-index="${index}"><i class="fas fa-edit"></i></button>
                <button class="delete" data-index="${index}"><i class="fas fa-trash"></i></button>
            `;
            taskList.appendChild(taskItem);
        });
    }

    // Add task to the list
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push(taskText);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            taskInput.value = "";
            renderTasks();
        }
    }

    // Edit task
    function editTask(index) {
        const newTaskText = prompt("Edit task:", tasks[index]);
        if (newTaskText !== null) {
            tasks[index] = newTaskText;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        }
    }

    // Delete task
    function deleteTask(index) {
        if (confirm("Are you sure you want to delete this task?")) {
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        }
    }

    // Event listeners
    addTaskButton.addEventListener("click", addTask);
    taskList.addEventListener("click", (e) => {
        if (e.target.closest(".edit")) {
            const index = e.target.closest(".edit").getAttribute("data-index");
            editTask(index);
        } else if (e.target.closest(".delete")) {
            const index = e.target.closest(".delete").getAttribute("data-index");
            deleteTask(index);
        }
    });

    // Initial render
    renderTasks();
});
