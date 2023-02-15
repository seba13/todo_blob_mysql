"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var containerTask = document.querySelector(".container-tasks");
var checkboxInputs = containerTask.querySelectorAll("input[type='checkbox']");
var taskList = document.getElementById("task-list");
var taskDock = document.getElementById("task-dock");
var pages = 0;
var tasksDone = document.getElementById('tasks-done');
var taskPending = document.getElementById("tasks-pending");
var buttonLeft = document.getElementById("button-left");
var buttonRight = document.getElementById("button-right");
var buttonNewTask = document.querySelector(".task__input-insert");
var modalForm = buttonNewTask.querySelector('.task__form-insert');

/**
 *  indica la tarea que ha sido seleccionada para ordenar
 */
var previousIndexTask = 0;
var inputInfo = {
  total: checkboxInputs.length,
  getInputDone: function getInputDone() {
    var countDone = 0;
    checkboxInputs = containerTask.querySelectorAll("input[type='checkbox']");
    checkboxInputs.forEach(function (input) {
      if (input.checked == true) {
        countDone++;
      }
    });
    return countDone;
  },
  getInputPending: function getInputPending() {
    var countPending = 0;
    checkboxInputs = containerTask.querySelectorAll("input[type='checkbox']");
    checkboxInputs.forEach(function (input) {
      if (!input.checked == true) {
        countPending++;
      }
    });
    return countPending;
  }
};
Sortable.create(taskList, {
  handle: '.move-task',
  animation: 150
});
taskList.addEventListener('pointerdown', function (e) {
  var selectedTask = e.target.closest('.task-list__wrapper');
  var tasks = _toConsumableArray(document.querySelectorAll('.task-list__wrapper'));
  previousIndexTask = tasks.indexOf(selectedTask);
  console.log("pointer down!!!!!");
});

// en mobile no se activa el evento drop

// por lo que para desktop funciona el evento drop
// y en mobile funciona el evento pointerup

taskList.addEventListener('pointerup', setTaskOrder);
// taskList.addEventListener('pointermove', e => e.preventDefault())
taskList.addEventListener('drop', setTaskOrder);
function setTaskOrder(e) {
  console.log("drop or pointerup");
  console.log(e);
  var currentTask = e.target.closest('.task-list__wrapper');
  var tasks = _toConsumableArray(document.querySelectorAll('.task-list__wrapper'));
  var currentIndexTask = tasks.indexOf(currentTask);
  console.log("pointerup!!!!");
  console.log(currentIndexTask);
  console.log(previousIndexTask);
  console.log(tasks);
  if (currentIndexTask !== previousIndexTask) {
    if (e.type !== 'drop') {
      tasks.pop();
    }
    updateOrderTasks(tasks);
  } else {
    console.log("no entra");
  }

  //     console.log(currentIndexTask);
  //     console.log(previousIndexTask);

  //     updateOrderTasks(tasks.slice(currentIndexTask, previousIndexTask), currentIndexTask);

  // }else
  // {
  //     updateOrderTasks(tasks.slice(previousIndexTask, currentIndexTask), previousIndexTask);
  // }
}

/**
 * 
 * @param {*} el  elemento de dom
 * al utilizar motor de plantillas el contenido se genera dinamicamente
 * por lo que el evento load no se activa automaticamente
 */
function dispatchEvent(el) {
  console.log("despachando evento");
  el.dispatchEvent(new Event('load'));
}
buttonNewTask.addEventListener('click', modalNewTask);
modalForm.addEventListener('submit', addNewTask);
// funcionalidad modal options
containerTask.addEventListener('click', toggleOptionsModal);
containerTask.addEventListener("change", updateStatus);

// Agregar info task
tasksDone.addEventListener('load', updateTasksDone);
taskPending.addEventListener('load', updateTasksPending);

// Agregar dock
taskDock.addEventListener("load", createDockPage);

// Ejecutando automaticamente
dispatchEvent(tasksDone);
dispatchEvent(taskPending);
dispatchEvent(taskDock);

// seleccionar dot del dock
window.addEventListener("resize", createDockPage);
taskList.addEventListener("scroll", pageSelected);

// evento scrollear al dot del dock seleccionado
taskDock.addEventListener("click", movePageAt);

