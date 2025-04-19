function toggleEdit(button, fieldId) {
  const currentElement = document.getElementById(fieldId);
  
  if (button.classList.contains('editing')) {
    // Save Mode
    const inputField = button.previousElementSibling;
    const newSpan = document.createElement('span');
    newSpan.id = fieldId;
    newSpan.textContent = inputField.value;
    newSpan.style.flex = "1";
    newSpan.style.marginLeft = "10px";

    inputField.parentNode.replaceChild(newSpan, inputField);
    button.innerHTML = '<i class="fas fa-edit"></i>';
    button.classList.remove('editing');
  } else {
    // Edit Mode
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentElement.textContent;
    input.className = 'edit-input';
    currentElement.parentNode.insertBefore(input, currentElement);
    currentElement.remove();
    button.innerHTML = '<i class="fas fa-save"></i>';
    button.classList.add('editing');
  }
}


document.addEventListener("DOMContentLoaded", () => {
  fetch("../footer/footer.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("footer-container").innerHTML = data;
    })
    .catch(err => console.error("Failed to load footer:", err));


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

});



