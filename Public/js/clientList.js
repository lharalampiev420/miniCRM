const logOutBtn = document.querySelector(".nav__el.nav__el--cta");

const form = document.getElementById("form");
const search = document.getElementById("query");

const logout = async () => {
  try {
    const res = await fetch("http://127.0.0.1:3000/api/auth/logout", {
      method: "GET",
    });

    const data = await res.json();

    if (data.status === "success") location.assign("/");
  } catch (err) {
    alert("error", "Error logging out! Try again.");
  }
};

logOutBtn.addEventListener("click", logout);

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
  } catch (error) {
    console.log(error);
  }

  console.log(searchQuery);
});
