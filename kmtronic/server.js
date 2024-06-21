const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dgram = require('dgram'); 

const app = express();
const port = 3000;

const UDP_PORT = 12345;  
const UDP_HOST = '192.168.1.199';  

//NO TOQUES QUE ESTO ES DE INTERNET PARA QUE INTREPRETE LAS SOLICITUDES JAVASCRIPT Y HTML
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));


// Ruta para manejar los comandos UDP
app.post('/send-command', (req, res) => {
  const { command } = req.body;

  // Crear un socket UDP
  const client = dgram.createSocket('udp4');
  const message = Buffer.from(command);

  // Enviar el mensaje UDP
  client.send(message, 0, message.length, UDP_PORT, UDP_HOST, (err) => {
    if (err) {
      console.error('Error al enviar mensaje UDP:', err);
      res.status(500).send('Error al enviar mensaje UDP');
    } else {
      console.log('Mensaje UDP enviado correctamente:', command);
      res.sendStatus(200);
    }
    client.close();
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
