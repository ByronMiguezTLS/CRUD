const express = require('express');

const seguridad = require('./seguridad');
const respuesta = require('../../red/respuestas');
const controlador = require('./index');

const router = express.Router();

router.get('/', todos); // Ruta correcta para obtener todos los elementos
router.get('/:id', uno); // Ruta correcta para obtener un elemento por ID
router.post('/', seguridad, agregar); // Ruta correcta para agregar o actualizar un elemento
router.put('/', seguridad, agregar); // Ruta correcta para actualizar un elemento, usando la misma función agregar
router.delete('/:id', seguridad, eliminar); // Cambiado a DELETE para eliminar un elemento por ID

// Función para obtener todos los elementos
async function todos (req, res, next) {
    try {
        const items = await controlador.todos();
        respuesta.success(req, res, items, 200);
    } catch (err) {
        next(err);
    }
};

// Función para obtener un elemento por ID
async function uno (req, res, next) {
    try {
        const items = await controlador.uno(req.params.id);
        respuesta.success(req, res, items, 200);
    } catch (err) {
        next(err);
    }
};

// Función para agregar o actualizar un elemento
async function agregar (req, res, next) {
    try {
        const items = await controlador.agregar(req.body);
        let mensaje; // Declaramos la variable mensaje
        if (req.body.id == 0) {
            mensaje = 'Item guardado'; 
        } else {
            mensaje = 'Item actualizado';
        }
        respuesta.success(req, res, mensaje, 201);
    } catch (err) {
        next(err);    
    }
};

// Función para eliminar un elemento por ID
async function eliminar (req, res, next) {
    try {
        await controlador.eliminar(req.params.id); // Cambiado a req.params.id
        respuesta.success(req, res, 'Usuario eliminado', 200);
    } catch (err) {
        next(err);    
    }
};

module.exports = router;
