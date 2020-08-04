const router = require('express').Router();
const path = require('path');
const fs = require('fs');



router.get('/', (req, res) => {
  const filePath = path.join(__dirname, '../data', 'cards.json');

  const reader = fs.createReadStream(filePath);

  reader.on('error', err => res.status(500).send({'message': err.message}));

  reader.on('open', () => {
    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
    reader.pipe(res);
  });

});

module.exports = router;