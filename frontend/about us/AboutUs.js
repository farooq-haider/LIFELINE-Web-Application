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
  });
  
  // Animate cards on scroll
  const extraCards = document.querySelectorAll(".extra-card");
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });
  
  extraCards.forEach(card => {
    observer.observe(card);
  });
  