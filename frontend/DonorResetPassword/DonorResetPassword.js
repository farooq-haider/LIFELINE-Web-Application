async function submitNewPassword() {
  const newPassword = document.getElementById("new-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (!newPassword || !confirmPassword) {
    alert("Please fill in both fields.");
    return;
  }

  if (newPassword !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  const email = JSON.parse(localStorage.getItem("resetEmail"));
  console.log(email);
  if (!email) {
    alert("No email found. Please request a password reset again.");
    return;
  }

  const response = await fetch(
    `http://127.0.0.1:3000/api/donors/reset-password`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password: newPassword }),
    }
  );

  if (!response.ok) {
    alert("Failed to reset password. Please try again.");
    return;
  }
  // localStorage.removeItem("resetEmail"); // Clear the email after successful reset

  alert("Password has been successfully reset.");
  window.location.href = "../DonorLogin/DonorLogin.html"; // Redirect to login page
}

function loadComponent(selector, filePath) {
  fetch(filePath)
    .then((response) => response.text())
    .then((data) => {
      document.querySelector(selector).innerHTML = data;
    })
    .catch((err) => console.error(`Failed to load ${filePath}:`, err));
}

function loadComponent(selector, filePath, callback) {
  fetch(filePath)
    .then((response) => response.text())
    .then((data) => {
      document.querySelector(selector).innerHTML = data;
      if (callback) callback(); // Run optional callback after loading
    })
    .catch((err) => console.error(`Failed to load ${filePath}:`, err));
}

function loadScript(path) {
  const script = document.createElement("script");
  script.src = path;
  document.body.appendChild(script);
}

window.addEventListener("DOMContentLoaded", () => {
  loadComponent("#header-container", "../header/header.html", () => {
    loadScript("../header/header.js"); // ✅ Load header.js after header.html is inserted
  });

  loadComponent("#footer-container", "../footer/footer.html");
});
