const addButtons = document.querySelectorAll("button");
const lists = document.querySelectorAll("ul");

// Arrays to save tasks IDs in Local Storage
const notStartedTasks = [];
const inProgressTasks = [];
const completedTasks = [];

// -------------------------------
// Creating task (function)
function creatingTask(id, userInput, focused) {
  const task = document.createElement("li");
  task.innerHTML = `<input type="text" placeholder="add task"></input>
<ion-icon name="create-outline" class="icon"></ion-icon>
<ion-icon name="close-outline" class="icon"></ion-icon>`;
  task.className = "task";
  task.id = id;
  task.draggable = false;
  task.firstElementChild.placeHolder = "new task";
  task.firstElementChild.value = userInput;
  taskFocused(task, focused);

  return task;
}
// -------------------------------

// -------------------------------
// Saving in Local Storage (function)
function saveInLocalStorage(key, value) {
  localStorage.setItem(key, value);
}
// -------------------------------

// -------------------------------
// mini function to focus on tasks
function taskFocused(task, focused) {
  if (focused) {
    task.classList.add("focused");
    return;
  }
  task.classList.remove("focused");
}
// -------------------------------

// -------------------------------
// Operations on array (function)
function doingOperationsOnArray(task, operationNumber, previousTaskId) {
  // Appending task's INFOs object to array
  if (operationNumber === 1) {
    // setting object to be added
    const taskInfo = {
      taskID: task.id,
      taskInput: task.firstElementChild.value,
    };

    // Appending to array and save the array in (Local Storage)
    if (task.id[0] === "n") {
      notStartedTasks.push(taskInfo);
      saveInLocalStorage("notStartedTasks", JSON.stringify(notStartedTasks));
    } else if (task.id[0] === "i") {
      inProgressTasks.push(taskInfo);
      saveInLocalStorage("inProgressTasks", JSON.stringify(inProgressTasks));
    } else if (task.id[0] === "c") {
      completedTasks.push(taskInfo);
      saveInLocalStorage("completedTasks", JSON.stringify(completedTasks));
    }
  }

  // Removing task's INFOs object from array
  if (operationNumber === 0) {
    if (task.id[0] === "n") {
      notStartedTasks.forEach((tsk, idx, list) => {
        if (tsk.taskID === task.id) {
          list.splice(idx, 1);
        }
      });
      saveInLocalStorage("notStartedTasks", JSON.stringify(notStartedTasks));
    } else if (task.id[0] === "i") {
      inProgressTasks.forEach((tsk, idx, list) => {
        if (tsk.taskID === task.id) {
          list.splice(idx, 1);
        }
      });
      saveInLocalStorage("inProgressTasks", JSON.stringify(inProgressTasks));
    } else if (task.id[0] === "c") {
      completedTasks.forEach((tsk, idx, list) => {
        if (tsk.taskID === task.id) {
          list.splice(idx, 1);
        }
      });
      saveInLocalStorage("completedTasks", JSON.stringify(completedTasks));
    }
  }

  // Adding droped task in the specific place of the array
  if (operationNumber === 2) {
    // setting object to be added
    const taskInfo = {
      taskID: task.id,
      taskInput: task.firstElementChild.value,
    };

    if (task.id[0] === "n") {
      notStartedTasks.forEach((tsk, idx, list) => {
        if (tsk.taskID === previousTaskId) {
          list.splice(idx + 1, 0, taskInfo);
        }
      });
      saveInLocalStorage("notStartedTasks", JSON.stringify(notStartedTasks));
    } else if (task.id[0] === "i") {
      inProgressTasks.forEach((tsk, idx, list) => {
        if (tsk.taskID === previousTaskId) {
          list.splice(idx + 1, 0, taskInfo);
        }
      });
      saveInLocalStorage("inProgressTasks", JSON.stringify(inProgressTasks));
    } else if (task.id[0] === "c") {
      completedTasks.forEach((tsk, idx, list) => {
        if (tsk.taskID === previousTaskId) {
          list.splice(idx + 1, 0, taskInfo);
        }
      });
      saveInLocalStorage("completedTasks", JSON.stringify(completedTasks));
    }
  }
}
// -------------------------------

// -------------------------------
// Updating task's input info in array (function)
function updateTaskInputInArray(task) {
  if (task.id[0] === "n") {
    // 'n' means (n)ot-started
    notStartedTasks.forEach((tsk) => {
      if (task.id === tsk.taskID) {
        tsk.taskInput = task.firstElementChild.value;
      }
    });
    saveInLocalStorage("notStartedTasks", JSON.stringify(notStartedTasks));
  } else if (task.id[0] === "i") {
    inProgressTasks.forEach((tsk) => {
      // 'i' means (i)n-progress
      if (task.id === tsk.taskID) {
        tsk.taskInput = task.firstElementChild.value;
      }
    });
    saveInLocalStorage("inProgressTasks", JSON.stringify(inProgressTasks));
  } else if (task.id[0] === "c") {
    // 'c' means (c)ompleted
    completedTasks.forEach((tsk) => {
      if (task.id === tsk.taskID) {
        tsk.taskInput = task.firstElementChild.value;
      }
    });
    saveInLocalStorage("completedTasks", JSON.stringify(completedTasks));
  }
}
// -------------------------------

// -------------------------------
// Adding new task (function) ---> returns (task reference)
function addTask(button) {
  // Creating new task
  const task = creatingTask(button.id.slice(4) + Math.random(), "", true);

  // Append the task to the list
  const taskList = button.previousElementSibling;
  taskList.append(task);

  // Add INFOs of the task to array
  doingOperationsOnArray(task, 1);
  return task;
}
// -------------------------------

