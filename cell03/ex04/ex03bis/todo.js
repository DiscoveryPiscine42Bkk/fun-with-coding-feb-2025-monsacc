function addTodo() {
    let task = prompt("Enter a new task:");
    if (task && task.trim() !== "") {
        let todoDiv = document.createElement("div");
        todoDiv.className = "todo";
        todoDiv.textContent = task;
        todoDiv.onclick = function() {
            removeTodo(this);
        };

        let ftList = document.getElementById("ft_list");
        ftList.insertBefore(todoDiv, ftList.firstChild);
        saveTodos();
    }
}

function removeTodo(element) {
    if (confirm("Do you really want to delete this task?")) {
        element.remove();
        saveTodos();
    }
}

function saveTodos() {
    let todos = [];
    document.querySelectorAll(".todo").forEach(todo => {
        todos.push(todo.textContent);
    });
    document.cookie = "todos=" + JSON.stringify(todos) + "; path=/";
}

function loadTodos() {
    let cookies = document.cookie.split("; ");
    let todoCookie = cookies.find(row => row.startsWith("todos="));
    if (todoCookie) {
        let todos = JSON.parse(todoCookie.split("=")[1]);
        todos.forEach(task => {
            let todoDiv = document.createElement("div");
            todoDiv.className = "todo";
            todoDiv.textContent = task;
            todoDiv.onclick = function() {
                removeTodo(this);
            };
            document.getElementById("ft_list").appendChild(todoDiv);
        });
    }
}