const express = require('express');
const {engine} = require('express-handlebars');
const myconnection = require('express-myconnection');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

app.set('port',3001);

app.set('views', __dirname + '/views');
app.engine('hbs', engine({
    extname: '.hbs',
}));

app.set('view engine', 'hbs');

app.use(myconnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'crud'
}));
app.listen(app.get('port'), () => {
    console.log('listening on port', app.get('port'));
});

app.get('/', (req, res) => {
    res.render('home');
});