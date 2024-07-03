const selectBox = document.querySelector(".select-box"),
selectXBtn = selectBox.querySelector(".playerX"),
selectOBtn = selectBox.querySelector(".playerO"),
playBoard = document.querySelector(".play-board"),
players = document.querySelector(".players"),
allBox = document.querySelectorAll("section span"),
resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text"),
replayBtn = resultBox.querySelector("button");

window.onload = ()=> {

    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }

    selectXBtn.onclick = ()=>{
        selectBox.classList.add("hide"); //oculta el panel de seleccion cuando se selecciona jugador X
        playBoard.classList.add("show"); //muestra el tablero de juego cuando se selecciona jugador X
    }

    selectOBtn.onclick = ()=>{
        selectBox.classList.add("hide"); //oculta el panel de seleccion cuando se selecciona jugador O
        playBoard.classList.add("show"); //muestra el tablero de juego cuando se selecciona jugador O
        players.setAttribute("class", "players active player" )
    }
} 

let playerXIcon = "fas fa-times";
let playerOIcon = "far fa-circle";
let playerSign = "X";
let runBot = true;

// Función que se ejecuta al hacer click en una casilla del tablero de juego
function clickedBox(element) {
    // console.log(element);
    if(players.classList.contains("player")){
        playerSign = "O";
        element.innerHTML = `<i class="${playerOIcon}"></i>`; //cambia el icono del jugador O
        players.classList.remove("active");
        element.setAttribute("id", playerSign);
    }else {
        playerSign = "X";
        element.innerHTML = `<i class="${playerXIcon}"></i>`; //cambia el icono del jugador X
        players.classList.add("active");
        element.setAttribute("id", playerSign);

    }
    selectWinner();
    playBoard.style.pointerEvents = "none"; //deshabilita el click en la casilla una vez
    element.style.pointerEvents = "none"; //deshabilita el click en la casilla una vez clickada
    let randomDelayTime = ((Math.random() * 1000) + 200).toFixed(); //delay para que el bot espere un tiempo antes de rellenar la celda 
    setTimeout(() => {
        bot(runBot);
    }, randomDelayTime); // delay random 
}

function bot(runBot){
    if(runBot){
        playerSign = "O";
        let array = [];
        for (let i = 0; i < allBox.length; i++) {
            if (allBox[i].childElementCount == 0) {
                array.push(i);
                // console.log(i +" " + "hola");
            }
        }
        let randomBox= array[Math.floor(Math.random() * array.length)];
        if(array.length > 0){
            if(players.classList.contains("player")){
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`; //cambia el icono del jugador X 
                players.classList.remove("active");
                playerSign = "X";
                allBox[randomBox].setAttribute("id", playerSign);

            }else {
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`; //cambia el icono del jugador O
                players.classList.remove("active");
                allBox[randomBox].setAttribute("id", playerSign);    
            }
            selectWinner();
        }
        allBox[randomBox].style.pointerEvents = "none"; //deshabilita el click en la casilla
        playBoard.style.pointerEvents = "auto"; //habilita el click en la casilla
        playerSign = "X";
    }
}

function getClass(idname){
    return document.querySelector(".box" +idname).id;
}
function checkClass(val1, val2, val3, sign){
    if(getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign){
        return true;
    }
}
function selectWinner(){
    if(checkClass(1,2,3,playerSign) || checkClass(4,5,6, playerSign) || checkClass(7,8,9, playerSign) || checkClass(1,4,7, playerSign) || checkClass(2,5,8, playerSign) || checkClass(3,6,9, playerSign) || checkClass(1,5,9, playerSign) || checkClass(3,5,7, playerSign)){ 
        
        runBot = false;
        bot(runBot);
        setTimeout(() => {
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
            wonText.innerHTML = `${playerSign} Ha ganado!`; // Añadido aquí
        }, 700);
    }else {
        if(getClass(1) != "" && getClass(2) != "" && getClass(3) != "" && getClass(4) != "" && getClass(5) != "" && getClass(6) != "" && getClass(7) != "" && getClass(8) != "" && getClass(9) != ""){
            runBot = false;
            setTimeout(() => {
                resultBox.classList.add("show");
                playBoard.classList.remove("show");
                wonText.innerHTML = `¡Es un empate!`;
            }, 700);}
    }
}

replayBtn.onclick = ()=>{
    window.location.reload();
}