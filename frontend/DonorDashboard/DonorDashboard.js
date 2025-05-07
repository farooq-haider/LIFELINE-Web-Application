function rediretToHistory() {
  window.location.href = "../History/History.html";
}
async function toggleEdit(button, fieldId) {
  const currentElement = document.getElementById(fieldId);
  if (button.classList.contains("editing")) {
    // Save Mode

    const inputField = button.previousElementSibling;
    let data = {};
    if (fieldId === "contact") {
      data.phone = inputField.value;
    } else if (fieldId === "name") {
      data.name = inputField.value;
    }

    // const userSecret = JSON.parse(localStorage.getItem("userSecret"));
    const userSecret = JSON.parse(sessionStorage.getItem("userSecret"));
    const response = await fetch(`${BASE_URL}/api/donors/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userSecret}`,
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      alert("Update failed. Try again later.");
      return;
    }
    const newSpan = document.createElement("span");
    newSpan.id = fieldId;
    newSpan.textContent = inputField.value;
    newSpan.style.flex = "1";
    newSpan.style.marginLeft = "10px";

    inputField.parentNode.replaceChild(newSpan, inputField);
    button.innerHTML = '<i class="fas fa-edit"></i>';
    button.classList.remove("editing");
  } else {
    // Edit Mode

    const input = document.createElement("input");
    input.type = "text";
    input.value = currentElement.textContent;
    input.className = "edit-input";
    currentElement.parentNode.insertBefore(input, currentElement);
    currentElement.remove();
    button.innerHTML = '<i class="fas fa-save"></i>';
    button.classList.add("editing");
  }
}

document.addEventListener("DOMContentLoaded", async (e) => {
  e.preventDefault();
  fetch("../footer/footer.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("footer-container").innerHTML = data;
    })
    .catch((err) => console.error("Failed to load footer:", err));
  try {
    // const userSecret = JSON.parse(localStorage.getItem("userSecret"));
    const userSecret = JSON.parse(sessionStorage.getItem("userSecret"));
    const response = await fetch(`${BASE_URL}/api/donors/getDonor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userSecret}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      alert("Error while fetching user Data.");
      return;
    }
    const result = await response.json();

    const name = document.getElementById("name");
    const city = document.getElementById("city");
    const contact = document.getElementById("contact");
    const blood = document.getElementById("blood");

    const donor = result.donor;

    name.textContent = donor.name;
    contact.textContent = donor.phone;
    city.textContent = donor.city;
    blood.textContent = donor.bloodGroup;

    if (donor.lastDonation) {
      const lastDonationDate = new Date(donor.lastDonation);
      const currentDate = new Date();
      const eightWeeksInMilliseconds = 8 * 7 * 24 * 60 * 60 * 1000;

      if (currentDate - lastDonationDate > eightWeeksInMilliseconds) {
        // alert("Your last donation was over 8 weeks ago. You are eligible to donate again.");
      } else {
        alert(
          "Your last donation was within the last 8 weeks. You are advised to wait before donating again."
        );
      }
    }
  } catch (err) {
    alert("Oops. Something went wrong. Try again later.");
    console.log(err);
  }
});

async function deleteAccount() {
  // const userSecret = JSON.parse(localStorage.getItem("userSecret"));
  const userSecret = JSON.parse(sessionStorage.getItem("userSecret"));

  if (
    confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    )
  ) {
    // Proceed with account deletion logic
    const response = await fetch(`${BASE_URL}/api/donors/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userSecret}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      alert("Failed to delete account. Please try again later.");
      return;
    }

    alert("Account deleted successfully.");
    window.location.href = "../LandingPage/LandingPage.html";
  } else {
    // User canceled the action
    console.log("Account deletion canceled.");
  }
}

// Logout Popup Handling
const logoutLink = document.getElementById("logout-link");
const logoutPopup = document.getElementById("logout-popup");
const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.querySelector(".no-btn");

logoutLink.addEventListener("click", (e) => {
  e.preventDefault();
  logoutPopup.classList.remove("hidden");
});

noBtn.addEventListener("click", () => {
  logoutPopup.classList.add("hidden");
});

yesBtn.addEventListener("click", () => {
  window.location.href = "../LandingPage/LandingPage.html";
});
