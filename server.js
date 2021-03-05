const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const tables = [];

const waitList = [];

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/tables', (req, res) => res.sendFile(path.join(__dirname, 'tables.html')));

app.get('/reserve', (req, res) => res.sendFile(path.join(__dirname, 'reserve.html')));

app.get('/api/tables', (req, res) => res.json(tables));

app.get('/api/waitList', (req, res) => res.json(waitList));

app.get('/api/tables/available', (req, res) => res.json(5 - tables.length));

app.post('/api/tables', (req, res) => {
  const newTable = req.body;
  console.log(newTable);
    if (tables.length >= 5) {
        waitList.push(newTable);
        console.log('added to waitlist');
        res.json(false);
    } else {
        tables.push(newTable);
        console.log('added to reservations');
        res.json(true);
    };
});

app.post('/api/clear', (req, res) => {
    tables.length = 0;
    waitList.length = 0;
    res.json('cleared');
});

app.get('/api/log', (req, res) => {
    console.log('tables:');
    console.log(tables);
    console.log('waitlist:');
    console.log(waitList);
    res.json('logged');
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
