// ----------------------------
// DROPDOWN MENU
// ----------------------------
const dropBtn = document.querySelector(".dropbtn");
const dropdown = document.querySelector(".dropdown-content");

dropBtn.addEventListener("click", () => {
    dropdown.classList.toggle("show");
});

document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown")) {
        dropdown.classList.remove("show");
    }
});

// ----------------------------
// SCREEN ANIMATION
// ----------------------------
function animateScreen() {
    const screen = document.getElementById("phoneScreen");
    screen.classList.remove("show");
    setTimeout(() => screen.classList.add("show"), 50);
}

// ----------------------------
// MAIN FEATURE HANDLER
// ----------------------------
function openFeature(type) {
    const screen = document.getElementById("phoneScreen");

    // ----------------------------
    // HOME SCREEN
    // ----------------------------
    if (type === "home") {
        animateScreen();
        screen.innerHTML = `
            <h3>SAFE App Home</h3>
            <div class="icon-grid">
                <div class="app-icon" onclick="openFeature('profile')">👤<br><span>Profile</span></div>
                <div class="app-icon" onclick="openFeature('alerts')">🚨<br><span>SOS</span></div>
                <div class="app-icon" onclick="openFeature('child')">🧒<br><span>Child</span></div>
                <div class="app-icon" onclick="openFeature('disaster')">🌪<br><span>Disaster</span></div>
                <div class="app-icon" onclick="openFeature('locate')">📍<br><span>Locate</span></div>
                <div class="app-icon" onclick="openFeature('travel')">✈️<br><span>Travel</span></div>
            </div>
        `;
    }

    // ----------------------------
    // PROFILE SCREEN
    // ----------------------------
    if (type === "profile") {
        animateScreen();
        screen.innerHTML = `
            <h3>User Profile</h3>

            <label>Name:</label>
            <input id="pName" type="text">

            <label>Height (cm):</label>
            <input id="pHeight" type="number">

            <label>Weight (kg):</label>
            <input id="pWeight" type="number">

            <label>Blood Type:</label>
            <input id="pBlood" type="text">

            <label>Allergies:</label>
            <input id="pAllergies" type="text">

            <label>Medications:</label>
            <input id="pMeds" type="text">

            <label>Emergency Contact:</label>
            <input id="pEmergency" type="text">

            <h4>Add Family Member</h4>
            <input id="familyName" type="text" placeholder="Family Member Name">
            <button id="addFamilyBtn">Add</button>

            <ul id="familyList"></ul>

            <button id="saveProfileBtn" class="save-btn">Save Profile</button>
        `;

        const saveBtn = document.getElementById("saveProfileBtn");
        const addFamilyBtn = document.getElementById("addFamilyBtn");
        const familyList = document.getElementById("familyList");

        let familyMembers = [];

        addFamilyBtn.addEventListener("click", () => {
            const name = document.getElementById("familyName").value;
            if (name.trim() !== "") {
                familyMembers.push(name);
                familyList.innerHTML += `<li>${name}</li>`;
                document.getElementById("familyName").value = "";
            }
        });

        saveBtn.addEventListener("click", () => {
            const profile = {
                name: document.getElementById("pName").value,
                height: document.getElementById("pHeight").value,
                weight: document.getElementById("pWeight").value,
                blood: document.getElementById("pBlood").value,
                allergies: document.getElementById("pAllergies").value,
                meds: document.getElementById("pMeds").value,
                emergency: document.getElementById("pEmergency").value,
                family: familyMembers
            };

            localStorage.setItem("safeProfile", JSON.stringify(profile));

            screen.innerHTML = `
                <h3>Profile Saved Successfully!</h3>
                <p>Your information has been securely stored.</p>
                <button class="save-btn" onclick="openFeature('home')">Back to Home</button>
            `;
        });
    }

    // ----------------------------
    // SOS ALERTS
    // ----------------------------
  if (type === "alerts") {
    animateScreen();
    screen.innerHTML = `
        <h3>Emergency Alerts</h3>
        <p>Press and hold to send SOS</p>
        <button id="sosButton" class="sos-red-btn">Hold SOS</button>
        <p id="countdownText"></p>

        <div id="sosModal" class="sos-modal hidden">
            <div class="sos-modal-content">
                <h3>🚨 Emergency Alert Sent</h3>
                <p>Your location and medical profile have been shared with your family members.</p>
                <button id="closeModal" class="close-btn">Close</button>
            </div>
        </div>
    `;

    const btn = document.getElementById("sosButton");
    const text = document.getElementById("countdownText");
    const modal = document.getElementById("sosModal");
    const closeModal = document.getElementById("closeModal");

    let timer;

    btn.addEventListener("mousedown", () => {
        let count = 3;
        text.textContent = "Sending in " + count + "...";

        timer = setInterval(() => {
            count--;
            if (count > 0) {
                text.textContent = "Sending in " + count + "...";
            } else {
                text.textContent = "🚨 SOS SENT!";
                modal.classList.remove("hidden");
                clearInterval(timer);
            }
        }, 1000);
    });

    btn.addEventListener("mouseup", () => {
        clearInterval(timer);
        text.textContent = "";
    });

    closeModal.addEventListener("click", () => {
        modal.classList.add("hidden");
    });
}


    // ----------------------------
    // CHILD MODE
    // ----------------------------
   if (type === "child") {
    animateScreen();
    screen.innerHTML = `
        <h3>Child Safety Mode</h3>
        <p>Enable restricted mode for children.</p>
        <button id="childBtn">Activate Child Mode</button>
        <p id="childStatus"></p>
    `;

    document.getElementById("childBtn").addEventListener("click", () => {
        document.getElementById("childStatus").textContent = "🧒 Child Safety Mode Activated";
    });
}


    // ----------------------------
    // DISASTER MODE
    // ----------------------------
   if (type === "disaster") {
    animateScreen();
    screen.innerHTML = `
        <h3>Disaster Mode</h3>
        <p>Hold to enable offline emergency tools.</p>
        <button id="disasterBtn" class="sos-red-btn">Hold to Enable</button>
        <p id="disasterCountdown"></p>
        <p id="disasterStatus"></p>
    `;

    const btn = document.getElementById("disasterBtn");
    const text = document.getElementById("disasterCountdown");
    const status = document.getElementById("disasterStatus");

    let timer;

    btn.addEventListener("mousedown", () => {
        let count = 3;
        text.textContent = "Enabling in " + count + "...";

        timer = setInterval(() => {
            count--;
            if (count > 0) {
                text.textContent = "Enabling in " + count + "...";
            } else {
                text.textContent = "🌪 Disaster Mode Enabled";
                status.innerHTML = `
                    <strong>Regroupment Point Activated:</strong><br>
                    Family rally point set at your home address.
                `;
                clearInterval(timer);
            }
        }, 1000);
    });

    btn.addEventListener("mouseup", () => {
        clearInterval(timer);
        text.textContent = "";
    });
}


    // ----------------------------
    // LOCATE FAMILY
    // ----------------------------
   if (type === "locate") {
    animateScreen();
    screen.innerHTML = `
        <h3>Locate Family Member</h3>
        <div class="map-box">
            <div class="map-pin" style="top: 45%; left: 50%;">📍 Dad</div>
            <div class="map-pin" style="top: 60%; left: 30%;">📍 Mom</div>
            <div class="map-pin" style="top: 25%; left: 70%;">📍 Child</div>
        </div>
        <p>Simulated family locations.</p>
    `;
}

    // ----------------------------
    // TRAVEL MODE
    // ----------------------------
  if (type === "travel") {
    animateScreen();
    screen.innerHTML = `
        <h3>Travel Safety</h3>
        <p>Share your live location while traveling.</p>

        <label>Select family member to share with:</label>
        <select id="travelSelect">
            <option>Dad</option>
            <option>Mom</option>
            <option>Child</option>
        </select>

        <button id="startTravelBtn">Start Travel Mode</button>

        <p id="travelStatus"></p>
    `;

    document.getElementById("startTravelBtn").addEventListener("click", () => {
        const member = document.getElementById("travelSelect").value;
        document.getElementById("travelStatus").innerHTML =
            `✈️ Travel Mode Started<br>Location shared with <strong>${member}</strong>`;
    });
}

    // ----------------------------
    // GPS SIMULATION
    // ----------------------------
    if (type === "gps") {
        animateScreen();
        screen.innerHTML = `
            <h3>GPS Simulation</h3>
            <p>Your simulated location updates every second.</p>
            <div id="gpsBox" class="gps-box">
                <p><strong>Latitude:</strong> <span id="lat"></span></p>
                <p><strong>Longitude:</strong> <span id="lon"></span></p>
            </div>
        `;

        function randomCoord(base) {
            return (base + (Math.random() - 0.5) * 0.01).toFixed(6);
        }

        let lat = 30.4583;
        let lon = -86.6210;

        setInterval(() => {
            document.getElementById("lat").textContent = randomCoord(lat);
            document.getElementById("lon").textContent = randomCoord(lon);
        }, 1000);
    }
}

