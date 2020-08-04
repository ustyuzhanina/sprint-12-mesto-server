const express = require('express');
const path = require('path');
const fs = require('fs');


const cards = require('./routes/cards.js');
const users = require('./routes/users.js');


const { PORT = 3000 } = process.env;

const app = express();

app.use(express.static(path.join(__dirname, 'public'))); // теперь клиент имеет доступ только к публичным файлам

app.use('/cards', cards);

app.use('/users', users);

app.use((req, res) => {
  res.status('404');
  res.send({ "message": "Запрашиваемый ресурс не найден" });
});

app.listen(PORT);