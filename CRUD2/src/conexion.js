const mysql = require('mysql');

// Configuración de la conexión a MySQL
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Pon aquí tu contraseña de MySQL
    port: 3306,  // Pon aquí el puerto de MySQL
    database: 'crud'
});

// Conexión a la base de datos
conexion.connect(function(err) {
    if (err) {
        console.error('Error de conexión a la base de datos: ' + err.stack);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Exportar la conexión para que pueda ser utilizada en otros archivos
module.exports = conexion;
