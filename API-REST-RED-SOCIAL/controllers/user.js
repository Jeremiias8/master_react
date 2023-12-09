
// importar dependencies and modules
const bcrypt = require('bcrypt');
const mongoosePaginate = require('mongoose-pagination');
const fs = require('fs');
const path = require('path');

const User = require('../models/user');
const Follow = require('../models/follow');
const Publication = require('../models/publication');

// importar servicios
const jwt = require('../services/jwt');
const followService = require('../services/followService');

// acciones de prueba
const pruebaUser = (req, res) => {

    return res.status(200).send({
        message: "Mensaje enviado desde: controllers/user.js",
        usuario: req.user
    });
}

// Registro de usuarios
const register = (req, res) => {

    // recoger datos peticion
    let params = req.body;
    
    // comprobar que llegan bien (+ validacion)
    if (!params.name && !params.email && !params.password && !params.nick) {
        
        return res.status(400).json({
            status: "error",
            message: "Faltan datos por enviar"
        });
    }

    // control usus duplicados
    User.find({ $or: [

        {email: params.email.toLowerCase()},
        {nick: params.nick.toLowerCase()}

    ],
    }).exec(async (error, users) => {

        if (error) return res.status(500).json({
            status: "error", 
            message: "Error en la consulta de usuarios..."
        });

        if (users && users.length >= 1) {

            return res.status(200).send({
                status: "success",
                message: "Usuario registrado.",
                users
            });
        } 

        // cifrar password
        let pwd = await bcrypt.hash(params.password, 10);
        params.password = pwd;

        // console.log(pwd); 
        
        // crear obj de usuario
        let user_to_save = new User(params);

        // guardar usu en bbdd
        user_to_save.save().then((error, userStored) => {

            if (error || !userStored) return res.status(500).send({status: 'error', message: "Error al guardar el usuario"});

            // devolver result
            return res.status(200).json({
                status: "success",
                message: "Usuario registrado correctamente",
                user: userStored
            });
        });

    });
}

const login = (req, res) => {
    // recoger params body
    const params = req.body;

    if (!params.email || !params.password) {

        return res.status(400).send({
            status: "error",
            message: "Faltan datos por enviar"
        });
    }

    // buscar en la bbdd si existe
    User.findOne({ email: params.email })
        // .select({ "password": 0 })
        .exec((error, user) => {

        if (error || !user) return res.status(404).send({
            status: "error", message: "No existe el usuario."});
    
            // comprobar password
            const pwd = bcrypt.compareSync(params.password, user.password);

            if (!pwd) {
                return res.status(400).send({
                    status: "error",
                    message: "No te has identificado correctamente"
                });
            }

            // devolver token
            const token = jwt.createToken(user);

            // eliminar password del obj

            // devolver data del usuario

            return res.status(200).send({
                status: "success",
                message: "Acción de login",
                user: {
                    id: user._id,
                    name: user.name,
                    nick: user.nick
                },
                token
            });
        });
}

const profile = (req, res) => {

    // recibir el param del id del usuario por la url
    const id = req.params.id;

    // consulta para sacar los datos del usuario
    // const userProfile = await User.findById(id);

    User.findById(id) 
        .select({password: 0, role: 0})
        .exec(async (error, userProfile) => {

        if (error || !userProfile) {
            return res.status(404).send({
                error: "error",
                message: "El usuario no existe o hay un error"
            });
        }

        // info de seguimiento
        const followInfo = await followService.followThisUser(req.user.id, id);

        // devolver el resultado
        // POSTERIORMENTE: devolver info de follows
        return res.status(200).send({
            status: "success",
            user: userProfile,
            following: followInfo.following,
            follower: followInfo.follower
        });
    });

}

const list = (req, res) => {

    // controlar en que pagina estamos
    let page = 1;
    if (req.params.page) {
        page = req.params.page;
    }
    page = parseInt(page);

    // consulta con mongoose paginate
    let itemsPerPage = 3;

    User.find()
        .select("-password -email -role -__v")
        .sort('_id')
        .paginate(page, itemsPerPage, 
            async (error, users, total) => {

        if (error || !users) {

            return res.status(404).send({
                status: "error",
                message: "No hay usuarios disponibles",
                error
            });
        }

        // sacar array de ids de los usus que me siguen y los que sigo como jere
        let followUserIds = await followService.followUserIds(req.user.id);

        // devolver resultado (posteriormente info follow)
        return res.status(200).send({
            status: "success",
            users,
            page,
            itemsPerPage,
            total,
            pages: Math.ceil(total/itemsPerPage),
            user_following: followUserIds.following,
            user_follow_me: followService.followers
        });
    });

}

const update = (req, res) => {

    // recoger info del usuario a actualizar
    let userIdentity = req.user;
    let userToUpdate = req.body;

    // eliminar campos sobrantes
    delete userToUpdate.iat;
    delete userToUpdate.exp;
    delete userToUpdate.role;
    delete userToUpdate.image;

    // comprobar si el usuario ya existe
    User.find({ $or: [

        { email: userToUpdate.email.toLowerCase() },
        { nick: userToUpdate.nick.toLowerCase() }

    ],
    }).exec(async (error, users) => {

        if (error) return res.status(500).json({status: "error", 
        message: "Error en la consulta de usuarios..."});

        let userIsset = false;
        users.forEach(user => {
            
            if (user && user._id != userIdentity.id) userIsset = true;
        });

        if (userIsset) {

            return res.status(200).send({
                status: "success",
                message: "El usuario ya existe"
            });

        } 

        // cifrar password
        if (userToUpdate.password) {

            let pwd = await bcrypt.hash(userToUpdate.password, 10);
            userToUpdate.password = pwd;
        } else {
            delete userToUpdate.password;
        }

        // buscar y actualizar
        try {

            let userUpdated = await User.findByIdAndUpdate({ 
                _id: userIdentity.id }, userToUpdate, {new: true});

            if (!userUpdated) {

                return res.status(400).json({
                    status: "error", 
                    message: "Error al actualizar usuario"
                });
            }

            // devolver respuesta
            return res.status(200).send({
                status: "success",
                message: "Método de actualizar usuario",
                user: userUpdated
            });

        } catch (error) {

            return res.status(500).send({
                status: "error",
                message: "Error al actualizar"
            });
        }

    });
}

const upload = (req, res) => {

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
    User.findOneAndUpdate({ _id: req.user.id }, { image: req.file.filename }, 
        {new: true}, (error, userUpdated) => {

        if (error || !userUpdated) {

            return res.status(500).send({
                status: "error",
                message: "Error en la subida del avatar"
            });
        }

        // devolver respuesta
        return res.status(200).send({
            status: "success",
            user: userUpdated,
            file: req.file
        });
    });
}

const avatar = (req, res) => {

    // sacar el param de la url
    const file = req.params.file;

    // montar el path real de la imagen
    const filePath = "./uploads/avatars/"+file; 

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

const counters = async (req, res) => {

    let userId = req.user.id;

    if (req.params.id) {
        userId = req.params.id;
    }

    try {

        const following = await Follow.count({ "user": userId });
        const followed = await Follow.count({ "followed": userId });
        const publications = await Publication.count({ "user": userId });

        return res.status(200).send({
            userId,
            following: following,
            followed: followed,
            publications: publications
        });

    } catch (error) {

        return res.status(500).send({
            status: "error",
            message: "Error en método counters",
            error
        });
    }
}

// exportar acciones
module.exports = {
    pruebaUser,
    register,
    login,
    profile,
    list,
    update,
    upload,
    avatar,
    counters
}