const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const tables = [
    {
        name: 'Mandy',
        phoneNumber: '(123)-456-7890',
        email: 'mandylikestreats@gmail.dog',
        uniqueID: '999111333',
    },
];

const waitList = [
    {
        name: 'Mandy',
        phoneNumber: '(123)-456-7890',
        email: 'mandylikestreats@gmail.dog',
        uniqueID: '999111333',
    },
];

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/tables', (req, res) => res.sendFile(path.join(__dirname, 'tables.html')));

app.get('/reserve', (req, res) => res.sendFile(path.join(__dirname, 'reserve.html')));

app.get('/api/tables', (req, res) => res.json(tables));

app.get('/api/waitList', (req, res) => res.json(waitList));

app.post('/api/tables', (req, res) => {
  const newTable = req.body;

  console.log(newTable);

  tables.push(newTable);

  res.json(newTable);
});

app.post('/api/waitList', (req, res) => {
    const newEntry = req.body;
  
    console.log(newEntry);
  
    waitList.push(newEntry);
  
    res.json(newEntry);
  });

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
