const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/api/save-json', (req, res) => {
  const data = JSON.stringify(req.body, null, 2);
  const filePath = path.join(__dirname, 'src', 'assets', 'data.json');

  fs.writeFile(filePath, data, (err) => {
    if (err) {
      res.status(500).send('Error al guardar el archivo');
    } else {
      res.send('Archivo guardado con éxito');
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
