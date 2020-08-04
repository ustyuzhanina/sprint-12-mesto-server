const router = require('express').Router();
const path = require('path');
const fs = require('fs');
//const { createReadStream } = require('fs'); next sprint


router.get('/', (req, res) => {
  const filePath = path.join(__dirname, '../data', 'users.json');
  const reader = fs.createReadStream(filePath);

  reader.on('error', err => res.status(500).send({'message': err.message}));

  reader.on('open', () => {
    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
    reader.pipe(res);
  });

});


router.get('/:id', (req, res) => {
  const filePath = path.join(__dirname, '../data', 'users.json');
  const reader = fs.createReadStream(filePath, {encoding: 'utf8'});

  reader.on('error', err => res.status(500).send({'message': err.message}));

  let array = '';

  reader.on('data', (chunk) => {
    array += chunk.toString();
  });

    reader.on('end', () => {
      const arrayParsed = JSON.parse(array);
      const user = arrayParsed.find((user) => String(user._id) === req.params.id);

      if(!user) {
        res.status(404).send({ "message": "Нет пользователя с таким id" });
        return;
      }

      res.send(user);
    })



});

module.exports = router;