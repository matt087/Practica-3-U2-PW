const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors'); // Importa el paquete cors
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Configura CORS para permitir todas las solicitudes desde cualquier origen
app.use(cors());

// Ruta para manejar la solicitud POST
app.post('/api/save-json', (req, res) => {
  const data = JSON.stringify(req.body, null, 2);
  const filePath = "../src/assets/calculos.json";

  fs.writeFile(filePath, data, (err) => {
    if (err) {
      res.status(500).send('Error al guardar el archivo');
    } else {
      res.send('Archivo guardado con éxito');
    }
  });
});

app.post('/api/save-info', (req, res) => {
  const data = JSON.stringify(req.body, null, 2);
  const filePath = "../src/assets/datos.json";

  fs.writeFile(filePath, data, (err) => {
    if (err) {
      res.status(500).send('Error al guardar el archivo');
    } else {
      res.send('Archivo guardado con éxito');
    }
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
