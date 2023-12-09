
const mongoose = require('mongoose');
const conexion = async () => {

    try {

        await mongoose.connect("mongodb://localhost:27017/mi_blog");

        // parametros dentro de obj - en caso de aviso
        // useNewUrlParser: true
        // useUnifiedTopology: true
        // useCreateIndex: true

        console.log("Conectado correctamente a la BBDD: mi_blog !");

    } catch (error) {
        console.log(error);
        throw new Error("No se ha podido conectar a la BBDD");
    }

}

module.exports = {
    conexion
}