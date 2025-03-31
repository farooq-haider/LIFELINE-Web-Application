

  document.addEventListener("DOMContentLoaded", () => {
    // Load footer
    fetch("../footer.html")
      .then(res => res.text())
      .then(data => {
        document.getElementById("footer-container").innerHTML = data;
      });
  
      const provinceCityMap = {
        punjab: [
          "Attock", "Bahawalnagar", "Bahawalpur", "Bhakkar", "Chakwal", "Chiniot",
          "Dera Ghazi Khan", "Faisalabad", "Gujranwala", "Gujrat", "Hafizabad",
          "Jhang", "Jhelum", "Kasur", "Khanewal", "Khushab", "Lahore", "Layyah",
          "Lodhran", "Mandi Bahauddin", "Mianwali", "Multan", "Muzaffargarh",
          "Narowal", "Nankana Sahib", "Okara", "Pakpattan", "Rahim Yar Khan",
          "Rajanpur", "Rawalpindi", "Sahiwal", "Sargodha", "Sheikhupura",
          "Sialkot", "Toba Tek Singh", "Vehari"
        ],
        sindh: [
          "Badin", "Dadu", "Ghotki", "Hyderabad", "Jacobabad", "Jamshoro",
          "Karachi", "Kashmore", "Khairpur", "Larkana", "Malir", "Mirpur Khas",
          "Naushahro Feroze", "Nawabshah", "Qambar Shahdadkot", "Sanghar",
          "Shikarpur", "Sujawal", "Sukkur", "Tando Allahyar", "Tando Muhammad Khan",
          "Tharparkar", "Thatta", "Umerkot"
        ],
        kpk: [
          "Abbottabad", "Bannu", "Batagram", "Charsadda", "Dera Ismail Khan",
          "Hangu", "Haripur", "Karak", "Kohat", "Kurram", "Lakki Marwat", "Lower Dir",
          "Mansehra", "Mardan", "Nowshera", "Peshawar", "Shangla", "Swabi",
          "Swat", "Tank", "Upper Dir"
        ],
        balochistan: [
          "Awaran", "Barkhan", "Chagai", "Dera Bugti", "Gwadar", "Harnai",
          "Hub", "Jafarabad", "Jhal Magsi", "Kalat", "Kech", "Kharan",
          "Khuzdar", "Killa Abdullah", "Killa Saifullah", "Kohlu", "Lasbela",
          "Loralai", "Mastung", "Musakhel", "Nasirabad", "Nushki", "Panjgur",
          "Pishin", "Quetta", "Sherani", "Sibi", "Sohbatpur", "Washuk",
          "Zhob", "Ziarat"
        ],
        ajk: [
          "Bagh", "Bhimber", "Hattian Bala", "Haveli", "Kotli", "Mirpur",
          "Muzaffarabad", "Neelum", "Poonch", "Sudhnoti"
        ],
        gilgitbaltistan: [
          "Astore", "Diamer", "Ghanche", "Ghizer", "Gilgit", "Hunza", "Kharmang",
          "Nagar", "Shigar", "Skardu"
        ]
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
    provinceCards.forEach(card => {
      card.addEventListener("click", () => {
        const province = card.getAttribute("data-province");
  
        // Remove 'selected' from all cards
        provinceCards.forEach(c => c.classList.remove("selected"));
  
        // Add 'selected' to clicked one
        card.classList.add("selected");
  
        // Populate cities
        citySelect.innerHTML = '<option value="">Select City</option>';
        provinceCityMap[province].forEach(city => {
          const option = document.createElement("option");
          option.value = city;
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
  
      provinceCards.forEach(card => {
        card.classList.remove("selected");
      });
    });
  });
  
