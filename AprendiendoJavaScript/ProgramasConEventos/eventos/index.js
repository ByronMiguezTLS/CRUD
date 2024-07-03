const caja= document.getElementById("caja");

const cantidadMovimientos = 10;
let x = 0;
let y = 0;

document.addEventListener("keydown", event => {
    caja.textContent="😎"
    caja.style.backgroundColor = "tomato";
});

document.addEventListener("keyup", event => {
    caja.textContent="👀"
    caja.style.backgroundColor = "lightblue";
});

document.addEventListener("keydown", event => {
    if (event.key.startsWith("Arrow")) {
        
        event.preventDefault(); 

        switch (event.key) {
            case "ArrowUp":
                y-= cantidadMovimientos;
                break;
            case "ArrowDown":
                y+= cantidadMovimientos;
                break;
            case "ArrowLeft":
                x-= cantidadMovimientos;
                break;
            case "ArrowRight":
                x+= cantidadMovimientos;
                break;
    
        }
        caja.style.top = `${y}px`;
        caja.style.left = `${x}px`;
    }
});