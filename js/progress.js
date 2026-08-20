// ============================
// SmartCube - Progression
// ============================

function getChartColors() {

    const styles = getComputedStyle(document.documentElement);

    const pick = (name, fallback) =>
        (styles.getPropertyValue(name) || fallback).trim();

    return {
        line: pick("--line", "#302f37"),
        dim: pick("--text-dim", "#9a98a3"),
        text: pick("--text", "#f2f1ee"),
        curve: pick("--cube-blue", "#3b6ef6"),
        point: pick("--cube-yellow", "#f2b705"),
        average: pick("--cube-orange", "#f2790f")
    };

}


function updateProgressChart() {

    const canvas = document.getElementById("progressChart");

    if (!canvas) return;

    const solves = getSolves();

    const times = solves
        .filter(solve => solve.penalty !== "DNF")
        .map(solve => {
            if (solve.penalty === "+2") {
                return (solve.time + 2000) / 1000;
            }

            return solve.time / 1000;
        });

    const ctx = canvas.getContext("2d");

    // Taille réelle du canvas (+ netteté sur écrans HiDPI)
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    ctx.clearRect(0, 0, width, height);

    const colors = getChartColors();


    // Aucun solve
    if (times.length === 0) {

        ctx.font = "15px 'Manrope', Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.fillStyle = colors.dim;

        ctx.fillText(
            "Aucun solve pour le moment",
            width / 2,
            height / 2
        );

        return;
    }

    const padding = 45;

    let maxTime = Math.max(...times);
    let minTime = Math.min(...times);

    // Éviter division par zéro
    if (maxTime === minTime) {
        maxTime += 1;
        minTime -= 1;
    }

    const range = maxTime - minTime;

    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const xAt = index =>
        padding +
        (index / Math.max(times.length - 1, 1)) * chartWidth;

    const yAt = time =>
        height - padding -
        ((time - minTime) / range) * chartHeight;


    // ============================
    // GRILLE (repères horizontaux)
    // ============================

    const gridSteps = 4;

    ctx.strokeStyle = colors.line;
    ctx.lineWidth = 1;
    ctx.font = "11px 'JetBrains Mono', monospace";
    ctx.fillStyle = colors.dim;
    ctx.textAlign = "right";

    for (let i = 0; i <= gridSteps; i++) {

        const value = minTime + (range * i) / gridSteps;
        const y = height - padding - (chartHeight * i) / gridSteps;

        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();

        ctx.fillText(value.toFixed(1) + "s", padding - 10, y + 4);

    }


    // ============================
    // AXES
    // ============================

    ctx.strokeStyle = colors.line;
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();


    // ============================
    // ZONE SOUS LA COURBE (dégradé)
    // ============================

    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
    gradient.addColorStop(0, colors.curve + "55");
    gradient.addColorStop(1, colors.curve + "00");

    ctx.beginPath();
    ctx.moveTo(xAt(0), height - padding);

    times.forEach((time, index) => {
        ctx.lineTo(xAt(index), yAt(time));
    });

    ctx.lineTo(xAt(times.length - 1), height - padding);
    ctx.closePath();

    ctx.fillStyle = gradient;
    ctx.fill();


    // ============================
    // LIGNE DE MOYENNE (pointillés)
    // ============================

    const average =
        times.reduce((total, value) => total + value, 0) / times.length;

    ctx.save();
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = colors.average;
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    ctx.moveTo(padding, yAt(average));
    ctx.lineTo(width - padding, yAt(average));
    ctx.stroke();
    ctx.restore();


    // ============================
    // COURBE
    // ============================

    ctx.strokeStyle = colors.curve;
    ctx.lineWidth = 2.5;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    ctx.beginPath();

    times.forEach((time, index) => {

        const x = xAt(index);
        const y = yAt(time);

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }

    });

    ctx.stroke();


    // ============================
    // POINTS
    // ============================

    times.forEach((time, index) => {

        const x = xAt(index);
        const y = yAt(time);

        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = colors.point;
        ctx.fill();

        ctx.lineWidth = 2;
        ctx.strokeStyle = colors.text;
        ctx.stroke();

    });


    // ============================
    // MEILLEUR
    // ============================

    const best = Math.min(...times);

    document.getElementById("progressBest").textContent =
        best.toFixed(3) + " s";


    // ============================
    // MOYENNE
    // ============================

    document.getElementById("progressAverage").textContent =
        average.toFixed(3) + " s";

}



// ============================
// Quand on ouvre Progression
// ============================

document.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(".nav-btn");

        if (!button) return;

        if (button.dataset.page === "progressPage") {

            // Laisser la page devenir visible
            setTimeout(() => {

                updateProgressChart();

            }, 50);

        }

    }
);



// Redimensionnement
window.addEventListener(
    "resize",
    () => {

        const page =
            document.getElementById("progressPage");

        if (
            page &&
            page.classList.contains("active-page")
        ) {

            updateProgressChart();

        }

    }
);