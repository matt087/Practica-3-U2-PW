const express = require('express');
const app = express();

require('./database');

app.use(express.json());
app.use(require('./routes/index'));
app.listen(3001);
console.log('Puerto: ', 3001);