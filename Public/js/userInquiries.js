const logOutBtn = document.querySelector(".nav__el.nav__el--cta");

const logout = async () => {
  try {
    const res = await fetch("/api/auth/logout", {
      method: "GET",
    });

    const data = await res.json();

    if (data.status === "success") location.assign("/");
  } catch (err) {
    console.log(err.response);
    alert("error", "Error logging out! Try again.");
  }
};

logOutBtn.addEventListener("click", logout);
