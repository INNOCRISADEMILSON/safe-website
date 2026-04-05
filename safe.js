// ----------------------------
// DROPDOWN MENU
// ----------------------------
const dropBtn = document.querySelector(".dropbtn");
const dropdown = document.querySelector(".dropdown-content");

dropBtn.addEventListener("click", () => {
    dropdown.classList.toggle("show");
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown")) {
        dropdown.classList.remove("show");
    }
});

// ----------------------------
// PROFILE FORM HANDLER
// ----------------------------
document.getElementById("profileForm").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Profile saved! (Demo only)");
    dropdown.classList.remove("show");
});

// ----------------------------
// SOS BUTTON HOLD LOGIC
// ----------------------------
const sosButton = document.getElementById("sosButton");
const countdown = document.getElementById("countdown");
const modal = document.getElementById("sosModal");
const closeModal = document.getElementById("closeModal");

let holdTimer;
let timeLeft = 3;

sosButton.addEventListener("mousedown", () => {
    countdown.classList.remove("hidden");
    timeLeft = 3;
    countdown.textContent = timeLeft;

    holdTimer = setInterval(() => {
        timeLeft--;
        countdown.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(holdTimer);
            countdown.classList.add("hidden");
            modal.classList.remove("hidden");
        }
    }, 1000);
});

sosButton.addEventListener("mouseup", () => {
    clearInterval(holdTimer);
    countdown.classList.add("hidden");
});

closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
});

