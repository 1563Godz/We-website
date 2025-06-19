/* text team */
document.addEventListener("DOMContentLoaded", function () {
    const text = "TEAM";
    const container = document.getElementById("team-text");

    text.split("").forEach((char, index) => {
        let span = document.createElement("span");
        span.textContent = char;
        span.classList.add("letter");
        span.style.animationDelay = `${index * 0.3}s`; // กำหนดเวลาขยับทีละตัว
        container.appendChild(span);
    });
});

/* clock */ 
function updateClock() {
    const now = new Date();
    const options = { timeZone: "Asia/Bangkok", hour: "2-digit", minute: "2-digit", second: "2-digit" };
    const timeString = now.toLocaleTimeString("en-US", options);
    document.getElementById("clock").textContent = timeString;
}

// อัปเดตเวลาทุกวินาที
setInterval(updateClock, 1000);
updateClock();