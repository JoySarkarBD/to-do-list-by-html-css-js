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

taskList.addEventListener("click", function (e) {
  if (e.target.className == "deleted") {
    deleteTask(e);
    // console.log("Task Deleted......");
  } else if (e.target.className == "completed") {
    completedTask(e);
    // console.log("Task Done......");
  } else if (e.target.className == "edit") {
    editTaskName(e);
  }
});

// task delete function

function deleteTask(e) {
  e.target.parentElement.remove();
}

// task complect function

function completedTask(e) {
  const taskName = e.target.parentElement.children[0];
  taskName.classList.toggle("completed_task");
}

// task name edit function

function editTaskName(e) {
  const taskName = e.target.parentElement.children[0];
  const previousName = taskName.innerText;
  taskName.innerHTML = "";
  const inputNewName = document.createElement("input");
  inputNewName.type="text"
  inputNewName.value = previousName;

  inputNewName.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
      const newTaskName = e.target.value;
      taskName.innerText = newTaskName;
      e.target.style.display = 'inline';
    }
  });

  taskName.appendChild(inputNewName);
  e.target.style.display = 'none';
}
