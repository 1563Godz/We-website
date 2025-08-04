// ===== GitHub Buttons Animation =====
document.addEventListener("DOMContentLoaded", function () {
    const githubToggleBtn = document.getElementById('github-toggle-btn');
    const githubButtonsContainer = document.getElementById('github-buttons-container');
    const githubBtns = Array.from(githubButtonsContainer.querySelectorAll('.github-btn'));
    let showing = false;

    // เริ่มต้นซ่อนทุกปุ่ม
    githubBtns.forEach(btn => {
        btn.classList.add('github-btn-animating-hide');
        btn.classList.remove('github-btn-animating-show');
    });

    githubToggleBtn.addEventListener('click', function () {
        showing = !showing;
        githubToggleBtn.textContent = showing ? '✖' : '🐙';
        githubButtonsContainer.classList.remove('hidden'); 
        if (showing) {
            // แสดงทีละปุ่ม
            githubBtns.forEach((btn, i) => {
                setTimeout(() => {
                    btn.classList.remove('github-btn-animating-hide');
                    btn.classList.add('github-btn-animating-show');
                }, i * 90);
            });
        } else {
            // ซ่อนทีละปุ่ม
            githubBtns.slice().reverse().forEach((btn, i) => {
                setTimeout(() => {
                    btn.classList.remove('github-btn-animating-show');
                    btn.classList.add('github-btn-animating-hide');
                    // ซ่อน container เมื่อปุ่มสุดท้ายหาย
                    if (i === githubBtns.length - 1) {
                        setTimeout(() => {
                            githubButtonsContainer.classList.add('hidden');
                        }, 400);
                    }
                }, i * 90);
            });
        }
    });
});
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