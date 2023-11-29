import { logout } from "./mixins.js";

const logOutBtn = document.querySelector(".nav__el.nav__el--cta");

logOutBtn.addEventListener("click", logout);