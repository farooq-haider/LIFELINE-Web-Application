window.addEventListener("DOMContentLoaded", () => {
  // Load header and footer
  fetch("../header/header.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("header-container").innerHTML = data;
      const script = document.createElement("script");
      script.src = "../header/header.js";
      document.body.appendChild(script);
    });

  fetch("../footer/footer.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("footer-container").innerHTML = data;
    });

  // Eligibility check handler
  document
    .getElementById("check-eligibility-btn")
    .addEventListener("click", async () => {
      const donorData = await fetch(
        "http://127.0.0.1:3000/api/donors/getDonor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              sessionStorage.getItem("userSecret")
            )}`,
          },
        }
      );

      const donor = await donorData.json();

      if (!donorData.ok) {
        alert("Error fetching donor data. Please try again later.");
        return;
      }

      if (donor.donor.verified) {
        showPopup(
          "Already Verified",
          "You are already a verified donor. Thank you for your contribution!"
        );
        return;
      }

      const response = await fetch(
        "http://127.0.0.1:3000/api/donors/get-verified",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              sessionStorage.getItem("userSecret")
            )}`,
          },
        }
      );

      if (!response.ok) {
        alert("Error verifying user. Please try again later.");
      }

      const data = await response.json();
      // const isEligible = Math.random() > 0.5; // Simulate static rule
      showPopup(
        data.result
          ? "Congratulations! You have been verified."
          : "Sorry! You did not qualify for verification",
        data.result
          ? "You have met all criteria to become a verified donor."
          : "Please ensure you fulfill all the listed requirements before trying again."
      );
    });
});

function showPopup(title, message) {
  document.getElementById("popup-title").textContent = title;
  document.getElementById("popup-message").textContent = message;
  document.getElementById("verification-popup").classList.remove("hidden");
}

function closePopup() {
  document.getElementById("verification-popup").classList.add("hidden");
}
