const router = require('express').Router();
const path = require('path');
const fs = require('fs');

router.get('/', (req, res) => {
  const filePath = path.join(__dirname, '../data', 'cards.json');

  const reader = fs.createReadStream(filePath);

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
    }

    const dataParsed = JSON.parse(data);

    res.send(dataParsed);
  });
});

module.exports = router;
