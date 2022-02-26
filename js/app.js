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
  addTask(taskName);
  newTaskInp.value = "";
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

  let newTaskName = taskName;

  for (let dataName of data) {
    if (dataName[0].trim() === taskName.trim()) {
      newTaskName += " ";
    }
  }

  const uniqData = [newTaskName, "Active"];
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
  const taskData = getDataFromLocalStorage();
  let index;
  taskData.forEach((task, taskIndex) => {
    if (task[0] == taskName.innerText) {
      index = taskIndex;
    }
  });
  const task = taskData[index];
  if (task[1] == "Actcive") {
    task[1] = "Complect";
  }else{
    task[1] == "Actcive"
  }
  taskData.splice(index,1,task)
  setDataInLocalStorage(taskData)
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

      const tasksData = getDataFromLocalStorage();

      let index;
      for (let i = 0; i < tasksData.length; i++) {
        if (tasksData[i][0].trim() == previousName) {
          index = i;
        }
      }

      let newTaskNameAdded = tasksData[index];
      newTaskNameAdded.splice(0, 1, newTaskName);

      tasksData.splice(index, 1, newTaskNameAdded);
      setDataInLocalStorage(tasksData);
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
    let classOfLi;
    item.className = "item";
    if (task[1] === "Complect") {
      classOfLi = "completed_task";
    }
    item.innerHTML = `<li class=${classOfLi}>${task[0]}</li>
  <button class="edit"><i class="fas fa-pen"></i></button>
  <button class="completed"><i class="fas fa-check"></i></button>
  <button class="deleted"><i class="fas fa-trash-can"></i></button>`;
    taskList.appendChild(item);
  });
}

function setDataInLocalStorage(data) {
  localStorage.setItem("tasks", JSON.stringify(data));
}

// delete data from local storage

function deleteDataFromLocalStorage(data) {
  const tasksData = getDataFromLocalStorage();
  // const dataIndex = tasksData.indexOf(data);

  let dataIndex;
  for (let i = 0; i < tasksData.length; i++) {
    if (tasksData[i][0] == data) {
      dataIndex = i;
    }
  }

  tasksData.splice(dataIndex, 1);
  setDataInLocalStorage(tasksData);
}

