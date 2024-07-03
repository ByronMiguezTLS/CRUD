const express = require('express');
const path = require('path');
const mysql = require('mysql');
const conexion = require('./conexion');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3100;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../public')));

// Rutas para operaciones CRUD

// Obtener todos los registros
app.get('/api/personas', (req, res) => {
    const sql = 'SELECT * FROM personas';
    conexion.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
});

// Insertar un nuevo registro
app.post('/api/personas', (req, res) => {
    const { nombre, apellido, pais } = req.body;
    const sql = 'INSERT INTO personas (nombre, apellido, pais) VALUES (?, ?, ?)';
    conexion.query(sql, [nombre, apellido, pais], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ id: result.insertId });
        }
    });
});

// Actualizar un registro existente
app.put('/api/personas/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, pais } = req.body;
    const sql = 'UPDATE personas SET nombre = ?, apellido = ?, pais = ? WHERE id = ?';
    conexion.query(sql, [nombre, apellido, pais, id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Registro actualizado' });
        }
    });
});

// Eliminar un registro
app.delete('/api/personas/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM personas WHERE id = ?';
    conexion.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Registro eliminado' });
        }
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
