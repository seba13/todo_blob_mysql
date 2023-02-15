"use strict";

var hamburger = document.getElementById("hamburger");
var nav = document.getElementById("nav");
var showHideNav = function showHideNav(e) {
  console.log("showhidenav");
  hamburger.classList.toggle('hamburger--active');
  nav.classList.toggle("nav--hidden");
};
var hideMenu = function hideMenu(e) {
  if (!nav.classList.contains("nav--hidden")) {
    console.log("dentro hidemenu");
    if (e.target.closest('.hamburger') != hamburger && e.target.closest('nav') != nav) {
      hamburger.classList.toggle('hamburger--active');
      nav.classList.add("nav--hidden");
    }
  }
};
if (hamburger) {
  hamburger.addEventListener('click', showHideNav);
}
document.addEventListener("click", hideMenu);