let selectedEmails = [];

document.addEventListener("DOMContentLoaded", () => {
  // Load footer
  fetch("../footer/footer.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("footer-container").innerHTML = data;
    });

  const provinceCityMap = {
    punjab: [
      "Attock",
      "Bahawalnagar",
      "Bahawalpur",
      "Bhakkar",
      "Chakwal",
      "Chiniot",
      "Dera Ghazi Khan",
      "Faisalabad",
      "Gujranwala",
      "Gujrat",
      "Hafizabad",
      "Jhang",
      "Jhelum",
      "Kasur",
      "Khanewal",
      "Khushab",
      "Lahore",
      "Layyah",
      "Lodhran",
      "Mandi Bahauddin",
      "Mianwali",
      "Multan",
      "Muzaffargarh",
      "Narowal",
      "Nankana Sahib",
      "Okara",
      "Pakpattan",
      "Rahim Yar Khan",
      "Rajanpur",
      "Rawalpindi",
      "Sahiwal",
      "Sargodha",
      "Sheikhupura",
      "Sialkot",
      "Toba Tek Singh",
      "Vehari",
    ],
    sindh: [
      "Badin",
      "Dadu",
      "Ghotki",
      "Hyderabad",
      "Jacobabad",
      "Jamshoro",
      "Karachi",
      "Kashmore",
      "Khairpur",
      "Larkana",
      "Malir",
      "Mirpur Khas",
      "Naushahro Feroze",
      "Nawabshah",
      "Qambar Shahdadkot",
      "Sanghar",
      "Shikarpur",
      "Sujawal",
      "Sukkur",
      "Tando Allahyar",
      "Tando Muhammad Khan",
      "Tharparkar",
      "Thatta",
      "Umerkot",
    ],
    kpk: [
      "Abbottabad",
      "Bannu",
      "Batagram",
      "Charsadda",
      "Dera Ismail Khan",
      "Hangu",
      "Haripur",
      "Karak",
      "Kohat",
      "Kurram",
      "Lakki Marwat",
      "Lower Dir",
      "Mansehra",
      "Mardan",
      "Nowshera",
      "Peshawar",
      "Shangla",
      "Swabi",
      "Swat",
      "Tank",
      "Upper Dir",
    ],
    balochistan: [
      "Awaran",
      "Barkhan",
      "Chagai",
      "Dera Bugti",
      "Gwadar",
      "Harnai",
      "Hub",
      "Jafarabad",
      "Jhal Magsi",
      "Kalat",
      "Kech",
      "Kharan",
      "Khuzdar",
      "Killa Abdullah",
      "Killa Saifullah",
      "Kohlu",
      "Lasbela",
      "Loralai",
      "Mastung",
      "Musakhel",
      "Nasirabad",
      "Nushki",
      "Panjgur",
      "Pishin",
      "Quetta",
      "Sherani",
      "Sibi",
      "Sohbatpur",
      "Washuk",
      "Zhob",
      "Ziarat",
    ],
    ajk: [
      "Bagh",
      "Bhimber",
      "Hattian Bala",
      "Haveli",
      "Kotli",
      "Mirpur",
      "Muzaffarabad",
      "Neelum",
      "Poonch",
      "Sudhnoti",
    ],
    gilgitbaltistan: [
      "Astore",
      "Diamer",
      "Ghanche",
      "Ghizer",
      "Gilgit",
      "Hunza",
      "Kharmang",
      "Nagar",
      "Shigar",
      "Skardu",
    ],
  };

  const provinceCards = document.querySelectorAll(".province-card");
  const citySelect = document.getElementById("city");
  const clearBtn = document.getElementById("clearFilters");

  // Prevent user from selecting city without province
  citySelect.addEventListener("mousedown", (e) => {
    if (citySelect.disabled) {
      e.preventDefault();
      alert("Please select a province first.");
    }
  });

  // Handle province card selection
  provinceCards.forEach((card) => {
    card.addEventListener("click", () => {
      const province = card.getAttribute("data-province");

      // Remove 'selected' from all cards
      provinceCards.forEach((c) => c.classList.remove("selected"));

      // Add 'selected' to clicked one
      card.classList.add("selected");

      // Populate cities
      citySelect.innerHTML = '<option value="">Select City</option>';
      provinceCityMap[province].forEach((city) => {
        const option = document.createElement("option");
        option.value = city.toLowerCase();
        option.textContent = city;
        citySelect.appendChild(option);
      });

      citySelect.disabled = false;
    });
  });

  // 🔁 Clear filters on click
  clearBtn.addEventListener("click", () => {
    document.getElementById("bloodGroup").selectedIndex = 0;
    document.getElementById("urgency").selectedIndex = 0;
    document.getElementById("donorType").selectedIndex = 0;
    citySelect.innerHTML = '<option value="">Select City</option>';
    citySelect.disabled = true;

    provinceCards.forEach((card) => {
      card.classList.remove("selected");
    });
  });

  const notifyButton = document.getElementById("notify-email-btn");

  if (notifyButton) {
    notifyButton.addEventListener("click", async () => {
      const urgency = document.getElementById("urgency").value;
      try {
        // Send the API call
        const response = await fetch(`${BASE_URL}/api/donors/urg-notify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              sessionStorage.getItem("userSecret")
            )}`,
          },
          credentials: "include",
          body: JSON.stringify({ emails: selectedEmails, urgency }),
        });

        if (!response.ok) {
          alert("Failed to send notification request.");
          return;
        }

        const result = await response.json();
        alert("Notification request sent successfully!");
      } catch (error) {
        console.error("Error sending notification request:", error);
        alert("An error occurred while sending the notification request.");
      }
    });
  }
});

async function SearchDonors() {
  try {
    const blood = document.getElementById("bloodGroup").value;
    const verified = document.getElementById("donorType").value;
    const city = document.getElementById("city").value;

    const appliedFilters = { blood, verified, city };

    const response = await fetch(`${BASE_URL}/api/donors/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(appliedFilters),
    });
    if (!response.ok) {
      alert("Error while fetching donors.");
      return;
    }
    const result = await response.json();
    const data = result.donors;

    selectedEmails = data.map((donor) => donor.email);

    const container = document.getElementById("donor-cards-container");
    container.innerHTML = "";
    data.forEach((donor) => {
      const card = document.createElement("div");
      card.className = "donor-card";
      card.innerHTML = `
  <div class="avatar-wrapper">
    <img class="donor-image" src="../assets/avatar.png" alt="${donor.name}" />
    ${
      donor.verified
        ? '<img class="verified-icon" src="../assets/verified.png" alt="Verified">'
        : ""
    }
  </div>
  <div class="donor-details">
    <h3>${donor.name}</h3>
    <p><strong>Contact:</strong> ${donor.phone}</p>
    <p><strong>Email:</strong> ${donor.email}</p>
  </div>
`;

      const notifySection = document.getElementById("notify-section");

      if (data.length > 0) {
        notifySection.classList.remove("hidden");
      } else {
        notifySection.classList.add("hidden");
      }

      container.appendChild(card);
    });
  } catch (error) {
    console.log(error);
  }
}
