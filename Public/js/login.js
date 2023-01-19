const login = async (email, password) => {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.loginStatus === "success") {
      location.assign("/inquiry");
    } else {
      alert(data.wrongData);
    }
  } catch (error) {
    console.log(error);
  }
};

document.querySelector(".login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  login(email, password);
});
