// ============================
// SmartCube App
// ============================


document.addEventListener(
"DOMContentLoaded",
()=>{


    console.log("🧩 SmartCube Timer loaded");


    // Générer un scramble au lancement

    if(typeof generateScramble === "function"){

        generateScramble();

    }



    // Charger les statistiques

    if(typeof updateStats === "function"){

        updateStats();

    }



    // Afficher historique

    if(typeof renderHistory === "function"){

        renderHistory();

    }



    // Interaction du bouton New Scramble

    const newScrambleBtn =
        document.getElementById("newScramble");

    const scrambleBadge =
        document.querySelector(".scramble-badge");

    if(newScrambleBtn){

        newScrambleBtn.addEventListener("click", () => {

            const icon =
                newScrambleBtn.querySelector(".btn-icon");

            if(icon){

                icon.classList.remove("spin");

                // Forcer le navigateur à relancer l'animation
                void icon.offsetWidth;

                icon.classList.add("spin");

            }


            if(scrambleBadge){

                scrambleBadge.classList.remove("pulse");

                void scrambleBadge.offsetWidth;

                scrambleBadge.classList.add("pulse");

            }

        });

    }


});