export async function logout() {
  try {
    const res = await fetch("/api/auth/logout", {
      method: "GET",
    });

    const data = await res.json();

    if (data.status === "success") location.assign("/");
  } catch (err) {
    alert("error", "Error logging out! Try again.");
  }
}

export async function login(email, password) {
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
  } catch (error) {}
}
