const express = require('express');
const morgan = require('morgan');
const config = require('./config');

const usuarios = require('./modulos/usuarios/rutas');
const materiales = require('./modulos/materiales/rutas');
const devoluciones = require('./modulos/devoluciones/rutas');
const reservas = require('./modulos/reservas/rutas');
const auth = require('./modulos/auth/rutas');


const error = require('./red/errors');

const app = express();

//MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//configuracion de la app
app.set('port', config.app.port)

//rutas
app.use('/api/usuarios', usuarios);
app.use('/api/materiales', materiales);
app.use('/api/devoluciones', devoluciones);
app.use('/api/reservas', reservas);
app.use('/api/auth', auth);
app.use(error);

module.exports = app;