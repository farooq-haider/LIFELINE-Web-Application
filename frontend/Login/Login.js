loginForm = document.querySelector(".login-form");

document.addEventListener("DOMContentLoaded", () => {
  fetch("../footer.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("footer-container").innerHTML = data;
    });
});

loginForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  try {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${BASE_URL}/api/donors/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      alert("Login Successful");
    } else {
      alert("User with given Email and Password does not exist.");
    }
  } catch (e) {
    console.log(e);
    alert("Oops, Something went wrong. Try Again Later.");
  }
});
