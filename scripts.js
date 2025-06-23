const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const clearTasksButton = document.getElementById("clearTasks");
const taskDueDate = document.getElementById("dueDateInput");
const taskDueTime = document.getElementById("dueTimeInput");
const taskTemplate = document.getElementById("taskTemplate");
const taskDescriptionInput = document.getElementById("taskDiscription");

const addTask = () => {
    const taskText = taskInput.value.trim();
    const description = taskDescriptionInput.value.trim();
    const dueDate = taskDueDate.value;
    const dueTime = taskDueTime.value;
    if (taskText === "") {
        alert("You must add a task mf!");
        return;
    }

    const clone = taskTemplate.content.cloneNode(true);
    clone.querySelector(".taskText").textContent = taskText;
    clone.querySelector(".taskDescription").textContent = description;
    clone.querySelector(".taskDueDate").textContent = dueDate;
    clone.querySelector(".taskDueTime").textContent = "at " + dueTime;

    const deleteButton = clone.querySelector(".deleteTaskButton");
    const taskMain = clone.querySelector(".taskMain");
    const taskDetails = clone.querySelector(".taskDetails");
    const taskItem = clone.querySelector(".taskItem");
    const toggleIcon = clone.querySelector(".toggleIcon"); // Get the icon

    const listItem = document.createElement("li");
    listItem.appendChild(clone);
    taskList.appendChild(listItem);

    deleteButton.onclick = (e) => {
        e.stopPropagation();
        listItem.remove();
    };


    taskMain.addEventListener('click', () => {
        if (taskDetails.style.display === "none") {
            taskDetails.style.display = "block";
            if (toggleIcon) toggleIcon.textContent = "↑"; 
            taskItem.style.borderColor = '#007bff';
            taskItem.style.boxShadow = '0 0 8px rgba(0,123,255,0.2)';
            deleteButton.style.opacity = '1';
        } else {
            taskDetails.style.display = "none";
            if (toggleIcon) toggleIcon.textContent = "↓"; 
            taskItem.style.borderColor = '#ddd';
            taskItem.style.boxShadow = 'none';
            deleteButton.style.opacity = '0';
        }
    });

    taskInput.value = "";
    taskDescriptionInput.value = "";
    taskDueDate.value = "";
    taskDueTime.value = "";
}

addTaskButton.addEventListener("click", addTask);