// ----------------------------
// CREATE PROFILE FORM HANDLING
// ----------------------------
const profileForm = document.getElementById("profileForm");

if (profileForm) {
    profileForm.addEventListener("submit", function(e) {
        e.preventDefault();

        // Collect form data
        const formData = {
            name: profileForm.name.value,
            email: profileForm.email.value,
            medical: profileForm.medical.value,
            allergies: profileForm.allergies.value,
            emergency: profileForm.emergency.value
        };

        // Save to localStorage
        localStorage.setItem("safeQuickProfile", JSON.stringify(formData));

        // Close dropdown
        dropdown.classList.remove("show");

        // Show confirmation inside phone screen
        const screen = document.getElementById("phoneScreen");
        if (screen) {
            animateScreen();
            screen.innerHTML = `
                <h3>Profile Saved</h3>
                <p>Your profile has been added successfully.</p>
                <button class="save-btn" onclick="openFeature('home')">Back to Home</button>
            `;
        }
    });
}

// ----------------------------
// SAFE LOGO CLICK HANDLER
// ----------------------------
const safeLogo = document.getElementById("safeLogo");

if (safeLogo) {
    safeLogo.addEventListener("click", () => {
        const screen = document.getElementById("phoneScreen");
        if (screen) {
            animateScreen();
            screen.innerHTML = `
                <div style="text-align:center; padding:20px;">
                    <img src="images/safe-logo.png" 
                         alt="SAFE Logo" 
                         style="width:120px; margin-bottom:15px;">
                    <h2>SAFE</h2>
                    <p style="font-size:1.1rem; line-height:1.5;">
                        Keeping your family safe, and managing your emergency better.
                    </p>
                </div>
            `;

            // Auto transition to Home
            setTimeout(() => openFeature('home'), 1500);
        }
    });
}

