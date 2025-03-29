
// JS placeholder: Add interactivity as needed later
document.querySelector(".info-btn").addEventListener("click", function() {
    alert("Lifeline is a platform that connects blood donors with recipients efficiently.");
});

function loadComponent(selector, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.querySelector(selector).innerHTML = data;
        })
        .catch(err => console.error(`Failed to load ${filePath}:`, err));
}

window.addEventListener("DOMContentLoaded", () => {
    loadComponent("#header-container", "../header.html");
    loadComponent("#footer-container", "../footer.html");
});


// Show popup on 'Request Blood' card click
document.querySelector(".feature-card.pink").addEventListener("click", () => {
    document.getElementById("account-popup").classList.remove("hidden");
});

// Redirects
document.getElementById("yes-btn").addEventListener("click", () => {
    window.location.href = "../Login/Login.html";
});

document.getElementById("no-btn").addEventListener("click", () => {
    window.location.href = "../RecipientSignUp/RecipientSignUp.html";
});

// Optional: Close popup when clicking outside (optional enhancement)
document.getElementById("account-popup").addEventListener("click", function (e) {
    if (e.target.id === "account-popup") {
        this.classList.add("hidden");
    }
});
