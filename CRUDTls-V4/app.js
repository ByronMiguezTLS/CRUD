// 1 - Invocamos a Express
const express = require('express');
const app = express();

// 2 - Para poder capturar los datos del formulario (sin urlencoded nos devuelve "undefined")
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // Además le decimos a express que vamos a usar JSON

// 3 - Invocamos a dotenv
const dotenv = require('dotenv');
dotenv.config({ path: './env/.env' });

// 4 - Seteamos el directorio de assets
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

// 5 - Establecemos el motor de plantillas
app.set('view engine', 'ejs');

// 6 - Invocamos a bcrypt
const bcrypt = require('bcryptjs');

// 7 - Variables de sesión
const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// 8 - Invocamos a la conexión de la DB
const connection = require('./database/db');

// 9 - Establecemos las rutas

// Página principal redirige a /login
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Página de login
app.get('/login', (req, res) => {
    res.render('login');
});

// Página de registro
app.get('/register', (req, res) => {
    res.render('register');
});

// Página de index solo para usuarios autenticados
app.get('/index', (req, res) => {
    if (req.session.loggedin) {
        res.render('index', {
            login: true,
            name: req.session.name
        });
    } else {
        res.redirect('/login');
    }
});

// Página de almacen solo para usuarios autenticados
app.get('/almacen', (req, res) => {
    if (req.session.loggedin) {
        res.render('almacen',{
            login: true,
            name: req.session.name
        });
    } else {
        res.redirect('/login');
    }
});

// 10 - Método para el registro
app.post('/register', async (req, res) => {
    const user = req.body.user;
    const name = req.body.name;
    const rol = req.body.rol;
    const pass = req.body.pass;
    let passwordHash = await bcrypt.hash(pass, 8);

    connection.query('SELECT * FROM users WHERE user = ?', [user], async (error, results) => {
        if (error) {
            console.log(error);
            res.render('register', {
                alert: true,
                alertTitle: "Error",
                alertMessage: "Ocurrió un error en la base de datos.",
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 0,
                ruta: 'register'
            });
        } else if (results.length > 0) {
            // Usuario ya existe
            res.render('register', {
                alert: true,
                alertTitle: "Registro Fallido",
                alertMessage: "El nombre de usuario ya está en uso.",
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 0,
                ruta: 'register'
            });
        } else {
            // Registrar nuevo usuario
            connection.query('INSERT INTO users SET ?', { user: user, name: name, rol: rol, pass: passwordHash }, (error, results) => {
                if (error) {
                    console.log(error);
                    res.render('register', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "Ocurrió un error al registrar el usuario.",
                        alertIcon: 'error',
                        showConfirmButton: true,
                        timer: 0,
                        ruta: 'register'
                    });
                } else {
                    // Iniciar sesión automáticamente
                    req.session.loggedin = true;
                    req.session.name = name;

                    res.render('login', {
                        alert: true,
                        alertTitle: "Registro Exitoso",
                        alertMessage: "¡Usuario registrado y sesión iniciada correctamente!",
                        alertIcon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: ''
                    });
                }
            });
        }
    });
});

// 11 - Método para la autenticación
app.post('/auth', async (req, res) => {
    const user = req.body.user;
    const pass = req.body.pass;

    if (user && pass) {
        connection.query('SELECT * FROM users WHERE user = ?', [user], async (error, results) => {
            if (results.length == 0 || !(await bcrypt.compare(pass, results[0].pass))) {
                res.render('login', {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "USUARIO y/o PASSWORD incorrectas",
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'login'
                });
            } else {
                // Variables de sesión asignamos true si INICIO SESIÓN       
                req.session.loggedin = true;
                req.session.name = results[0].name;

                res.redirect('/index'); // Redirige al usuario a la página de índice después del login exitoso
            }
        });
    } else {
        res.send('Introduce usuario y contraseña por favor!');
    }
});

// 12 - Método para el logout
app.get('/logout', function (req, res) {
    req.session.destroy(() => {
        res.redirect('/login'); // Redirige al login después de cerrar sesión
    });
});


//13 - CRUD
//Mostrar todos los artículos
app.get('/almacen', (req,res)=>{
    conexion.query('SELECT * FROM materiales', (error,filas)=>{
        if(error){
            throw error
        }else{
            res.send(filas)
        }
    })
})



app.listen(3000, () => {
    console.log('SERVER RUNNING IN http://localhost:3000');
});


