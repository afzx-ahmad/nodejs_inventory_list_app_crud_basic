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

app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/list', (req, res) => {
    connection.query('SELECT * FROM items;', (err, results) => {
        // console.log(results);
        res.render('list.ejs', {items: results});
    });
});

app.get('/add', (req, res) => {
    res.render('add.ejs');
});

app.post('/create', (req, res) => {
    connection.query(
        'INSERT INTO items (name, amount) VALUES (?, ?)', [req.body.nama_barang, req.body.jumlah],
        (err, results) => {
            console.log(req.body.nama_barang);
            console.log(req.body.jumlah);
            res.redirect('/list');
        }
    );
});

app.post('/delete/:id', (req, res) => {
    connection.query(
        'DELETE FROM items WHERE id = ?',
        [req.params.id],
        (err, results) => {
            res.redirect('/list');
        }
    );
});

app.listen(3000);