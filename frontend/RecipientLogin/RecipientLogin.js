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

    const res = await fetch(`${BASE_URL}/api/recipients/login`, {
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
      window.location.href = "../RecipientDashboard/RecipientDashboard.html";
    } else {
      alert("Incorrect Credentials. Please try again.");
    }
  } catch (err) {
    console.log(err);
    alert("Oops, Something went wrong. Try Again Later.");
  }
});

document.querySelector(".forgot-password a").addEventListener("click", (e) => {
  e.preventDefault();
  const popup = document.getElementById("forgot-password-popup");

  // Delay adding the outside-click listener to avoid immediate closure
  setTimeout(() => {
    function handleOutsideClick(event) {
      if (!popup.querySelector(".popup-content").contains(event.target)) {
        popup.classList.add("hidden");
        document.removeEventListener("click", handleOutsideClick);
      }
    }

    document.addEventListener("click", handleOutsideClick);
  }, 10);

  popup.classList.remove("hidden");
});


async function handleResetPassword() {
  const email = document.getElementById("reset-email").value;
  if (!email) {
    alert("Please enter your email.");
    return;
  }
  const response = await fetch(
    `http://127.0.0.1:3000/api/recipients/reset-email`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }
  );

  if (response.ok) {
    localStorage.setItem("resetEmail", JSON.stringify(email));
    alert("A reset link has been sent to your email. Please check your inbox.");
    window.location.href = "../landingPage/landingPage.html";
  } else {
    alert("Failed to send reset link. Please try again.");
  }

  // Trigger password reset logic
  console.log("Sending OTP to:", email); // placeholder
  document.getElementById("forgot-password-popup").classList.add("hidden");
  document.getElementById("otp-popup").classList.remove("hidden");
}
