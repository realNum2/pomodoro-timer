function addNewTask() {
    const input = document.getElementById("newTaskInput")
    const taskText = input.value.trim();

    if (!taskText) return;

    const span = document.createElement("span");
    span.textContent = taskText;

    const li = document.createElement("li");

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="ri-check-fill"></i> Completed';
    completedButton.className = "completedButton";

    const editButton = document.createElement("button");
    editButton.innerHTML = '<i class="ri-pencil-line"></i> Edit';
    editButton.className = "editBtn";

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="ri-delete-bin-fill"></i> Delete';
    deleteButton.className = "removeBtn";

    editButton.onclick = function () {
        editTask(span);
    };

    deleteButton.onclick = function () {
        li.remove();
        saveTask();
    };

    completedButton.addEventListener("click", () => {
        buttonContainer.classList.add('fade-out');

        buttonContainer.addEventListener('transitionend', () => {
            buttonContainer.remove();
        });
    });

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "task-buttons";

    buttonContainer.appendChild(completedButton);
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    li.appendChild(span);
    li.appendChild(buttonContainer);

    document.getElementById('taskList').appendChild(li);

    input.value = ``;

    saveTask();
}

function editTask(spanElement) {
    const currentText = spanElement.textContent;

    const newText = prompt("Edit task:", currentText);

    if (newText !== null && newText.trim() !== "") {
        spanElement.textContent = newText.trim();
        saveTask();
    }
}

function saveTask() {
    const tasks = [];
    document.querySelectorAll("#taskList li span").forEach(span => {
        tasks.push(span.textContent);
    }),
    localStorage.setItem("myTasks", JSON.stringify(tasks));
}

function loadTasks() {
    const saved = localStorage.getItem("myTasks");
    if (!saved) return;

    const tasks = JSON.parse(saved);
    const list = document.getElementById('taskList');

    tasks.forEach(text => {
        const li = document.createElement("li");
        const span = document.createElement("span");

        span.textContent = text;

        li.appendChild(span);
        list.appendChild(li);
    });
}

window.onload = loadTasks();