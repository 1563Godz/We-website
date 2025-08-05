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
        if (showing) {
            githubToggleBtn.innerHTML = '✖';
        } else {
            githubToggleBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>`;
        }
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