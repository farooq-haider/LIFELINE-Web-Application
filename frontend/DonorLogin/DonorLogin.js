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

  const response = await fetch(`${BASE_URL}/api/donors/reset-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

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
