setTimeout(() => {
  location.assign("/");
}, 3000);

const logout = async () => {
  try {
    const res = await fetch("/api/auth/logout", {
      method: "GET",
    });
  } catch (err) {
    alert("error", "Error logging out! Try again.");
  }
};

logout();
