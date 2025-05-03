loginForm = document.querySelector(".login-form");

document.addEventListener("DOMContentLoaded", () => {
  fetch("../footer/footer.html")
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
      const data = await res.json();
      // localStorage.setItem("userSecret", JSON.stringify(data.userSecret));
      sessionStorage.setItem("userSecret", JSON.stringify(data.userSecret));
      window.location.href = "../DonorDashboard/DonorDashboard.html";
    } else {
      alert("User with given Email and Password does not exist.");
    }
  } catch (e) {
    console.log(e);
    alert("Oops, Something went wrong. Try Again Later.");
  }
});


document.querySelector(".forgot-password a").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("forgot-password-popup").classList.remove("hidden");
});

function handleResetPassword() {
  const email = document.getElementById("reset-email").value;
  if (!email) {
    alert("Please enter your email.");
    return;
  }

  // Trigger password reset logic
  console.log("Sending OTP to:", email); // placeholder
  document.getElementById("forgot-password-popup").classList.add("hidden");
  document.getElementById("otp-popup").classList.remove("hidden");
}
