import { logout } from "./mixins.js";

const logOutBtn = document.querySelector(".nav__el.nav__el--cta");

// Call API and create inquiry
const createInquiry = async function (inquiry) {
  try {
    const result = await fetch(`/api/inquiries`, {
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
  } catch (error) {}
};

// Call API and delete estimation
const deleteInquiry = async function (id) {
  try {
    const res = await fetch(`/api/inquiries/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    location.reload();
  } catch (error) {}
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

        const { id } = e.target;

        deleteInquiry(id);
      }
    });
  });
}

logOutBtn.addEventListener("click", logout);
