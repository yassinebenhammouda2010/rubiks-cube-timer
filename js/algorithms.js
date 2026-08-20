const algorithms = [
    {
        category: "F2L",
        name: "F2L 01",
        image: "images/algorithms/F2L-2.png",
        moves: "U R U' R'"
    },

    {
        category: "F2L",
        name: "F2L 02",
        image: "images/algorithms//F2L-1.png",
        moves: "U' (F' U F)"
    },
    {
        category: "F2L",
        name: "F2L 03",
        image: "images/algorithms//F2L-3.png",
        moves: "F' U' F"
    },
{
        category: "F2L",
        name: "F2L 04",
        image: "images/algorithms//F2L-4.png",
        moves: "R U R'"
    },


    {
        category: "PLL",
        name: "OLL 01",
        image: "images/algorithms/PLL-1.png",
        moves: "R U' R U R U R U' R' U' R2"
    },

    {
        category: "PLL",
        name: "PLL 01",
        image: "images/algorithms/PLL-2.png",
        moves: "R2 U R U R' U' R' U' R' U R'"
    },
    {
        category: "PLL",
        name: "PLL 01",
        image: "images/algorithms/PLL-4.png",
        moves: "M2 U M2 U2 M2 U M2"
    },
    {
        category: "PLL",
        name: "PLL 01",
        image: "images/algorithms/PLL-3.png",
        moves: "stana chwaya nsitha "
    },
];


// =========================
// AFFICHER LES ALGORITHMES
// =========================

function displayAlgorithms(category = "ALL") {

    const container = document.getElementById("algorithmsContainer");

    if (!container) return;

    container.innerHTML = "";

    const filteredAlgorithms = category === "ALL"
        ? algorithms
        : algorithms.filter(algo => algo.category === category);


    filteredAlgorithms.forEach((algo, index) => {

        const card = document.createElement("div");

        card.className = "algorithm-card";

        card.innerHTML = `
            <div class="algorithm-image-container">
                <img
                    src="${algo.image}"
                    alt="${algo.name}"
                    class="algorithm-image"
                >
            </div>

            <div class="algorithm-info">

                <span class="algorithm-number">
                    ${algo.category}
                </span>

                <h3>${algo.name}</h3>

                <div class="algorithm-moves">
                    ${algo.moves}
                </div>

                <button
                    class="copy-algorithm"
                    onclick="copyAlgorithm('${algo.moves.replace(/'/g, "\\'")}', this)"
                >
                    📋 Copy
                </button>

            </div>
        `;

        container.appendChild(card);

    });
}


// =========================
// FILTRE F2L / OLL / PLL
// =========================

function filterAlgorithms(category, button) {

    document
        .querySelectorAll(".algorithm-tab")
        .forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");

    displayAlgorithms(category);
}


// =========================
// COPIER L'ALGORITHME
// =========================

function copyAlgorithm(moves, button) {

    navigator.clipboard.writeText(moves);

    const oldText = button.innerHTML;

    button.innerHTML = "✓ Copied!";

    setTimeout(() => {
        button.innerHTML = oldText;
    }, 1200);
}


// =========================
// INITIALISATION
// =========================

document.addEventListener("DOMContentLoaded", () => {
    displayAlgorithms();
});