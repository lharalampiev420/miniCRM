import { logout } from "./mixins.js";
const logOutBtn = document.querySelector(".nav__el.nav__el--cta");

const form = document.getElementById("form");
const search = document.getElementById("query");

logOutBtn.addEventListener("click", logout);

// Search form
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const searchQuery = search.value;

  try {
    const res = await fetch(`/api/users/${searchQuery}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.status === "success") {
      location.assign(`/clients/${searchQuery}`);
    } else {
      alert(data.wrongData);
    }
  } catch (error) {}
});
