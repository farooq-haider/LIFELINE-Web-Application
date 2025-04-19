function showForm() {
    document.getElementById('historyForm').style.display = 'flex';
  }
  
  function addHistory() {
    const date = document.getElementById('historyDate').value;
    const desc = document.getElementById('historyDesc').value;
  
    if (!date || !desc) {
      alert('Both fields are required!');
      return;
    }
  
    const ticket = document.createElement('div');
    ticket.className = 'ticket-card';
    ticket.innerHTML = `
      <div class="ticket-date">${date}</div>
      <div class="ticket-desc">${desc}</div>
    `;
  
    document.getElementById('ticketsContainer').appendChild(ticket);
  
    // Reset fields
    document.getElementById('historyDate').value = '';
    document.getElementById('historyDesc').value = '';
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    fetch("../footer.html")
      .then(res => res.text())
      .then(data => {
        document.getElementById("footer-container").innerHTML = data;
      })
      .catch(err => console.error("Failed to load footer:", err));
  });
  