function loadComponent(selector, filePath, callback) {
    fetch(filePath)
      .then(response => response.text())
      .then(data => {
        document.querySelector(selector).innerHTML = data;
        if (callback) callback();
      })
      .catch(err => console.error(`Failed to load ${filePath}:`, err));
  }
  
  function loadScript(path) {
    const script = document.createElement('script');
    script.src = path;
    document.body.appendChild(script);
  }
  
  window.addEventListener("DOMContentLoaded", () => {
    loadComponent("#header-container", "../header.html", () => {
      loadScript("../header.js");
    });
  
    loadComponent("#footer-container", "../footer.html");
  
    // Star rating interaction
    const stars = document.querySelectorAll(".star");
    let selectedRating = 0;
  
    stars.forEach(star => {
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
      stars.forEach(star => {
        if (parseInt(star.getAttribute("data-value")) <= value) {
          star.classList.add("selected");
        } else {
          star.classList.remove("selected");
        }
      });
    }
  });
  