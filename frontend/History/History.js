function showForm() {
  document.getElementById("historyForm").style.display = "flex";
}

async function addHistory() {
  let date, volume;
  try {
    date = document.getElementById("historyDate").value;
    volume = document.getElementById("historyVolume").value;

    if (!date || !volume) {
      alert("Both fields are required!");
      return;
    }
    // const userSecret = JSON.parse(localStorage.getItem("userSecret"));
    const userSecret = JSON.parse(sessionStorage.getItem("userSecret"));
    const history = {
      volume: volume,
      donationDate: date,
    };
    const response = await fetch(`${BASE_URL}/api/donationHistory/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userSecret}`,
      },
      credentials: "include",
      body: JSON.stringify(history),
    });
    console.log(response.status);
    if (!response.ok) {
      alert("Error while adding History.");
      return;
    }
  } catch (err) {
    console.log(err);
    alert("Something went wrong, we are currently unable to add your history.");
    return;
  }
  const ticket = document.createElement("div");
  ticket.className = "ticket-card";
  const newDate = new Date(date);
  ticket.innerHTML = `
      <div class="ticket-date">${newDate.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}</div>
      <div class="ticket-desc">${volume} ml</div>
    `;

  document.getElementById("ticketsContainer").appendChild(ticket);

  // Reset fields
  document.getElementById("historyDate").value = "";
  document.getElementById("historyVolume").value = "";
  document.getElementById("historyForm").style.display = "none";
}

document.addEventListener("DOMContentLoaded", async () => {
  fetch("../footer/footer.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("footer-container").innerHTML = data;
    })
    .catch((err) => console.error("Failed to load footer:", err));
  try {
    // const userSecret = JSON.parse(localStorage.getItem("userSecret"));
    const userSecret = JSON.parse(sessionStorage.getItem("userSecret"));
    const response = await fetch(`${BASE_URL}/api/donationHistory/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userSecret}`,
      },
      credentials: "include",
    });
    if (!response.ok) {
      alert("Error while fetching History Data.");
      return;
    }
    const result = await response.json();
    result.history.forEach(function (item) {
      const ticket = document.createElement("div");
      ticket.className = "ticket-card";
      const date = new Date(item.donationDate);
      ticket.innerHTML = `
          <div class="ticket-date">${date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}</div>
          <div class="ticket-desc">${item.description}</div>
        `;

      document.getElementById("ticketsContainer").appendChild(ticket);
    });
  } catch (err) {
    console.log(err);
    alert(
      "Something went wrong, we are currently unable to show you your history."
    );
  }
});
