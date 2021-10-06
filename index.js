const express = require('express');
const { mongoose } = require('./database/config');
require('dotenv').config();
//const cors = require('cors');

//Crear el servidor de express
const app = express();

//Base de datos
mongoose;


//CORS
//app.use(cors());


//Directorio publico
app.use(express.static('public'));

//Lectura y parseo del body
app.use(express.json());

///Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


//Escucha peticiones
app.listen(process.env.PORT || 5000, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT || 5000}`);
});