// agregar bottones para scrollear
buttonLeft.addEventListener("click", function () {
  taskList.scrollBy({
    top: 0,
    left: -10,
    behavior: "smooth"
  });
});
buttonRight.addEventListener("click", function () {
  taskList.scrollBy({
    top: 0,
    left: 10,
    behavior: "smooth"
  });
});
function modalNewTask(e) {
  if (e.target.classList.contains("new-task") || e.target.getAttribute('icon')) {
    if (modalForm) {
      modalForm.classList.toggle('task__form-insert--hidden');
    }
  }
}
function toggleOptionsModal(e) {
  // btn para abrir/cerrar modal
  if (e.target.closest('[icon="fluent:options-20-filled"] ')) {
    var taskListOptions = e.target.nextElementSibling;

    // previniendo que se abra mas de un modal
    // capturando todos los elementos que si estan visibles
    // se les agrega la clase hidden para ocultarlos
    // solo se le quita al elemento que se ha hecho click
    containerTask.querySelectorAll('.task-list__options__btn:not(.task-list__options__btn--hidden)').forEach(function (taskOptionsEl) {
      taskOptionsEl.classList.add("task-list__options__btn--hidden");
    });

    // toggle para abrir y cerrar opciones
    taskListOptions.classList.toggle("task-list__options__btn--hidden");
    e.target.closest('.task-list__wrapper').firstElementChild.firstElementChild.setAttribute('readonly', true);
    e.target.closest('.task-list__wrapper').firstElementChild.lastElementChild.setAttribute('readonly', true);
    var iconSave = e.target.closest(".task-list__options").querySelector("[icon='material-symbols:save-as']").parentElement;
    iconSave.classList.add("task-list__icon--hidden");
    var iconEdit = e.target.closest(".task-list__options").querySelector("[icon='material-symbols:edit-document']").parentElement;
    iconEdit.classList.remove("task-list__icon--hidden");
  } else if (e.target.closest('.task-list__icon--close')) {
    var btnClose = null;
    if (e.target.classList.contains("task-list__icon--close")) {
      btnClose = e.target;
    } else {
      btnClose = e.target.parentElement;
    }
    var tasklistOptions = btnClose.parentElement;
    tasklistOptions.classList.add("task-list__options__btn--hidden");
    e.target.closest('.task-list__wrapper').firstElementChild.firstElementChild.setAttribute('readonly', true);
    e.target.closest('.task-list__wrapper').firstElementChild.lastElementChild.setAttribute('readonly', true);
    var _iconSave = e.target.closest(".task-list__options").querySelector("[icon='material-symbols:save-as']").parentElement;
    _iconSave.classList.add("task-list__icon--hidden");
    var _iconEdit = e.target.closest(".task-list__options").querySelector("[icon='material-symbols:edit-document']").parentElement;
    _iconEdit.classList.remove("task-list__icon--hidden");
  } else if (e.target.getAttribute('icon') === 'material-symbols:edit-document' || e.target.getAttribute("icon") === "material-symbols:save-as") {
    if (e.target.getAttribute('icon') === "material-symbols:edit-document") {
      e.target.parentElement.classList.toggle("task-list__icon--hidden");
      e.target.parentElement.nextElementSibling.classList.toggle("task-list__icon--hidden");
      e.target.closest('.task-list__wrapper').firstElementChild.firstElementChild.removeAttribute('readonly');
      e.target.closest('.task-list__wrapper').firstElementChild.lastElementChild.removeAttribute('readonly');
      e.target.closest('.task-list__wrapper').firstElementChild.firstElementChild.focus();
    } else {
      // se procede a guardar

      e.target.parentElement.classList.toggle("task-list__icon--hidden");
      e.target.parentElement.previousElementSibling.classList.toggle("task-list__icon--hidden");
      var nombre = e.target.closest('.task-list__wrapper').firstElementChild.firstElementChild;
      var descripcion = e.target.closest('.task-list__wrapper').firstElementChild.lastElementChild;
      var idTask = e.target.closest(".task-list__wrapper").dataset.id;
      saveTask(nombre.value, descripcion.value, idTask);
    }
  } else if (e.target.getAttribute('icon') === 'material-symbols:delete-forever-rounded') {
    // Eliminando ...

    var _idTask = e.target.closest(".task-list__wrapper").dataset.id;
    deleteTask(_idTask);
  }
}
function updateStatus(e) {
  checkboxInputs = containerTask.querySelectorAll("input[type='checkbox']");
  if (e.target.getAttribute('type') == 'checkbox') {
    var spanText = e.target.parentElement.lastElementChild;

    // Modifica el dom
    updateTasksList({
      op: 'update',
      spanText: spanText,
      checkbox: e.target
    });
    // modifca bd
    saveStatus(e.target.getAttribute('id'), e.target.checked);
  }
}
function addNewTask(e) {
  e.preventDefault();
  modalForm.classList.toggle('task__form-insert--hidden');
  var inputTitle = document.getElementById('title-task');
  var inputDescription = document.getElementById('description-task');

  // /to-do/newtask

  var data = {
    nombre: inputTitle.value,
    descripcion: inputDescription.value
  };
  fetch('to-do/newtask', {
    headers: {
      "Content-Type": 'application/json'
    },
    method: "POST",
    body: JSON.stringify(data)
  }).then(function (res) {
    if (res.ok) return res.json();else throw new Error('Error al agregar Tarea');
  }).then(function (json) {
    updateTasksList(_objectSpread({
      op: 'append'
    }, json));
  })["catch"](function (err) {
    createModalMessage({
      flag: false,
      title: "Nueva Tarea",
      message: err.message
    });
  });
  inputTitle.value = "";
  inputDescription.value = "";
}
function saveTask(nombre, descripcion, idTask) {
  var data = {
    nombre: nombre,
    descripcion: descripcion,
    idTask: idTask
  };
  fetch("/to-do/".concat(data.idTask, "/"), {
    headers: {
      "Content-Type": 'application/json'
    },
    method: "PATCH",
    body: JSON.stringify(data)
  }).then(function (res) {
    if (res.ok) {
      createModalMessage({
        flag: true,
        title: "Actualizar tarea",
        message: "Tarea actualizada con éxito"
      });
    } else {
      throw new Error('Error al actualizar tarea');
    }
  })["catch"](function (err) {
    createModalMessage({
      flag: false,
      title: "Actualizar Tarea",
      message: err.message
    });
  });
}
function saveStatus(id, status) {
  var estado = status ? 1 : 0;
  var data = {
    idTask: id,
    estado: estado
  };
  fetch("/to-do/".concat(data.idTask, "/status"), {
    headers: {
      "Content-Type": 'application/json'
    },
    method: "PATCH",
    body: JSON.stringify(data)
  }).then(function (res) {
    if (res.ok) {
      createModalMessage({
        flag: true,
        title: "Actualizar tarea",
        message: "Estado de tarea Actualizado con Éxito"
      });
    } else {
      throw new Error('Error al actualizar Tarea');
    }
  })["catch"](function (err) {
    createModalMessage({
      flag: false,
      title: "Actualizar tarea",
      message: err.message
    });
  });
}
function deleteTask(idTask) {
  var data = {
    idTask: idTask
  };
  fetch("/to-do/".concat(data.idTask, "/"), {
    headers: {
      "Content-Type": 'application/json'
    },
    method: "DELETE",
    body: JSON.stringify(data)
  }).then(function (res) {
    if (res.ok) {
      updateTasksList(_objectSpread(_objectSpread({}, data), {}, {
        op: 'delete'
      }));
    } else {
      throw new Error('Error al eliminar tarea');
    }
  })["catch"](function (err) {
    createModalMessage({
      flag: false,
      title: "Eliminar tarea",
      message: err.message
    });
  });
}
function updateTasksList(data) {
  if (data.op === 'append') {
    taskList.append(createTask(data));
    createModalMessage({
      flag: true,
      title: "Agregar Tarea",
      message: "Tarea Creada con Éxito"
    });
  }
  if (data.op === 'delete') {
    createModalMessage({
      flag: true,
      title: "Eliminar tarea",
      message: "Tarea Eliminada con Éxito"
    });
    var wrapperTask = document.querySelector(" .task-list__wrapper[data-id='".concat(data.idTask, "']"));
    wrapperTask.classList.add('task-list__wrapper--hidden');
    wrapperTask.addEventListener('transitionend', function (e) {
      wrapperTask.remove();
    });
  }
  if (data.op === 'update') {
    updateTextStatus(data.spanText, data.checkbox);
  }
  updateTasksDone();
  updateTasksPending();
  createDockPage();
}
function createTask(data) {
  var taskListWrapper = document.createElement("div");
  taskListWrapper.classList.add('task-list__wrapper');
  taskListWrapper.setAttribute('data-id', data.idTask);
  var taskListElementInput = document.createElement("div");
  taskListElementInput.classList.add("task-list__element");
  taskListWrapper.append(taskListElementInput);
  var inputTitle = document.createElement("input");
  inputTitle.classList.add("task-list__title");
  inputTitle.setAttribute("type", "text");
  inputTitle.setAttribute("name", "nombre");
  inputTitle.setAttribute("value", data.nombre);
  inputTitle.setAttribute('readOnly', true);
  var inputDescription = document.createElement("input");
  inputDescription.classList.add("task-list__description");
  inputDescription.setAttribute("type", "text");
  inputDescription.setAttribute("name", "descripcion");
  inputDescription.setAttribute("value", data.descripcion);
  inputDescription.setAttribute('readOnly', true);
  taskListElementInput.appendChild(inputTitle);
  taskListElementInput.appendChild(inputDescription);
  var taskListElementOptions = document.createElement("div");
  taskListElementOptions.classList.add("task-list__element");
  taskListWrapper.append(taskListElementOptions);
  var taskListOptions = document.createElement("div");
  taskListOptions.classList.add("task-list__options");
  taskListElementOptions.append(taskListOptions);
  var iconMove = document.createElement('iconify-icon');
  iconMove.setAttribute('icon', "mdi:cursor-move");
  iconMove.classList.add('move-task');
  var iconOpenOptions = document.createElement("iconify-icon");
  iconOpenOptions.setAttribute('icon', 'fluent:options-20-filled');
  taskListOptions.append(iconMove);
  taskListOptions.append(iconOpenOptions);

  //Contenedor Botones de opciones
  var taskListOptionsButtons = document.createElement("div");
  taskListOptionsButtons.classList.add("task-list__options__btn", "task-list__options__btn--hidden");
  var divCloseOptions = document.createElement("div");
  divCloseOptions.classList.add("task-list__icon--close");
  var iconCloseOptions = document.createElement("iconify-icon");
  iconCloseOptions.classList.add("btn__close-options");
  iconCloseOptions.setAttribute("icon", "material-symbols:close");
  divCloseOptions.append(iconCloseOptions);
  taskListOptionsButtons.append(divCloseOptions);
  taskListOptions.append(taskListOptionsButtons);
  var divEditIcon = document.createElement("div");
  divEditIcon.classList.add("task-list__icon");
  var iconEdit = document.createElement("iconify-icon");
  iconEdit.setAttribute("icon", "material-symbols:edit-document");
  var spanEdit = document.createElement("span");
  spanEdit.textContent = 'Editar';
  divEditIcon.append(iconEdit);
  divEditIcon.append(spanEdit);
  taskListOptionsButtons.append(divEditIcon);
  var divSaveIcon = document.createElement("div");
  divSaveIcon.classList.add("task-list__icon", "task-list__icon--hidden");
  var iconSave = document.createElement("iconify-icon");
  iconSave.setAttribute("icon", "material-symbols:save-as");
  var spanSave = document.createElement("span");
  spanSave.textContent = 'Guardar';
  divSaveIcon.append(iconSave);
  divSaveIcon.append(spanSave);
  taskListOptionsButtons.append(divSaveIcon);
  var divCheckBox = document.createElement("div");
  divCheckBox.classList.add("task-list__icon");
  taskListOptionsButtons.append(divCheckBox);
  var checkboxWrapper = document.createElement("div");
  checkboxWrapper.classList.add("checkbox-wrapper");
  divCheckBox.appendChild(checkboxWrapper);
  var inputCheckbox = document.createElement("input");
  inputCheckbox.setAttribute("type", "checkbox");
  inputCheckbox.setAttribute("id", data.idTask);
  inputCheckbox.checked = data.estado ? true : false;
  inputCheckbox.value = 'done';
  var labelCheckbox = document.createElement("label");
  labelCheckbox.setAttribute("for", data.idTask);
  var spanButtonCheckbox = document.createElement("span");
  spanButtonCheckbox.classList.add("circle");
  var spanText = document.createElement("span");
  spanText.textContent = inputCheckbox.checked ? 'Realizado' : 'Pendiente';
  labelCheckbox.append(spanButtonCheckbox);
  checkboxWrapper.append(inputCheckbox);
  checkboxWrapper.append(labelCheckbox);
  checkboxWrapper.append(spanText);
  var divDeleteIcon = document.createElement("div");
  divDeleteIcon.classList.add("task-list__icon");
  var iconDelete = document.createElement('iconify-icon');
  iconDelete.setAttribute('icon', 'material-symbols:delete-forever-rounded');
  var spanDelete = document.createElement("span");
  spanDelete.textContent = "Eliminar";
  divDeleteIcon.append(iconDelete);
  divDeleteIcon.append(spanDelete);
  taskListOptionsButtons.append(divDeleteIcon);
  return taskListWrapper;
}
function updateTextStatus(span, checkbox) {
  span.textContent = checkbox.checked ? 'Realizada' : 'Pendiente';
}
function updateTasksDone() {
  var tasksDone = document.getElementById('tasks-done');
  if (tasksDone) {
    tasksDone.textContent = inputInfo.getInputDone();
  }
}
function updateTasksPending() {
  if (taskPending) {
    taskPending.textContent = inputInfo.getInputPending();
  }
}

