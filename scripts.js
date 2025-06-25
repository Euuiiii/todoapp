const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const taskDueDate = document.getElementById("dueDateInput");
const taskDueTime = document.getElementById("dueTimeInput");
const taskTemplate = document.getElementById("taskTemplate");
const taskDescriptionInput = document.getElementById("taskDiscription");

function saveLocally (){
    const tasksArray = [];
    const listItems = taskList.querySelectorAll("li");

    listItems.forEach((item) => {
        const taskText = item.querySelector(".taskText").textContent;
        const taskDescription = item.querySelector(".taskDescription").textContent;
        const taskDueDate = item.querySelector(".taskDueDate").textContent;
        const taskDueTime = item.querySelector(".taskDueTime").textContent;
        const isCompleted = item.querySelector(".taskItem").classList.contains("completed");

        tasksArray.push({ taskText, taskDescription, taskDueDate, taskDueTime, isCompleted });
    });
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

function loadTasksFromLocalStorage() {
    taskList.innerHTML = ""; 
    const tasksJSON = localStorage.getItem("tasks");
    if (!tasksJSON) return;

    const tasksArray = JSON.parse(tasksJSON);

    tasksArray.forEach(task => {
        const clone = taskTemplate.content.cloneNode(true);
        clone.querySelector(".taskText").textContent = task.taskText || "";
        clone.querySelector(".taskDescription").textContent = task.taskDescription || "";
        clone.querySelector(".taskDueDate").textContent = task.taskDueDate || "";
        clone.querySelector(".taskDueTime").textContent = task.taskDueTime || "";

        const doneButton = clone.querySelector(".doneTaskButton");
        const deleteButton = clone.querySelector(".deleteTaskButton");
        const taskMain = clone.querySelector(".taskMain");
        const taskDetails = clone.querySelector(".taskDetails");
        const taskItem = clone.querySelector(".taskItem");
        const toggleIcon = clone.querySelector(".toggleIcon");

        const listItem = document.createElement("li");
        listItem.appendChild(clone);
        taskList.appendChild(listItem);

        if (task.isCompleted) {
            taskItem.classList.add("completed");
        }

        doneButton.onclick = (e) => {
            e.stopPropagation();
            taskItem.classList.toggle("completed");
            saveLocally();
        };

        deleteButton.onclick = (e) => {
            e.stopPropagation();
            listItem.remove();
            saveLocally();
        };

        taskMain.addEventListener('click', () => {
            if (taskDetails.style.display === "none") {
                taskDetails.style.display = "block";
                if (toggleIcon) toggleIcon.textContent = "↑";
                taskItem.style.borderColor = '#007bff';
                taskItem.style.boxShadow = '0 0 8px rgba(0,123,255,0.2)';
                deleteButton.style.opacity = '1';
                doneButton.style.opacity = '1';
            } else {
                taskDetails.style.display = "none";
                if (toggleIcon) toggleIcon.textContent = "↓";
                taskItem.style.borderColor = '#ddd';
                taskItem.style.boxShadow = 'none';
                deleteButton.style.opacity = '0';
                doneButton.style.opacity = '0';
            }
        });
    });
}
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
    clone.querySelector(".taskDueTime").textContent = "at =" + dueTime;

    const doneButton = clone.querySelector(".doneTaskButton");
    const deleteButton = clone.querySelector(".deleteTaskButton");
    const taskMain = clone.querySelector(".taskMain");
    const taskDetails = clone.querySelector(".taskDetails");
    const taskItem = clone.querySelector(".taskItem");
    const toggleIcon = clone.querySelector(".toggleIcon");

    const listItem = document.createElement("li");
    listItem.appendChild(clone);
    taskList.appendChild(listItem);

    doneButton.onclick = (e) => {
    e.stopPropagation();
    taskItem.classList.toggle("completed");
    saveLocally();
    };

    deleteButton.onclick = (e) => {
        e.stopPropagation();
        listItem.remove();
        saveLocally();
    };


    taskMain.addEventListener('click', () => {
        if (taskDetails.style.display === "none") {
            taskDetails.style.display = "block";
            if (toggleIcon) toggleIcon.textContent = "↑"; 
            taskItem.style.borderColor = '#007bff';
            taskItem.style.boxShadow = '0 0 8px rgba(0,123,255,0.2)';
            deleteButton.style.opacity = '1';
            doneButton.style.opacity = '1';
        } else {
            taskDetails.style.display = "none";
            if (toggleIcon) toggleIcon.textContent = "↓"; 
            taskItem.style.borderColor = '#ddd';
            taskItem.style.boxShadow = 'none';
            deleteButton.style.opacity = '0';
            doneButton.style.opacity = '0';
        }
    });

    taskInput.value = "";
    taskDescriptionInput.value = "";
    taskDueDate.value = "";
    taskDueTime.value = "";
}

taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});
taskInput.focus();



addTaskButton.addEventListener("click", addTask);
window.addEventListener("load", loadTasksFromLocalStorage);
