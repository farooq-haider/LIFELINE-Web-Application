function toggleEdit(button, fieldId) {
  const currentElement = document.getElementById(fieldId);

  if (button.classList.contains("editing")) {
    // Save Mode
    const inputField = button.previousElementSibling;
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

document.addEventListener("DOMContentLoaded", () => {
  fetch("../footer.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("footer-container").innerHTML = data;
    })
    .catch((err) => console.error("Failed to load footer:", err));
});

async function deleteAccount() {
  const userSecret = JSON.parse(localStorage.getItem("userSecret"));

  if (
    confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    )
  ) {
    // Proceed with account deletion logic
    const response = await fetch(`http://127.0.0.1:3000/api/donors/delete`, {
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
    window.location.href = "../LandingPage/landingPage.html";
  } else {
    // User canceled the action
    console.log("Account deletion canceled.");
  }
}
