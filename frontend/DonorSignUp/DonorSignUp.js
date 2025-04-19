// DonorSignup.js

document.addEventListener("DOMContentLoaded", () => {
  fetch("../footer/footer.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("footer-container").innerHTML = data;
    })
    .catch((err) => console.error("Failed to load footer:", err));
});

document.addEventListener("DOMContentLoaded", () => {
  // Load footer
  fetch("../footer.html")
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

  const provinceSelect = document.getElementById("province");
  const citySelect = document.getElementById("city");

  provinceSelect.addEventListener("change", () => {
    const selectedProvince = provinceSelect.value;
    citySelect.innerHTML = '<option value="">Select City</option>';

    if (selectedProvince && provinceCityMap[selectedProvince]) {
      provinceCityMap[selectedProvince].forEach((city) => {
        const option = document.createElement("option");
        option.value = city.toLowerCase();
        option.textContent = city;
        citySelect.appendChild(option);
      });
    }
  });

  // 👇 Intercept clicks on City dropdown
  citySelect.addEventListener("mousedown", (e) => {
    const selectedProvince = provinceSelect.value;
    if (!selectedProvince) {
      e.preventDefault(); // Stop dropdown from opening
      alert("Please select a province first.");
    }
  });
});

const signUpForm = document.querySelector(".signup-form");
signUpForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  try {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    if (password.length < 8 || password.length > 15) {
      alert("Password must be between 8 and 15 characters long.");
      return;
    }
    if (password != confirmPassword) {
      alert(
        "Passwird miss match. Make sure the password and confirm password fields have the same password."
      );
      return;
    }

    const name = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("contact").value;
    const province = document.getElementById("province").value;
    const city = document.getElementById("city").value;
    const bloodGroup = document.getElementById("blood-group").value;

    const address = city + ", " + province;

    const response = fetch(`${BASE_URL}/api/donors/otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email }),
    });
    const userInput = prompt(
      "We sent an One Time Password to your Email, kindly enter it to verify your email: "
    );
    const res = await response;
    const result = await res.json();
    if (res.ok) {
      if (result.otp == userInput) {
        const donor = {
          name,
          email,
          password,
          address,
          city,
          phone,
          bloodGroup,
          lastDonation: "03-8-2022",
        };

        const response2 = await fetch(`${BASE_URL}/api/donors/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(donor),
        });

        if (response2.ok) {
          alert("Sign Up Successful!");
        } else {
          alert(response.json().error);
        }
      } else {
        alert("OTP Miss Match. Try Again.");
      }
    } else {
      alert("Something went wrong while sending the email. Try again.");
    }
  } catch (err) {
    console.log(e);
    alert(`Oops, Something went wrong. Try again later.${e}`);
  }
});
