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
});

// const dummyDonors = [
//   {
//     name: "Farooq Haider",
//     contact: "+92 3344232311",
//     city: "Gujranwala",
//     blood_group: "A+",
//     verified: true,
//   },
//   {
//     name: "Ali Khan",
//     contact: "+92 3739992778",
//     city: "Lahore",
//     blood_group: "A+",
//     verified: false,
//   },
//   {
//     name: "Sara Ahmed",
//     contact: "+92 3082149175",
//     city: "Peshawar",
//     blood_group: "B+",
//     verified: false,
//   },
//   {
//     name: "Usman Tariq",
//     contact: "+92 3421750300",
//     city: "Quetta",
//     blood_group: "A+",
//     verified: true,
//   },
//   {
//     name: "Zara Nadeem",
//     contact: "+92 3854461057",
//     city: "Islamabad",
//     blood_group: "AB-",
//     verified: false,
//   },
//   {
//     name: "Hassan Raza",
//     contact: "+92 3178452303",
//     city: "Quetta",
//     blood_group: "O+",
//     verified: false,
//   },
//   {
//     name: "Ayesha Ali",
//     contact: "+92 3534792980",
//     city: "Karachi",
//     blood_group: "AB+",
//     verified: false,
//   },
//   {
//     name: "Bilal Javed",
//     contact: "+92 3017997633",
//     city: "Lahore",
//     blood_group: "B-",
//     verified: true,
//   },
//   {
//     name: "Fatima Noor",
//     contact: "+92 3423436494",
//     city: "Rawalpindi",
//     blood_group: "A-",
//     verified: true,
//   },
//   {
//     name: "Tariq Mehmood",
//     contact: "+92 3992679320",
//     city: "Quetta",
//     blood_group: "A-",
//     verified: false,
//   },
//   {
//     name: "Rabia Shah",
//     contact: "+92 3778319914",
//     city: "Karachi",
//     blood_group: "B-",
//     verified: true,
//   },
//   {
//     name: "Amna Khalid",
//     contact: "+92 3147795806",
//     city: "Peshawar",
//     blood_group: "O+",
//     verified: true,
//   },
//   {
//     name: "Noman Aslam",
//     contact: "+92 3429348671",
//     city: "Faisalabad",
//     blood_group: "A+",
//     verified: true,
//   },
//   {
//     name: "Sidra Yousaf",
//     contact: "+92 3952826326",
//     city: "Sialkot",
//     blood_group: "AB-",
//     verified: false,
//   },
//   {
//     name: "Hamza Iqbal",
//     contact: "+92 3782344223",
//     city: "Faisalabad",
//     blood_group: "A+",
//     verified: false,
//   },
//   {
//     name: "Komal Zafar",
//     contact: "+92 3753128307",
//     city: "Quetta",
//     blood_group: "B-",
//     verified: false,
//   },
//   {
//     name: "Waleed Nasir",
//     contact: "+92 3374337699",
//     city: "Quetta",
//     blood_group: "A+",
//     verified: true,
//   },
//   {
//     name: "Mariam Saeed",
//     contact: "+92 3386956092",
//     city: "Multan",
//     blood_group: "O-",
//     verified: false,
//   },
//   {
//     name: "Kashif Khan",
//     contact: "+92 3722102613",
//     city: "Quetta",
//     blood_group: "A-",
//     verified: true,
//   },
//   {
//     name: "Hiba Ali",
//     contact: "+92 3915936730",
//     city: "Quetta",
//     blood_group: "A-",
//     verified: true,
//   },
// ];

//let currentIndex = 0;
//const cardsPerBatch = 5;
// const container = document.getElementById("donor-cards-container");
// const loader = document.getElementById("loading-indicator");

// function renderCards(start, count) {
//   const fragment = document.createDocumentFragment();
//   const batch = dummyDonors.slice(start, start + count);

//   batch.forEach((donor) => {
//     const card = document.createElement("div");
//     card.className = "donor-card";
//     card.innerHTML = `
//   <div class="avatar-wrapper">
//     <img class="donor-image" src="../assets/avatar.png" alt="${donor.name}" />
//     ${
//       donor.verified
//         ? '<img class="verified-icon" src="../assets/verified.png" alt="Verified">'
//         : ""
//     }
//   </div>
//   <div class="donor-details">
//     <h3>${donor.name}</h3>
//     <p><strong>Contact:</strong> ${donor.contact}</p>
//     <p><strong>City:</strong> ${donor.city}</p>
//     <p><strong>Blood Group:</strong> ${donor.blood_group}</p>
//   </div>
// `;

//     fragment.appendChild(card);
//   });

//   container.appendChild(fragment);
//   currentIndex += count;
// }

// function showLoaderAndLoad() {
//   loader.classList.remove("hidden");
//   setTimeout(() => {
//     renderCards(currentIndex, cardsPerBatch);
//     loader.classList.add("hidden");
//   }, 800); // simulate loading
// }

// // Scroll detection
// window.addEventListener("scroll", () => {
//   const cards = document.querySelectorAll(".donor-card");
//   const lastCard = cards[cards.length - 3];
//   if (!lastCard) return;

//   const lastCardOffset = lastCard.getBoundingClientRect().top;
//   const viewportHeight = window.innerHeight;

//   if (lastCardOffset < viewportHeight && currentIndex < dummyDonors.length) {
//     showLoaderAndLoad();
//   }
// });

// // On Apply click → reset and load first batch
// document.querySelector(".apply-btn").addEventListener("click", () => {
//   container.innerHTML = "";
//   currentIndex = 0;
//   renderCards(currentIndex, cardsPerBatch);
// });

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

      container.appendChild(card);
    });
  } catch (error) {
    console.log(error);
  }
}
