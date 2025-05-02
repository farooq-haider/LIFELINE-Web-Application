
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

function loadComponent(selector, filePath, callback) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.querySelector(selector).innerHTML = data;
            if (callback) callback(); // Run optional callback after loading
        })
        .catch(err => console.error(`Failed to load ${filePath}:`, err));
}

function loadScript(path) {
    const script = document.createElement('script');
    script.src = path;
    document.body.appendChild(script);
}

window.addEventListener("DOMContentLoaded", () => {
    loadComponent("#header-container", "../header/header.html", () => {
        loadScript("../header/header.js"); // ✅ Load header.js after header.html is inserted
    });

    loadComponent("#footer-container", "../footer/footer.html");
});



// Show the appropriate popup based on which card is clicked
document.querySelectorAll(".feature-card.pink").forEach(card => {
    const heading = card.querySelector("h3").textContent.trim();

    card.addEventListener("click", () => {
        if (heading === "Request Blood") {
            document.getElementById("account-popup").classList.remove("hidden");
        } else if (heading === "Donate Blood") {
            document.getElementById("donate-popup").classList.remove("hidden");
        }
    });
});

// Redirects
document.getElementById("yes-btn").addEventListener("click", () => {
    window.location.href = "../RecipientLogin/RecipientLogin.html";
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


// Donate Blood Redirects
document.getElementById("donate-yes-btn").addEventListener("click", () => {
    window.location.href = "../DonorLogin/DonorLogin.html";
});

document.getElementById("donate-no-btn").addEventListener("click", () => {
    window.location.href = "../DonorSignUp/DonorSignUp.html";
});

// Optional: Close popup when clicking outside
document.getElementById("donate-popup").addEventListener("click", function (e) {
    if (e.target.id === "donate-popup") {
        this.classList.add("hidden");
    }
});


// Animate extra cards when they come into view
const extraCards = document.querySelectorAll(".extra-card");

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            observer.unobserve(entry.target); // animate only once
        }
    });
}, {
    threshold: 0.2
});

extraCards.forEach(card => {
    observer.observe(card);
});
