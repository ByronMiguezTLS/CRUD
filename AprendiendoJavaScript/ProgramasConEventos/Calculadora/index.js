const display = document.getElementById("display");

function appenToDisplay(input) {
    display.value += input;
}

function limpiarDisplay() {
    display.value = "";
}

function calcular() {
    try{
        display.value = eval(display.value);

    } catch (error) {
        display.value = "Error";
    }
}