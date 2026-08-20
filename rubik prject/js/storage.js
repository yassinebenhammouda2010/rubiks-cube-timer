// ============================
// SmartCube Storage
// ============================

let solves = JSON.parse(
    localStorage.getItem("smartcube_solves")
) || [];


// Sauvegarder
function saveSolves() {

    localStorage.setItem(
        "smartcube_solves",
        JSON.stringify(solves)
    );

}


// Ajouter un solve
function addSolve(time, scramble) {

    solves.push({

        time: time,
        scramble: scramble,
        date: new Date().toLocaleString(),

        // Pénalité
        penalty: "OK"

    });

    saveSolves();

}


// Obtenir les solves
function getSolves() {

    return solves;

}


// +2 secondes
function addTwo(index) {

    if (!solves[index])
        return;

    // Si déjà DNF, on ne change pas
    if (solves[index].penalty === "DNF")
        return;

    solves[index].penalty = "+2";

    saveSolves();

    updateStats();
    renderHistory();

}


// DNF
function setDNF(index) {

    if (!solves[index])
        return;

    solves[index].penalty = "DNF";

    saveSolves();

    updateStats();
    renderHistory();

}


// Remettre le solve normal
function resetPenalty(index) {

    if (!solves[index])
        return;

    solves[index].penalty = "OK";

    saveSolves();

    updateStats();
    renderHistory();

}


// Supprimer un seul solve
function deleteSolve(index) {

    solves.splice(index, 1);

    saveSolves();

    updateStats();
    renderHistory();

}


// Effacer toute la session
function clearSolves() {

    solves = [];

    saveSolves();

    updateStats();
    renderHistory();

}


// Bouton effacer
const clearButton =
    document.getElementById("clear");

if (clearButton) {

    clearButton.onclick = clearSolves;

}