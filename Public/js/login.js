const login = async (email, password) => {
  try {
    const res = await fetch("http://127.0.0.1:3000/api/auth/login", {
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

// export const logout = async () => {
//   try {
//     console.log("click");
//     const res = await fetch("http://127.0.0.1:3000/api/auth/logout", {
//       method: "GET",
//     });

//     const data = await res.json();

//     if (data.status === "success") location.reload(true);
//   } catch (err) {
//     console.log(err.response);
//     alert("error", "Error logging out! Try again.");
//   }
// };
