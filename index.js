const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('./DB/requests.db');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('views'));
// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  res.render('index', { title: 'Qingzi', errors: null, formData: {} });
});

app.get('/gallery', (req, res) => {
    res.render('gallery');
});

app.get('/price', (req, res) => {
    res.render('price');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/guide', (req, res) => {
    res.render('guide');
});

app.post('/submit', (req, res) => {
    const { firstname, lastname, number, email, commissionType, comment } = req.body;
    db.run(`INSERT INTO request (firstname, lastname, number, email, commissionType, comment) VALUES (?, ?, ?, ?, ?, ?)`, 
    [firstname, lastname, number, email, commissionType, comment], 
    (err) => {
        if (err) {
            return console.error(err.message);
        }
        res.redirect('/contact'); 
    });
});

db.run(`CREATE TABLE IF NOT EXISTS request (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    number TEXT NOT NULL,
    email TEXT NOT NULL,
    commissionType TEXT NOT NULL,
    comment TEXT NOT NULL
)`, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Table created or already exists.');
    }
});

app.post('/submit', (req, res) => {
    const { firstname, lastname, number, email, commissionType, comment } = req.body;
    db.run(`INSERT INTO request (firstname, lastname, number, email, commissionType, comment) VALUES (?, ?, ?, ?, ?, ?)`, 
    [firstname, lastname, number, email, commissionType, comment], 
    (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Error inserting data');
        }
        console.log('Data inserted successfully');
        res.redirect('/'); // Redirect back to the form
    });
});

app.get('/requests', (req, res) => {
    db.all(`SELECT * FROM request`, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Error retrieving data');
        }
        res.render('requests', { requests: rows });
    });
});

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  