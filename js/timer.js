// ============================
// SmartCube Timer (PC + Mobile)
// ============================

const timerElement = document.getElementById("timer");

let running = false;
let holding = false;
let ready = false;

let startTime = 0;
let holdTimeout = null;
let animation = null;


// Afficher le temps

function displayTime(ms){

    timerElement.textContent =
    (ms / 1000).toFixed(3);

}


// Mise à jour du chrono

function updateTimer(){

    if(!running)
        return;


    let elapsed =
    performance.now() - startTime;


    displayTime(elapsed);


    animation =
    requestAnimationFrame(updateTimer);

}


// Démarrer

function startTimer(){

    running = true;

    startTime = performance.now();

    timerElement.classList.remove("ready");
    timerElement.classList.remove("charging");

    updateTimer();

}


// Arrêter

function stopTimer(){

    running = false;

    cancelAnimationFrame(animation);


    let finalTime =
    performance.now() - startTime;


    displayTime(finalTime);



    // Détecter un nouveau record AVANT de sauvegarder le solve

    let isNewBest = false;

    if(typeof getSolves === "function"){

        const previousTimes =
            getSolves()
                .filter(solve => solve.penalty !== "DNF")
                .map(solve =>
                    solve.penalty === "+2" ?
                    solve.time + 2000 :
                    solve.time
                );

        if(previousTimes.length === 0 || finalTime < Math.min(...previousTimes)){

            isNewBest = true;

        }

    }



    // Sauvegarde

    if(typeof addSolve === "function"){

        let scramble =
        document.getElementById("scramble").textContent;


        addSolve(
            finalTime,
            scramble
        );

    }


    if(typeof updateStats === "function")
        updateStats();


    if(typeof renderHistory === "function")
        renderHistory();


    // Célébration si nouveau record

    if(isNewBest && typeof celebratePB === "function"){

        celebratePB(finalTime);

    }


    if(typeof generateScramble === "function")
        generateScramble();

}



// Début de l'appui

function pressStart(){


    if(running){

        stopTimer();

        return;

    }


    if(holding)
        return;


    holding = true;


    // Feedback visuel pendant la charge (avant le vert)

    timerElement.classList.add("charging");


    holdTimeout = setTimeout(()=>{


        ready = true;


        timerElement.classList.remove("charging");

        timerElement.classList.add("ready");


    },500);

}



// Fin de l'appui

function pressEnd(){


    clearTimeout(holdTimeout);


    holding = false;


    timerElement.classList.remove("charging");



    if(!ready)
        return;



    ready = false;


    startTimer();

}



// ============================
// PC : clavier
// ============================

document.addEventListener(
"keydown",
(e)=>{


    if(e.code !== "Space")
        return;


    e.preventDefault();


    pressStart();

});



document.addEventListener(
"keyup",
(e)=>{


    if(e.code !== "Space")
        return;


    e.preventDefault();


    pressEnd();

});



// ============================
// Téléphone : tactile
// ============================

timerElement.addEventListener(
"touchstart",
(e)=>{

    e.preventDefault();

    pressStart();

},
{passive:false}
);



timerElement.addEventListener(
"touchend",
(e)=>{

    e.preventDefault();

    pressEnd();

},
{passive:false}
);



// ============================
// Souris
// ============================

timerElement.addEventListener(
"mousedown",
()=>{

    pressStart();

});


timerElement.addEventListener(
"mouseup",
()=>{

    pressEnd();

});