
// importar MÓDULOS
const fs = require('fs');
const path = require('path');

// importar MODELOS
const Publication = require('../models/publication');

// importar SERVICIOS
const followService = require('../services/followService');

const pagination = require('mongoose-pagination');

// acciones de prueba
const pruebaPublication = (req, res) => {

    return res.status(200).send({
        message: "Mensaje enviado desde: controllers/publication.js"
    });
}

// guardar publication
const save = (req, res) => {

    // recoger datos del body
    const params = req.body;

    // SI no me llegan, dar respuesta negativa
    if(!params.text) return res.status(400).send({status: "error", 
        message: "Debes enviar el texto de la publication."});

    // crear y rellenar el obj del modelo
    let newPublication = new Publication(params);
    newPublication.user = req.user.id;

    // guardar obj en bbdd
    newPublication.save((error, publicationStored) => {

        if (error || !publicationStored) {

            return res.status(400).send({
                status: "error",
                message: "Texto no enviado."
            });
        }

        // devolver respuesta
        return res.status(200).send({
            status: "success",
            message: "Publicación guardada.",
            publicationStored
        });
    });
}

// sacar publication en concreto
const detail = (req, res) => {

    // sacar id de publicacion de la url
    const publicationId = req.params.id;

    // Find con la condicion del id
    Publication.findById(publicationId, (error, publicationStored) => {

        if (error || !publicationStored) {

            return res.status(404).send({
                status: "error",
                message: "No existe la publicación."
            });
        }

        // devolver respuesta
        return res.status(200).send({
            status: "success",
            message: "Mostrar publicación.",
            publication: publicationStored
        });
    });
}

// eliminar publications
const remove = (req, res) => {

    // sacar el id de la publicacion a eliminar
    const publicationId = req.params.id;

    // Find y luego un remove
    Publication.find({"user": req.user.id, "_id": publicationId})
        .remove(error => {

            if (error) {

                return res.status(500).send({
                    status: 'error',
                    message: "No se ha eliminado la publicación."
                });
            }

            // devolver respuesta
            return res.status(200).send({
                status: "success",
                message: "Método remover exitoso.",
                publication: publicationId
            });
    });
}

// listar publications de un usuario
const user = (req, res) => {

    // sacar el id del usu
    const userId = req.params.id;

    // controlar la página
    let page = 1;

    if (req.params.page) page = req.params.page;

    const itemsPerPage = 5;

    // Find, populate, ordenar, paginar
    Publication.find({"user": userId})
        .sort("-created_at")
        .populate("user", "-password -__v -role -email")
        .paginate(page, itemsPerPage, (error, publications, total) => {

        if (error || !publications || publications.length <= 0) {
            return res.status(404).send({
                status: "error",
                message: "No hay publicaciones para mostrar"
            });
        }

        // devolver respuesta
        return res.status(200).send({
            status: "success",
            message: "Publicaciones del perfil de un usu.",
            page,
            total,
            pages: Math.ceil(total/itemsPerPage),
            publications
        });
    });
}

// subir ficheros
const upload = (req, res) => {

    // sacar publicationId
    const publicationId = req.params.id;

    // recoger el fichero de imagen y comprobar si existe
    if (!req.file) {

        return res.status(404).send({
            status: "error",
            message: "Petición no incluye la imágen"
        });
    }

    // conseguir el nombre del archivo
    let image = req.file.originalname;

    // sacar la ext del archivo
    const imageSplit = image.split("\.");
    const extension = imageSplit[1];

    // comprobar ext
    if (extension != "png" && extension != "jpg" && extension != "jpeg" && extension != "gif") {

        // borrar archivo subido
        const filePath = req.file.path;
        console.log(filePath);

        const fileDeleted = fs.unlinkSync(filePath);

        // devolver respuesta negativa
        return res.status(400).send({
            status: "error",
            message: "Extensión del fichero invalida."
        });
    }

    // SI si es correcta, guardar imagen en bbdd
    Publication.findOneAndUpdate({ "user": req.user.id, "_id": publicationId }, 
        { file: req.file.filename }, 
        {new: true}, (error, publicationUpdated) => {

        if (error || !publicationUpdated) {

            return res.status(500).send({
                status: "error",
                message: "Error en la subida del avatar"
            });
        }

        // devolver respuesta
        return res.status(200).send({
            status: "success",
            publication: publicationUpdated,
            file: req.file
        });
    });
}

// devolver archivos multimedia - imágenes
const media = (req, res) => {

    // sacar el param de la url
    const file = req.params.file;

    // montar el path real de la imagen
    const filePath = "./uploads/publications/" + file; 

    // comprobar que existe
    fs.stat(filePath, (err, exists) => {

        if (!exists) return res.status(404).send({
            status: "error", 
            message: "No existe la imágen"
        });
    
        // devolver un file
        return res.sendFile(path.resolve(filePath));
    });
}

// listar todas las publications (FEED)
const feed = async (req, res) => {

    // sacar la page actual
    let page = 1;

    if (req.params.page) {
        page = req.params.page;
    }

    // establecer numero de elementos por page
    let itemsPerPage = 5;

    // sacar array de identificadores de usus que yo sigo como usu logueado
    try {

        const myFollows = await followService.followUserIds(req.user.id);

        // Find a publicaciones in, ordenar, popular, paginar
        const publications = Publication.find({
            // user: myFollows.following
            user: {"$in": myFollows.following}
        }).populate("user", "-password -role -__v -email")
          .sort("-created_at")
          .paginate(page, itemsPerPage, 
            (error, publications, total) => {

            if (error || !publications) {
                return res.status(500).send({
                    status: "error",
                    message: "No hay publicaciones para mostrar"
                });
            }

            return res.status(200).send({
                status: "success",
                message: "Feed de publicaciones.",
                following: myFollows.following,
                total,
                page,
                pages: Math.ceil(total/itemsPerPage),
                publications
            });
        });

    } catch (error) {

        return res.status(500).send({
            status: "error",
            message: "No se han listado las publicaciones del feed.",
            error
        });
    }
}

// exportar acciones
module.exports = {
    pruebaPublication,
    save,
    detail,
    remove,
    user,
    upload,
    media,
    feed
}