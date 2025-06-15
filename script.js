document.addEventListener("DOMContentLoaded", function () {
    // Select DOM Elements
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Load Tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Function to Add Task
    function addTask(taskText, save = true) {
        const trimmedTask = taskText.trim();
        if (trimmedTask === "") {
            alert("Please enter a task!");
            return;
        }

        // Create a new task item
        const listItem = document.createElement("li");
        listItem.textContent = trimmedTask;

        // Create a remove button
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.className = "remove-btn";

        // Remove task functionality
        removeButton.onclick = function () {
            taskList.removeChild(listItem);
            removeTaskFromStorage(trimmedTask);
        };

        // Append elements
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        // Save task to Local Storage
        if (save) {
            saveTaskToStorage(trimmedTask);
        }

        // Clear input field
        taskInput.value = "";
    }

    // Save Task to Local Storage
    function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        storedTasks.push(taskText);
        localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }

    // Remove Task from Local Storage
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }

    // Attach Event Listeners
    addButton.addEventListener("click", function () {
        addTask(taskInput.value);
    });

    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask(taskInput.value);
        }
    });

    // Load tasks on page load
    loadTasks();
});
