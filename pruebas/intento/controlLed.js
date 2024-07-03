const dgram = require('dgram');
const udpClient = dgram.createSocket('udp4');

// Dirección IP y puerto del controlador DMX
const dmxControllerIP = '192.168.0.90';  // Ejemplo: ajusta a la IP de tu controlador DMX
const dmxControllerPort = 5568;  // Ejemplo: puerto UDP utilizado por tu controlador DMX

// Función para enviar datos DMX para establecer el color
function enviarDatosDMX(datosDMX) {
    const buffer = Buffer.from(datosDMX);

    udpClient.send(buffer, 0, buffer.length, dmxControllerPort, dmxControllerIP, (err) => {
        if (err) {
            console.error('Error al enviar datos DMX:', err);
        } else {
            console.log('Datos DMX enviados correctamente');
        }
        udpClient.close();  // Cerrar el cliente UDP después de enviar
    });
}

// Función para establecer la tira LED en color rojo
function establecerRojo() {
    const datosDMXRojo = [255];  // Ejemplo: comando DMX para poner la tira en rojo

    enviarDatosDMX(datosDMXRojo);
}

// Llamar a la función para establecer la tira LED en rojo
establecerRojo();
