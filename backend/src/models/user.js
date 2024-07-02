const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    cedula: String,
    nombre:String, 
    email: String,
    password: String,
    ingresos:Number,
    egresos:Number
},{
    timestamps: true
});

module.exports = model('user', userSchema);