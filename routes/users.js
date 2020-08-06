const router = require('express').Router();
const path = require('path');
const fs = require('fs');
// const { createReadStream } = require('fs'); next sprint

function createReadStream(fileName) {
  const filePath = path.join(__dirname, '../data', fileName);
  return fs.createReadStream(filePath);
}

router.get('/', (req, res) => {
  const reader = createReadStream('users.json');

  reader.on('error', (err) => res.status(500).send({ message: err.message }));

  let data = '';

  reader.on('data', (chunk) => {
    data += chunk.toString();
  });

  reader.on('end', () => {
    try {
      JSON.parse(data);
    } catch (err) {
      res.status(500).send({ message: err.message });
      return;
    }

    const dataParsed = JSON.parse(data);

    res.send(dataParsed);
  });
});

router.get('/:id', (req, res) => {
  const reader = createReadStream('users.json');

  reader.on('error', (err) => res.status(500).send({ message: err.message }));

  let array = '';

  reader.on('data', (chunk) => {
    array += chunk.toString();
  });

  reader.on('end', () => {
    try {
      JSON.parse(array);
    } catch (err) {
      res.status(500).send({ message: err.message });
      return;
    }

    const arrayParsed = JSON.parse(array);
    const userFound = arrayParsed.find((user) => String(user._id) === req.params.id);

    if (!userFound) {
      res.status(404).send({ message: 'Нет пользователя с таким id' });
      return;
    }

    res.send(userFound);
  });
});

module.exports = router;
