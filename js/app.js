// selecting elements

function getId(id) {
  return document.getElementById(id);
}

const newTaskInp = getId("taskName");
const addBtn = getId("addTask");
const taskList = getId("task_list");

//add task to list

// get task name from input field
addBtn.addEventListener("click", function (e) {
  let taskName = newTaskInp.value;

  if (taskName === "") {
    alert("Add a task name");
    return;
  }
  newTaskInp.value = "";
  addTask(taskName);
});

// add new task in the task list
function addTask(taskName) {
  console.log(taskName);
  const newTaskItem = document.createElement("div");
  newTaskItem.className = "item";
  newTaskItem.innerHTML = `<li>${taskName}</li>
  <button class="edit"><i class="fas fa-pen"></i></button>
  <button class="completed"><i class="fas fa-check"></i></button>
  <button class="deleted"><i class="fas fa-trash-can"></i></button>
  </div>`;
  taskList.appendChild(newTaskItem);
}

// task buttons functions

// take orders from task's button

taskList.addEventListener("click", function (event) {
  if (event.target.className == "deleted") {
    deleteTask(event);
    // console.log("Task Deleted......");
  } else if (event.target.className == "completed") {
    completedTask(event);
    // console.log("Task Done......");
  } else if (event.target.className == "edit") {
    editTaskName(event);
  }
});

// task delete function

function deleteTask(event) {
  event.target.parentElement.remove();
}

// task complect function

function completedTask(event) {
  const taskName = event.target.parentElement.children[0];
  taskName.classList.toggle("completed_task");
}

// task name edit function

function editTaskName(event) {
  const taskName = event.target.parentElement.children[0];
  const previousName = taskName.innerText;
  taskName.innerHTML = "";
  const inputNewName = document.createElement("input");
  inputNewName.type="text"
  inputNewName.value = previousName;

  inputNewName.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
      const newTaskName = e.target.value;
      taskName.innerText = newTaskName;
      event.target.style.display = 'inline';
    }
  });

  taskName.appendChild(inputNewName);
  event.target.style.display = 'none';
}
