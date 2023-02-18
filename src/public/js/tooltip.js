"use strict";

function createTooltip(message) {
  var tooltip = document.createElement('span');
  tooltip.classList.add('tooltip');
  var text = document.createElement('p');
  text.textContent = message;
  tooltip.append(text);
}