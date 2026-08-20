// ============================
// SmartCube Statistics
// ============================


// Temps réellement utilisé
function getEffectiveTime(solve) {

    if (solve.penalty === "DNF")
        return Infinity;

    if (solve.penalty === "+2")
        return solve.time + 2000;

    return solve.time;

}


// Format
function format(ms) {

    if (ms === Infinity)
        return "DNF";

    return (ms / 1000).toFixed(3);

}


// Moyenne
function average(times) {

    if (times.length === 0)
        return "-";

    let total = 0;

    times.forEach(time => {
        total += time;
    });

    return format(total / times.length);

}


// Ao5 / Ao12
function averageOf(times) {

    if (times.length < 5)
        return "-";

    let sorted = [...times].sort((a, b) => a - b);

    // Meilleur
    sorted.shift();

    // Pire
    sorted.pop();

    // Si DNF
    if (sorted.includes(Infinity))
        return "DNF";

    let total = 0;

    sorted.forEach(time => {
        total += time;
    });

    return format(total / sorted.length);

}


// ============================
// STATISTIQUES
// ============================

function updateStats() {

    const data = getSolves();

    // Les temps valides
    const times = data
        .map(solve => getEffectiveTime(solve))
        .filter(time => time !== Infinity);


    document.getElementById("count").textContent =
        data.length;


    if (times.length === 0) {

        document.getElementById("best").textContent = "-";
        document.getElementById("average").textContent = "-";
        document.getElementById("ao5").textContent = "-";
        document.getElementById("ao12").textContent = "-";

        return;
    }


    // Best
    const best = Math.min(...times);

    document.getElementById("best").textContent =
        format(best);


    // Average
    document.getElementById("average").textContent =
        average(times);


    // Ao5
    const last5 = data.slice(-5);

    const ao5Times =
        last5.map(solve => getEffectiveTime(solve));

    document.getElementById("ao5").textContent =
        averageOf(ao5Times);


    // Ao12
    const last12 = data.slice(-12);

    const ao12Times =
        last12.map(solve => getEffectiveTime(solve));

    document.getElementById("ao12").textContent =
        averageOf(ao12Times);


    renderHistory();

}


// ============================
// HISTORIQUE
// ============================

function renderHistory() {

    const list =
        document.getElementById("history");

    if (!list)
        return;


    list.innerHTML = "";


    const data = getSolves();


    data
        .slice()
        .reverse()
        .forEach((solve, reverseIndex) => {

            const realIndex =
                data.length - 1 - reverseIndex;


            const li =
                document.createElement("li");


            let displayTime =
                format(getEffectiveTime(solve));


            let penaltyButtons = "";


            if (solve.penalty === "OK") {

                penaltyButtons = `
                    <button onclick="addTwo(${realIndex})">
                        +2
                    </button>

                    <button onclick="setDNF(${realIndex})">
                        DNF
                    </button>
                `;

            } else {

                penaltyButtons = `
                    <button onclick="resetPenalty(${realIndex})">
                        ↩️
                    </button>
                `;

            }


            li.innerHTML = `

                <span>
                    ${displayTime} s
                </span>

                <span>

                    ${penaltyButtons}

                    <button onclick="deleteSolve(${realIndex})">
                        🗑️
                    </button>

                </span>

            `;


            list.appendChild(li);

        });

}


// Chargement initial
updateStats();