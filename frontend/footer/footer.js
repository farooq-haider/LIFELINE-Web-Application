function handleFeedbackClick() {
  const userSecret = JSON.parse(sessionStorage.getItem("userSecret"));
  console.log("User Secret:", userSecret); // Debugging line
  if (!userSecret) {
    window.location.href = "../DonorLogin/DonorLogin.html";
  } else {
    window.location.href = "../Feedback/Feedback.html";
  }
}
