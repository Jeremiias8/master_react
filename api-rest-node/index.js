
const {conexion} = require("./database/connection");
const express = require("express");
const cors = require("cors");

// inicializar app
console.log("mensaje desde el back con Node");

// conectar a BBDD
conexion();

// crear servidor Node
const app = express();
const puerto = 3900;

// configurar CORS
app.use(cors());

// convertir body a obj js
app.use(express.json()); // recibir datos con content-type app/json
app.use(express.urlencoded({ extended: true })); // form-urlencoded

// crear rutas 
app.get("/", (req, res) => {
    res.status(200).send(
        "<h1>Bienvenido a la API Rest con Node para un MERN Stack.</h1>"
    );
});

// RUTAS
const rutas_articulo = require('./routes/articulo');

// cargar rutas
app.use("/api", rutas_articulo);

// rutas prueba hardcodeadas
app.get("/test", (req, res) => {
    res.status(200).send({message: "ruta base correctamente creada"});
});

app.get("/json", (req, res) => {
    
    return res.status(200).json([{
        curso: "Master en React",
        autor: "Victor Robles",
        url: "victorroblesweb.es/master-react"
    },
    {
        curso: "Master en Angular",
        autor: "Victor Robles",
        url: "victorroblesweb.es/master-angular"
    }
    ]);
 
});

// crear server y escuchar peticiones HTTP
app.listen(puerto, () => {
    console.log("Servidor corriendo en el puerto "+puerto);
});