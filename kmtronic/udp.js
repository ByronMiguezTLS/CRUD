// Configuración del mensaje UDP
const UDP_PORT = 3000;  // El puerto del servidor local
const UDP_HOST = 'localhost';  // Dirección IP del servidor local

// Función para enviar comando UDP
function sendCommand(command) {
  const client = new XMLHttpRequest();
  client.open('POST', `http://${UDP_HOST}:${UDP_PORT}/send-command`, true);
  client.setRequestHeader('Content-Type', 'application/json');
  client.send(JSON.stringify({ command: command }));
  client.onload = function() {
    if (client.status >= 200 && client.status < 300) {
      console.log('Mensaje UDP enviado correctamente');
    } else {
      console.error('Error al enviar mensaje UDP:', client.statusText);
    }
  };
  client.onerror = function() {
    console.error('Error de red al enviar mensaje UDP');
  };
}

document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.toggle-btn');
  const relayAllButton = document.getElementById('relayAll');

  // Inicializar estado de los botones
  buttons.forEach(function(button) {
    let state = false; // Apagado

    button.addEventListener('click', function() {
      if (state) {
        // Enviar comando de apagado
        const command = button.dataset.commandOff;
        sendCommand(command);
        // Cambiar estado
        state = false;
        button.classList.remove('btn-toggle-on');
        button.classList.add('btn-toggle-off');
        button.textContent = button.textContent.replace('ON', 'OFF');
      } else {
        // Enviar comando de encendido
        const command = button.dataset.commandOn;
        sendCommand(command);
        // Cambiar estado
        state = true;
        button.classList.remove('btn-toggle-off');
        button.classList.add('btn-toggle-on');
        button.textContent = button.textContent.replace('OFF', 'ON');
      }
    });
  });

  // relayAll
  relayAllButton.addEventListener('click', function() {
    let allOn = relayAllButton.classList.contains('btn-toggle-off'); // Si está apagado encender todo

    buttons.forEach(function(button) {
      let command;

        if (allOn) {
          command = button.dataset.commandOn;
        } else {
          command = button.dataset.commandOff;
        }

      sendCommand(command);

      if (allOn) {
        button.classList.remove('btn-toggle-off');
        button.classList.add('btn-toggle-on');
        button.textContent = button.textContent.replace('OFF', 'ON');
      } else {
        button.classList.remove('btn-toggle-on');
        button.classList.add('btn-toggle-off');
        button.textContent = button.textContent.replace('ON', 'OFF');
      }
    });

    // Cambiar estado y texto del botón relayAll
    if (allOn) {
      relayAllButton.classList.remove('btn-toggle-off');
      relayAllButton.classList.add('btn-toggle-on');
      relayAllButton.textContent = 'APAGAR TODO';
    } else {
      relayAllButton.classList.remove('btn-toggle-on');
      relayAllButton.classList.add('btn-toggle-off');
      relayAllButton.textContent = 'ENCENDER TODO';
    }
  });
});
