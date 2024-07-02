const {Router} = require('express');
const router = Router();

const user = require('../models/user');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) =>{
    res.send('App de Gastos');
})

router.post('/register', async (req, res)=>{
    const {cedula, nombre, email, password, ingresos, egresos} = req.body;
    const newUser = new user ({cedula, nombre, email, password, ingresos, egresos});
    await newUser.save();
    const token = jwt.sign({_id: newUser._id}, 'thisIsASecretKey');
    res.status(200).json({token});
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userFind = await user.findOne({ email });
    if (!userFind) return res.status(401).send("El correo no existe");
    if (userFind.password !== password) return res.status(401).send("Contraseña incorrecta");

    const token = jwt.sign({ _id: userFind._id }, 'thisIsASecretKey');
    res.status(200).json({ token });
});

router.put('/update', async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        const userFind = await user.findOne({ email });
        if (!userFind) return res.status(404).send("Usuario no encontrado");
        console.log(userFind.password);
        userFind.password = newPassword;
        console.log(userFind.password);
        await userFind.save();
        res.status(200).send("Contraseña actualizada correctamente");
    } catch (error) {
        res.status(500).send("Error al actualizar la contraseña");
    }
})

router.delete('/delete', async (req, res) =>{
    const {email, password} = req.body;
    try
    {
        const userFind = await user.findOne({ email });
        if (!userFind) return res.status(401).send("El correo no existe");
        if (userFind.password !== password) return res.status(401).send("Contraseña incorrecta");

        
        await userFind.deleteOne({_id: user._id});
        res.status(200).send("El usuario ha sido eliminado");
    }
    catch(error)
    {
        res.status(500).send("La eliminación ha sido incorrecta");
    }
    
})

router.get('/consulta-pub',(req, res) =>{
    res.json([
        {
            nombre:"Mateo Montenegro",
            date:"2024-11-17T20:39:05.211Z"
        },
        {
            nombre:"Juan Donoso",
            date:"2024-11-17T20:39:05.211Z"
        },
        {
            nombre:"Brenda Simbaña",
            date:"2024-11-17T20:39:05.211Z"
        }
    ])
})

router.get('/consulta-pri', verifyToken,(req, res) =>{
    res.json([
        {
            cedula: "1725578775",
            email:"emontenegro@gmail.com",
            ingresos:80000, 
            egresos:15000,
            date:"2024-11-17T20:39:05.211Z"
        },
        {
            cedula: "1723514335",
            email:"jdonoso@gmail.com",
            ingresos:76000, 
            egresos:12000,
            date:"2024-11-17T20:39:05.211Z"
        },
        {
            cedula: "1750568188",
            email:"bsimbana@gmail.com",
            ingresos:72000, 
            egresos:11000,
            date:"2024-11-17T20:39:05.211Z"
        }
    ])
})

module.exports = router;

function verifyToken(req, res, next){
    if(!req.headers.authorizacion){
        return res.status(401).send('Unthorize Request 1');
    }
    //se coloca por defecto la palabra bearer espacio y el token obtenido
    //dividir el string recibido 
    const token = req.headers.authorizacion.split(' ')[1]// crea un arreglo ['Bearer', 'token']
     if (token == 'null'){
        return res.status(401).send('Unthorize Request 2');
     }

     const payload = jwt.verify(token, 'thisIsASecretKey') //Contenido del token
     //console.log(payload)// muestra los datos contenidos en el payload deberia ser el id del usuario
     req.userId = payload._id ;
     next();
}