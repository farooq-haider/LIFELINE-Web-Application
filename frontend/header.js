const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Target both navbar links
const signupLink = document.querySelectorAll('.nav-links a')[0];
const loginLink = document.querySelectorAll('.nav-links a')[1];

// Show role selection popup on Sign Up click
signupLink.addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('role-popup').classList.remove('hidden');
});

// Redirect to login page on Login click
loginLink.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = '../Login/Login.html';
});
ss
  
  document.getElementById('recipient-card').addEventListener('click', () => {
    window.location.href = '../RecipientSignUp/RecipientSignUp.html';


  });
  
  document.getElementById('donor-card').addEventListener('click', () => {
    
    window.location.href = '../DonorSignUp/DonorSignUp.html';
  });
  
  document.getElementById('role-popup').addEventListener('click', (e) => {
    if (e.target.id === 'role-popup') {
      document.getElementById('role-popup').classList.add('hidden');
    }
  });
  
  