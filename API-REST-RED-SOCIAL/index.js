
// importar dependencias
const {connection} = require('./database/connection');
const express = require('express');
const cors = require('cors');

// mensaje bienvenida
console.log("API Node para RRSS arrancada !");

// conexion a bbdd
connection();

// crear server node
const app = express();
const puerto = 3900;

// config cors
app.use(cors());

// convertir datos del body a objs js
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// cargar conf rutas
const UserRoutes = require('./routes/user');
const PublicationRoutes = require('./routes/publication');
const FollowRoutes = require('./routes/follow');

app.use('/api/user', UserRoutes);
app.use('/api/publication', PublicationRoutes);
app.use('/api/follow', FollowRoutes);

// ruta prueba
app.get('/ruta-prueba', (req, res) => {
    res.send("Ruta de la API para la Red Social is working...");
});

// poner server a escuchar peticiones http
app.listen(puerto, () => {
    console.log("Servidor de Node working on port: ", puerto);
});