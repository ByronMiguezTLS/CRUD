const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.login = (req, res) => {
    console.log(req.body);

    const { name, password } = req.body;

    db.query('SELECT name FROM users WHERE name = ?', [name], (error, results) =>{
        if(error){
            console.log(error);
        }

        if(results.lenght > 0){
            return res.render('login',{
                message: "El usuario no existe"
            }) 
        }
    })

    res.send("enviado");
}