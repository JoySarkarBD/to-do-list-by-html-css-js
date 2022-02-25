// selecting elements

function getId(id) {
  return document.getElementById(id);
}

const newTaskInp = getId("taskName");
const addBtn = getId("addTask");
const taskList = getId("task_list");

//add task to list

// get task name from input field on enter keypress
newTaskInp.addEventListener("keypress", function (e) {
  if (e.key == "Enter" && !e.target.value) {
    alert("Add a task name");
    return;
  } else if(e.key == "Enter" && e.target.value){
    addTask(e.target.value);
    newTaskInp.value = "";
  }
});

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
  const newTaskItem = document.createElement("div");
  newTaskItem.className = "item";
  newTaskItem.innerHTML = `<li>${taskName}</li>
  <button class="edit"><i class="fas fa-pen"></i></button>
  <button class="completed"><i class="fas fa-check"></i></button>
  <button class="deleted"><i class="fas fa-trash-can"></i></button>
  </div>`;
  taskList.appendChild(newTaskItem);

  // add new task data in local storage
  const data = getDataFromLocalStorage();
  let uniqData = taskName;
  for (let dataName of data) {
    if (dataName.trim() === taskName) {
      uniqData += " ";
    }
  }
  data.push(uniqData);
  setDataInLocalStorage(data);
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
    // console.log("Task Eidted......");
  }
});

// task delete function

function deleteTask(event) {
  event.target.parentElement.remove();
  const taskName = event.target.parentElement.children[0].innerText;
  deleteDataFromLocalStorage(taskName);
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
  inputNewName.type = "text";
  inputNewName.value = previousName;

  inputNewName.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
      const newTaskName = e.target.value;
      taskName.innerText = newTaskName;
      event.target.style.display = "inline";
    }
  });

  taskName.appendChild(inputNewName);
  event.target.style.display = "none";
}

//-----------------------------------------//

// onload data from local storage
document.body.onload = function (e) {
  const data = getDataFromLocalStorage();
  displayTaskOnUI(data);
};

// get data from localStorage
function getDataFromLocalStorage() {
  let task;
  const data = localStorage.getItem("tasks");
  if (data) {
    task = JSON.parse(data);
  } else {
    task = [];
  }
  return task;
}

// render data to ui
function displayTaskOnUI(data) {
  data.forEach((task) => {
    const item = document.createElement("div");
    item.className = "item";
    item.innerHTML = `
  <li>${task}</li>
  <button class="edit"><i class="fas fa-pen"></i></button>
  <button class="completed"><i class="fas fa-check"></i></button>
  <button class="deleted"><i class="fas fa-trash-can"></i></button>
`;
    taskList.appendChild(item);
  });
}

function setDataInLocalStorage(data) {
  localStorage.setItem("tasks", JSON.stringify(data));
}

// delete data from local storage

function deleteDataFromLocalStorage(data) {
  const tasksData = getDataFromLocalStorage();
  const dataIndex = tasksData.indexOf(data);
  tasksData.splice(dataIndex, 1);
  setDataInLocalStorage(tasksData);
}

// ["Item-1","Item-2","Item-3","Item-4","Item-5"]
