const timer = document.getElementById("timer");

let running = false;
let startTime = 0;
let interval = null;

function formatTime(ms) {
    return (ms / 1000).toFixed(3);
}

function updateTimer() {
    const elapsed = performance.now() - startTime;
    timer.textContent = formatTime(elapsed);
}

document.addEventListener("keydown", function(e) {

    if (e.code !== "Space") return;

    e.preventDefault();

    if (!running) {
        startTime = performance.now();

        interval = setInterval(updateTimer, 10);

        running = true;

    } else {

        clearInterval(interval);

        running = false;

    }

});