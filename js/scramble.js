// ============================
// SmartCube Scramble Generator
// ============================


const faces = [
    "R",
    "L",
    "U",
    "D",
    "F",
    "B"
];


const modifiers = [
    "",
    "'",
    "2"
];



function generateScramble(){


    let scramble = [];

    let lastFace = "";



    while(scramble.length < 20){


        let face =
        faces[Math.floor(Math.random()*faces.length)];



        // éviter deux faces identiques à la suite

        if(face === lastFace)
            continue;



        let modifier =
        modifiers[Math.floor(Math.random()*modifiers.length)];



        scramble.push(
            face + modifier
        );


        lastFace = face;


    }



    let result = scramble.join(" ");



    document.getElementById("scramble").textContent =
    result;



    return result;

}





// bouton nouveau scramble

const scrambleButton =
document.getElementById("newScramble");



if(scrambleButton){

    scrambleButton.onclick = generateScramble;

}