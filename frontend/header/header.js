const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Target navbar links
const signupLink = document.querySelectorAll('.nav-links a')[0];
const loginLink = document.querySelectorAll('.nav-links a')[1];

// Keep track of action (sign up or login)
let actionType = ''; // 'signup' or 'login'

// Show popup on Sign Up click
signupLink.addEventListener('click', (e) => {
  e.preventDefault();
  actionType = 'signup';
  document.getElementById('role-popup').classList.remove('hidden');
});

// Show popup on Login click
loginLink.addEventListener('click', (e) => {
  e.preventDefault();
  actionType = 'login';
  document.getElementById('role-popup').classList.remove('hidden');
});

// Role selection buttons
document.getElementById('recipient-card').addEventListener('click', () => {
  if (actionType === 'signup') {
    window.location.href = '../RecipientSignUp/RecipientSignUp.html';
  } else if (actionType === 'login') {
    window.location.href = '../RecipientLogin/RecipientLogin.html';
  }
});

document.getElementById('donor-card').addEventListener('click', () => {
  if (actionType === 'signup') {
    window.location.href = '../DonorSignUp/DonorSignUp.html';
  } else if (actionType === 'login') {
    window.location.href = '../DonorLogin/DonorLogin.html';
  }
});

// Hide popup when clicking outside
document.getElementById('role-popup').addEventListener('click', (e) => {
  if (e.target.id === 'role-popup') {
    document.getElementById('role-popup').classList.add('hidden');
  }
});