// -------------------------------
// Adding Edit and Delete and more features to task (function)
function addTaskFeatures(task) {
  saveUserInput(task);
  unFocus(task);
  Delete(task);
  Edit(task);
  dragAndDrop(task);
}

// sub functions
function saveUserInput(task) {
  const input = task.firstElementChild;
  input.addEventListener("change", () => {
    updateTaskInputInArray(task);
  });
}
function unFocus(task) {
  const input = task.firstElementChild;
  input.addEventListener("blur", () => {
    input.disabled = true;
    task.draggable = true;
    taskFocused(task, false);
  });
}
function Delete(task) {
  const deletButton = task.children[2];
  deletButton.addEventListener("click", () => {
    // removing task from array
    doingOperationsOnArray(task, 0);
    // remove task element
    task.remove();
  });
}
function Edit(task) {
  const input = task.firstElementChild;
  const editButton = task.children[1];
  editButton.addEventListener("click", () => {
    task.draggable = false;
    input.disabled = false;
    taskFocused(task, true);
  });
}
// -------------------------------

// -------------------------------
// Adding main (function) (Handler)
function addOperationHandler(event) {
  // Adding a task
  const task = addTask(this);

  // Adding task's features
  addTaskFeatures(task);
}
// -------------------------------

// ------------------------------------------------------------------------------------------------
// -------------------------------
// ----------MAIN CODE------------
// -------------------------------

// Adding event listener to BUTTONs
addButtons.forEach((button) => {
  button.addEventListener("click", addOperationHandler);
});

// Making LISTs droppable
lists.forEach((list) => {
  draggableList(list);
});

// Recovering TASKs from Local Storage
notStartedTasks.push(
  ...recoverListTasks(notStartedTasks, "not-started-list", "notStartedTasks")
);
inProgressTasks.push(
  ...recoverListTasks(inProgressTasks, "in-progress-list", "inProgressTasks")
);
completedTasks.push(
  ...recoverListTasks(completedTasks, "completed-list", "completedTasks")
);
// -------------------------------
// -------------------------------
// -------------------------------
// ------------------------------------------------------------------------------------------------

// ---------------------------------------------
// Recovering task from (Local Storage) (function)
// ---------------------------------------------

function recoverListTasks([tasks], listId, key) {
  // Pointing at the releated list DOM element
  const list = document.getElementById(listId);
  // Recovering array from Local Storage
  tasks = JSON.parse(localStorage.getItem(key));
  if (tasks === null) {
    return "";
  }
  tasks.forEach((tsk) => {
    const task = creatingTask(tsk.taskID, tsk.taskInput, false);
    addTaskFeatures(task);
    // Specific situation when reloading the page
    task.draggable = true;
    task.firstElementChild.disabled = true;
    list.append(task);
  });
  return tasks;
}
// ---------------------------------------------

// ---------------------------------------------
// Dragging and Droping features (functions)
// ---------------------------------------------

// ---------------------------------------------
// Used inside (addTaskFeatures())
// For tasks
function dragAndDrop(task) {
  task.addEventListener("dragstart", (event) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", task.id);
    console.log("drag");
    task.style.opacity = "0.3";
  });
  // /////////

  task.addEventListener("dragend", (event) => {
    task.style.opacity = "1";
  });
  // /////////

  task.addEventListener("dragover", (event) => {
    event.preventDefault();
    event.currentTarget.classList.add("droppedover");
  });
  // /////////

  task.addEventListener("dragleave", (event) => {
    event.preventDefault();
    event.currentTarget.classList.remove("droppedover");
  });
  // /////////

  task.addEventListener("drop", (event) => {
    event.preventDefault();

    task.classList.remove("droppedover");
    const elementID = event.dataTransfer.getData("text/plain");
    const draggedTask = document.getElementById(elementID);

    // Check if the Tesk isn't itself
    if (event.currentTarget !== draggedTask) {
      // Removing task from its original array
      doingOperationsOnArray(draggedTask, 0);

      // Changing the ID of droped task
      draggedTask.id = task.id.slice(0, 16) + draggedTask.id.slice(16);
      console.log(draggedTask.id);

      // Adding droped task in the new array (right after the task it was putted after)
      doingOperationsOnArray(draggedTask, 2, task.id);

      // Putting the task element right after the target droped on element
      task.after(draggedTask);
    }
  });
  // /////////
}
// ---------------------------------------------

// ---------------------------------------------
// For lists (used under adding event listener to Buttons)
function draggableList(list) {
  list.addEventListener("dragover", (event) => {
    event.preventDefault();
    if (list.innerHTML === "") {
      event.currentTarget.classList.add("dragover");
    }
  });
  // /////////

  list.addEventListener("dragleave", (event) => {
    event.preventDefault();
    if (list.innerHTML === "") {
      event.currentTarget.classList.remove("dragover");
    }
  });
  // /////////

  list.addEventListener("drop", (event) => {
    event.preventDefault();
    if (list.innerHTML === "") {
      const elementID = event.dataTransfer.getData("text/plain");
      const draggedTask = document.getElementById(elementID);

      // Removing task from its original array
      doingOperationsOnArray(draggedTask, 0);

      // Changing the ID of droped task
      draggedTask.id =
        list.nextElementSibling.id.slice(4).slice(0, 16) +
        draggedTask.id.slice(16);
      console.log(draggedTask.id);

      // Adding droped task in the new array
      doingOperationsOnArray(draggedTask, 1);

      list.append(draggedTask);
      event.currentTarget.classList.remove("dragover");
    }
  });
}
// ---------------------------------------------
