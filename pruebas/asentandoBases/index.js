
let personas = [
    ["Byron", 20, "Hombre", "Estudiante", "Español"],
    ["Ana", 25, "Mujer", "Ingeniera", "Inglés"],
    ["Carlos", 30, "Hombre", "Médico", "Portugués"]
];


function construirMensaje(persona) {
    let mensaje = "Soy " + persona[0] + ", tengo " + persona[1] + " años, soy " + persona[2] +
                  ", trabajo como " + persona[3] + " y hablo " + persona[4] + ".";
    return mensaje;
}

personas.forEach(persona => {
    let mensajePersona = construirMensaje(persona);
    console.log(mensajePersona);
});
