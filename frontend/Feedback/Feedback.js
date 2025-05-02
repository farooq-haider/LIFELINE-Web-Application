function loadComponent(selector, filePath, callback) {
  fetch(filePath)
    .then((response) => response.text())
    .then((data) => {
      document.querySelector(selector).innerHTML = data;
      if (callback) callback();
    })
    .catch((err) => console.error(`Failed to load ${filePath}:`, err));
}

function loadScript(path) {
  const script = document.createElement("script");
  script.src = path;
  document.body.appendChild(script);
}

window.addEventListener("DOMContentLoaded", () => {
  // Load header and footer components
  loadComponent("#header-container", "../header/header.html", () => {
    loadScript("../header/header.js");
  });
  loadComponent("#footer-container", "../footer/footer.html");

  // Star rating interaction
  const stars = document.querySelectorAll(".star");
  const feedbackInput = document.querySelector(".feedback-input");
  const submitButton = document.querySelector(".submit-btn");
  let selectedRating = 0;

  // Highlight stars on hover and click
  stars.forEach((star) => {
    star.addEventListener("mouseover", () => {
      const val = star.getAttribute("data-value");
      highlightStars(val);
    });

    star.addEventListener("mouseout", () => {
      highlightStars(selectedRating);
    });

    star.addEventListener("click", () => {
      selectedRating = star.getAttribute("data-value");
      highlightStars(selectedRating);
    });
  });

  function highlightStars(value) {
    stars.forEach((star) => {
      if (parseInt(star.getAttribute("data-value")) <= value) {
        star.classList.add("selected");
      } else {
        star.classList.remove("selected");
      }
    });
  }

  // Handle feedback submission
  submitButton.addEventListener("click", () => {
    const feedbackText = feedbackInput.value.trim();

    if (!selectedRating) {
      alert("Please select a star rating.");
      return;
    }

    if (!feedbackText) {
      alert("Please write your feedback.");
      return;
    }

    const userSecret = JSON.parse(sessionStorage.getItem("userSecret"));
    console.log("User Secret:", userSecret); // Debugging line
    if (!userSecret) {
      window.location.href = "../DonorLogin/DonorLogin.html";
    }

    // Pass the rating and feedback text to a function
    submitFeedback(selectedRating, feedbackText);
  });
});

// Function to handle feedback submission
async function submitFeedback(rating, feedback) {
  console.log("Rating:", rating);
  console.log("Feedback:", feedback);

  // const userSecret = JSON.parse(localStorage.getItem("userSecret"));
  const userSecret = JSON.parse(sessionStorage.getItem("userSecret"));
  // Example: Send data to the server
  const response = await fetch(`${BASE_URL}/api/feedback/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userSecret}`,
    },
    credentials: "include",
    body: JSON.stringify({ rating, content: feedback }),
  });

  if (!response.ok) {
    alert("Error while submitting feedback.");
    return;
  }

  window.location.href = "../landingPage/LandingPage.html";
  alert("Feedback submitted successfully!");
}
