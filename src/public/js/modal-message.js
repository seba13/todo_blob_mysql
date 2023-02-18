"use strict";

var modalMessage = document.getElementById('modal-message');
if (modalMessage) {
  modalMessage.addEventListener('animationend', function (e) {
    if (e.animationName == 'hide') {
      e.target.remove();
    }
  });
}

/**
 * 
 * @param {*} data  {flag: boolean, title: string, message: string}
 */
function createModalMessage(data) {
  var modalMessage = document.createElement('div');
  modalMessage.classList.add('modal-message', data.flag ? 'modal-message--success' : 'modal-message--error');
  var modalMessageTitle = document.createElement('p');
  modalMessageTitle.classList.add('modal-message__title');
  modalMessageTitle.textContent = data.title;
  modalMessage.append(modalMessageTitle);

  // En caso de que se reciba un array de errores listarlos en distintos parrafos
  if (Array.isArray(data.message)) {
    data.message.forEach(function (message) {
      var modalMessageDescription = document.createElement('p');
      modalMessageDescription.classList.add('modal-message__message');
      modalMessageDescription.textContent = message;
      modalMessage.append(modalMessageDescription);
    });
  } else {
    var modalMessageDescription = document.createElement('p');
    modalMessageDescription.classList.add('modal-message__message');
    modalMessageDescription.textContent = data.message;
    modalMessage.append(modalMessageDescription);
  }
  document.body.append(modalMessage);
  modalMessage.addEventListener('animationend', function (e) {
    if (e.animationName == 'hide') {
      e.target.remove();
    }
  });
}