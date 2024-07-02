const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/appGastos')
.then(db => console.log('Conectado'))
.catch(err => console.log('Error'));