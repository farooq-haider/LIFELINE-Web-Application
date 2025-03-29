document.addEventListener("DOMContentLoaded", () => {
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
  
    const provinceSelect = document.getElementById("province");
    const citySelect = document.getElementById("city");
  
    provinceSelect.addEventListener("change", () => {
      const selectedProvince = provinceSelect.value;
      citySelect.innerHTML = '<option value="">Select City</option>';
  
      if (selectedProvince && provinceCityMap[selectedProvince]) {
        provinceCityMap[selectedProvince].forEach(city => {
          const option = document.createElement("option");
          option.value = city.toLowerCase();
          option.textContent = city;
          citySelect.appendChild(option);
        });
      }
    });
  
    citySelect.addEventListener("mousedown", (e) => {
      const selectedProvince = provinceSelect.value;
      if (!selectedProvince) {
        e.preventDefault();
        alert("Please select a province first.");
      }
    });
  });
  