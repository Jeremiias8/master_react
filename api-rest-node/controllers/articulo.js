
const fs = require('fs');
const path = require('path');
const {validarArticulo} = require('../helpers/validar');
const Articulo = require('../models/Articulo');

const prueba = (req, res) => {

    return res.status(200).json({
        message: "soy una acción de prueba desde el controlador de articulos"
    });
}

const curso = (req, res) => {

    return res.status(200).json([{
        curso: "Master en React controller",
        autor: "Jeremías",
        url: "jeremiasweb.es/master-react"
    },
    {
        curso: "Master en Angular controller",
        autor: "Jeremías",
        url: "jeremiasweb.es/master-angular"
    }
    ]);

}

const crear = (req, res) => {

    // recoger params por post a guardar
    let parametros = req.body;

    // validar datos
    try {
        validarArticulo(parametros);

    } catch (error) {

        return res.status(400).json({
            status: "error",
            message: "Faltan datos por enviar"
        });
    }

    // crear obj a guardar
    const articulo = new Articulo(parametros);

    // asignar valores a obj basado en el model (manual o automatico)
    // articulo.titulo = parametros.titulo;

    // guardar articulo en BBDD
    articulo.save().then((articuloGuardado) => {

        if (!articuloGuardado) {

            return res.status(400).json({
                status: 'error',
                message: error ? error : 'Error al insertar el artículo'
            });
        }

        // devolver resultado
        return res.status(200).json({
            status: 'success',
            articulo: articuloGuardado,
            message: "Articulo creado con exito !"
        }); 

    })
    .catch(error => {

        return res.status(500).send({
            status: 'error',
            message: "Error en el server !",
            error
        });
    });

}

const listar = async (req, res) => {

    try {
        let consulta = Articulo.find({});

        if (req.params.ultimos) {
            consulta.limit(3);
        }

        let articulos = await consulta.sort({fecha: -1}).exec();

        if (!articulos) {
            return res.status(404).json({
                status: 'error',
                message: "No se han encontrado articulos"
            });
        }
    
        return res.status(200).send({
            status: "success",
            parametro: req.params.ultimos,
            contador: articulos.length,
            articulos
        });

    } catch (error) {

        return res.status(500).send({
            status: "error",
            mensaje: "Ocurrió un error interno del servidor",
            error
        });
    }
}

const uno = (req, res) => {
    // recoger id por url
    let id = req.params.id;

    // buscar el articulo
    Articulo.findById(id).then((articulo) => {

        // si no existe devolver error
        if (!articulo) {
            return res.status(404).json({
                status: "error",
                message: "No se ha encontrado ningún artículo"
            });
        }

        // devolver resultado
        return res.status(200).json({
            status: "success",
            articulo
        });

    })
    .catch((error) => {
        return res.status(500).json({
            status: "error",
            message: "Ha ocurrido un error",
            error
        });
    });
}

const borrar = (req, res) => {
    // recoger id del articulo a eliminar
    let articuloId = req.params.id;

    // buscar por id y eliminar
    Articulo.findOneAndDelete({_id: articuloId}, 
        (articuloBorrado) => {

        if (!articuloBorrado) {
            return res.status(500).json({
                status: "success",
                message: "Error al borrar el artículo"
            });
        }

        return res.status(200).json({
            status: "success",
            articulo: articuloBorrado,
            message: "Método de borrar activado"
        });
    });
}

// validar articulo

const editar = (req, res) => {

    // recoger id articulo a editar
    let articuloId = req.params.id;

    // recoger datos del body
    let parametros = req.params.body;

    // validar datos
    try {
        validarArticulo(parametros);

    } catch (error) {

        return res.status(400).json({
            status: "error",
            message: "Faltan datos por enviar"
        });
    }

    // buscar y actualizar articulo
    Articulo.findOneAndUpdate({_id: articuloId}, parametros, 
        {new: true}, (error, articuloActualizado) => {

        if (error || !articuloActualizado) {
            return res.status(500).json({
                status: "error",
                message: "Error al actualizar el artículo"
            });
        }

        // devolver respuesta
        return res.status(200).json({
            status: "success",
            articulo: articuloActualizado
        });
    });
}

const subir = (req, res) => {

    // configurar multer

    // recoger fichero de imagen subido
    if (!req.file && !req.files) {
        return res.status(404).json({
            status: "error",
            message: "Petición invalida"
        });
    }

    // nombre del archivo
    let archivo = req.file.originalname;

    // ext. del archivo
    let archivo_split = archivo.split("\.");
    let extension = archivo_split[1];

    // comprobar ext. correcta
    if (extension != 'png' && extension != 'jpg' && 
        extension != 'jpeg' && extension != 'gif') {
        
        // borrar archivo y dar response
            fs.unlink(req.file.path, (error) => {
                return res.status(400).json({
                    status: "error",
                    message: "Imagen invalida"
                });
            })
    } else {

        // si todo va cool, actualizar articulo

        // recoger id articulo a editar
        let articuloId = req.params.id;

        // recoger datos del body
        let parametros = req.params.body;

        // validar datos
        try {
            validarArticulo(parametros);

        } catch (error) {

            return res.status(400).json({
                status: "error",
                message: "Faltan datos por enviar"
            });
        }

        // buscar y actualizar articulo
        Articulo.findOneAndUpdate({_id: articuloId}, {imagen: req.file.filename}, {new: true}, (error, articuloActualizado) => {

            if (error || !articuloActualizado) {

                return res.status(500).json({
                    status: "error",
                    message: "Error al actualizar el artículo"
                });
            }

            // devolver respuesta
            return res.status(200).json({
                status: "success",
                articulo: articuloActualizado,
                files: req.file
            });
        });
    }
}

const imagen = (req, res) => {
    let fichero = req.params.fichero;
    let ruta_fisica = "./imagenes/articulos/"+fichero;

    fs.access(ruta_fisica, (error, existe) => {

        if (existe) {
            return res.sendFile(path.resolve(ruta_fisica)); 
        } else {
            return res.status(404).json({
                status: "error",
                message: "La imagen no existe",
                existe,
                fichero,
                ruta_fisica
            });
        }
    });

}

const buscador = (req, res) => {

    // sacar string de busqueda
    let busqueda = req.params.busqueda;

    // find OR
    Articulo.find({ "$or": [
        { "titulo": { "$regex": busqueda, "$options": "i" }},
        { "contenido": { "$regex": busqueda, "$options": "i" }}
    ]})
    .sort({fecha: -1})
    .exec().then((articulosEncontrados) => {

        // ejecutar consulta
        if (!articulosEncontrados || articulosEncontrados.length <= 0) {

            return res.status(404).json({
                status: "error",
                message: "No se han encontrado artículos"
            });
        }

        // devolver response
        return res.status(200).json({
            status: "success",
            articulos: articulosEncontrados
        });
    })

    // if (!busqueda.empty) {console.log("el buscador no está vacío");}
}

module.exports = {
    prueba,
    curso,
    crear,
    listar,
    uno,
    borrar,
    editar,
    subir,
    imagen,
    buscador
}