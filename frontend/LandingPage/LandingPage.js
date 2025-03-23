
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
