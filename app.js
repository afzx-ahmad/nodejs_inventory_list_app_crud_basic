const express = require('express');
const mysql = require('mysql');

// MYSQL connection
const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'nodejs_list_app'
    }
);

const app = express();

app.use(express.static('public'));
app.use('/stylesheets/fontawesome', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free/'));

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/list', (req, res) => {
    connection.query('SELECT * FROM items;', (err, results) => {
        // console.log(results);
        res.render('list.ejs', {items: results});
    });
});

app.listen(3000);