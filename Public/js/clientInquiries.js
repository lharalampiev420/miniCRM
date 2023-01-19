const logOutBtn = document.querySelector(".nav__el.nav__el--cta");

// Call API and create inquiry
const createInquiry = async function (inquiry) {
  try {
    const result = await fetch(`http://127.0.0.1:3000/api/inquiries`, {
      method: "POST",
      body: JSON.stringify({
        inquiry,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    location.reload();
  } catch (error) {
    console.log(error);
  }
};

// Call API and delete estimation
const deleteEstimation = async function (id) {
  try {
    const res = await fetch(`http://127.0.0.1:3000/api/inquiries/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    location.reload();
  } catch (error) {
    console.log(error);
  }
};

// Select button for create action
document
  .querySelector(".btn.btn--green.btn--small")
  .addEventListener("click", (e) => {
    if (!e.detail || e.detail == 1) {
      e.preventDefault();

      const inquiry = document.getElementById("text").value;

      if (!inquiry || inquiry.length <= 20) {
        return alert("Estimation consists of minimum 20 symbols !");
      }
      createInquiry(inquiry);
    }
  });

// Select all buttons for delete action
if (document.querySelector(".btn--delete")) {
  const list = document.querySelectorAll(".btn--delete");
  list.forEach(function (button) {
    button.addEventListener("click", (e) => {
      if (!e.detail || e.detail == 1) {
        e.preventDefault();

        const id = e.target.id;

        deleteEstimation(id);
      }
    });
  });
}

const logout = async () => {
  try {
    const res = await fetch("http://127.0.0.1:3000/api/auth/logout", {
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