/**
 * determina cuantas paginas de scroll hay
 * y le aplica estilos a la pagina seleccionada
 * 
 * 
 */
function pageSelected() {
  console.log("re");
  pages = Math.round(taskList.scrollWidth / taskList.offsetWidth);

  // redondea el width a un numero entero de la ventana de tareas
  var offsetWidth = Math.floor(taskList.scrollWidth / pages);

  // dot actual
  var index = Math.round(taskList.scrollLeft / offsetWidth);

  // se le aplican las clases al dock seleccionado
  selectDock(index);
}
function createDockPage() {
  console.log("create dock page");
  var length = Math.round(taskList.scrollWidth / taskList.offsetWidth);
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < length; i++) {
    var circle = document.createElement("span");
    circle.classList.add("task-dock__circle");
    fragment.append(circle);
  }
  if (taskDock) {
    while (taskDock.firstChild) {
      taskDock.removeChild(taskDock.firstChild);
    }
    taskDock.append(fragment);
  }
  pageSelected();
}
function selectDock(index) {
  var docks = document.querySelectorAll('.task-dock__circle');
  if (docks && docks.length > 0) {
    docks.forEach(function (dock) {
      dock.classList.remove("task-dock__circle--active");
    });
    docks[index].classList.add("task-dock__circle--active");
  }
}
function movePageAt(e) {
  var nextIndex = -1;
  var currentIndex = -1;
  if (e.target.classList.contains('task-dock__circle')) {
    if (!e.target.classList.contains('task-dock__circle--active')) {
      var selectedDot = e.target;
      var currentDot = taskDock.querySelector(".task-dock__circle--active");
      var dots = _toConsumableArray(document.querySelectorAll(".task-dock__circle"));
      if (dots && dots.length > 0) {
        nextIndex = dots.indexOf(selectedDot);
        currentIndex = dots.indexOf(currentDot);
        var desplazamiento = -1;
        var width = taskList.offsetWidth;
        if (nextIndex > currentIndex) {
          desplazamiento = nextIndex - currentIndex;
          taskList.scrollBy({
            top: 0,
            left: width * desplazamiento,
            behavior: "smooth"
          });
        } else {
          desplazamiento = -1 * (currentIndex - nextIndex);
          taskList.scrollBy({
            top: 0,
            left: width * desplazamiento,
            behavior: "smooth"
          });
        }
      }
    }
  }
}
function updateOrderTasks(tasks) {
  console.log(tasks);
  Promise.all(tasks.map(function (task, index) {
    return fetch("/to-do/".concat(task.dataset.id, "/order"), {
      headers: {
        "Content-Type": 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({
        order: index,
        idTask: task.dataset.id
      })
    }).then(function (res) {
      return console.log(index);
    });
  })).then(function (res) {
    console.log("aca res");
  });
}