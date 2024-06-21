// Crear y configurar servidor
const express = require('express');
// dgram para trabajar con UDP
const dgram = require('dgram');
const app = express();
const port = 3000;

// Protocolo UDP4
const client = dgram.createSocket('udp4');

// Dirección DMX
const DMX_IP_ADDRESS = '192.168.0.90';
const DMX_PORT = 3333;

// Usar archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Enviar datos DMX
app.get('/send', (req, res) => {
    const red = parseInt(req.query.red);
    const green = parseInt(req.query.green);
    const blue = parseInt(req.query.blue);

    // ACUERDATE QUE EL ROJO Y EL AZUL ESTAN AL REVES
    const message = Buffer.alloc(12);
    message[0] = 0x45;  // $45
    message[1] = 0x53;  // $53
    message[2] = 0x44;  // $44
    message[3] = 0x44;  // $44
    message[4] = 0x00;  // $00
    message[5] = 0x00;  // $00
    message[6] = 0x01;  // $01
    message[7] = 0x00;  // $00
    message[8] = 0x03;  // Tamaño de datos, 3 bytes
    message[9] = blue;  // Canal 1 
    message[10] = green; // Canal 2 
    message[11] = red;   // Canal 3

    client.send(message, 0, message.length, DMX_PORT, DMX_IP_ADDRESS, (err) => {
        if (err) {
            console.error('Error al enviar el mensaje:', err);
            res.status(500).send('Error al enviar el mensaje');
        } else {
            console.log('Mensaje enviado:', message);
            res.send('Mensaje enviado');
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
