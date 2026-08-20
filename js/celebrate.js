// ============================
// YassCube - Célébration PB
// ============================

function celebratePB(finalTimeMs) {

    const colors = [
        "var(--cube-red)",
        "var(--cube-yellow)",
        "var(--cube-green)",
        "var(--cube-blue)",
        "var(--cube-orange)"
    ];


    // ============================
    // Confettis
    // ============================

    const container = document.createElement("div");
    container.className = "confetti-container";

    const pieceCount = 44;

    for (let i = 0; i < pieceCount; i++) {

        const piece = document.createElement("span");
        piece.className = "confetti-piece";

        piece.style.left = Math.random() * 100 + "vw";
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDelay = (Math.random() * 0.35) + "s";
        piece.style.animationDuration = (1.6 + Math.random() * 1.3) + "s";
        piece.style.setProperty("--rot", (Math.random() * 520 - 260) + "deg");
        piece.style.setProperty("--drift", (Math.random() * 120 - 60) + "px");

        container.appendChild(piece);

    }

    document.body.appendChild(container);

    setTimeout(() => {
        container.remove();
    }, 3200);


    // ============================
    // Toast
    // ============================

    const toast = document.createElement("div");
    toast.className = "pb-toast";

    toast.innerHTML =
        "🏆 Nouveau record : " +
        (finalTimeMs / 1000).toFixed(3) +
        "s";

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add("show");
    });

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2600);

    setTimeout(() => {
        toast.remove();
    }, 3000);

}