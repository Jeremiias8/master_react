
const Follow = require('../models/follow');
const User = require('../models/user');

// importar dependencias
const mongoosePagination = require('mongoose-pagination');

// importar dependencias
const followService = require('../services/followService');

// acciones de prueba
const pruebaFollow = (req, res) => {

    return res.status(200).send({
        message: "Mensaje enviado desde: controllers/follow.js"
    });
}

// accion de guardar un follow (accion seguir)
const save = (req, res) => {

    // conseguir datos por body
    let params = req.body;

    // sacar id del usuario identificado
    const identity = req.user;

    // crear obj con modelo follow
    let userToFollow = new Follow({
        user: identity,
        followed: params.followed
    });

    // guardar obj en bbdd
    userToFollow.save((error, followStored) => {

        if (error || !followStored) {

            return res.status(500).send({
                status: "error",
                message: "No se ha podido seguir al usuario"
            });
        }

        return res.status(200).send({
            status: "success",
            identity: req.user,
            follow: followStored
        });
    });
}

// accion de borrar un follow (accion dejar de seguir)
const unfollow = (req, res) => {

    // recoger id del usu identificado
    const userId = req.user.id;

    // recoger id del usuario que sigo y quiero dejar de seguir
    const followedId = req.params.id;

    // find de las coincidencias y hacer remove
    Follow.find({
        "user": userId,
        "followed": followedId
    }).remove((error, followDeleted) => {
       
        if (error || !followDeleted) {
            return res.status(500).send({
                status: 'error',
                message: "No has dejado de seguir a nadie"
            });
        }

        return res.status(200).send({
            status: "success",
            message: "Follow eliminado correctamente"
        });
    });
}

// accion listado de usuarios que estoy siguiendo
const following = (req, res) => {

    // sacar id del usu identificado
    let userId = req.user.id;

    // comprobar si me llega el id por param en url
    if (req.params.id) userId = req.params.id;

    // comprobar si me llega la page, si no la page 1
    let page = 1;

    if (req.params.page) page = req.params.page;

    // usuarios por pagina quiero mostrar
    const itemsPerPage = 5;

    // find a follow, popular datos de los usus y paginar con mongoose paginate
    Follow.find({user: userId})
        .populate("user followed", "-password -role -__v -email")
        .paginate(page, itemsPerPage, async(error, follows, total) => {

        // listado de usuarios de trinity, y soy Jere
        // sacar array de ids de los usus que me siguen y los que sigo como jere
        let followUserIds = await followService.followUserIds(req.user.id);

        return res.status(200).send({
            status: "success",
            message: "Listado de usuarios que estoy siguiendo.",
            follows,
            total,
            pages: Math.ceil(total/itemsPerPage),
            user_following: followUserIds.following,
            user_follow_me: followUserIds.followers 
        });
    });
}

// accion listado de usuarios que siguen a cualquier otro usu (soy seguido, mis seguidores)
const followers = (req, res) => {

    // sacar id del usu identificado
    let userId = req.user.id;

    // comprobar si me llega el id por param en url
    if (req.params.id) userId = req.params.id;

    // comprobar si me llega la page, si no la page 1
    let page = 1;

    if (req.params.page) page = req.params.page;

    // usuarios por pagina quiero mostrar
    const itemsPerPage = 5;

    Follow.find({followed: userId})
        .populate("user", "-password -role -__v -email")
        .paginate(page, itemsPerPage, async(error, follows, total) => {

        let followUserIds = await followService.followUserIds(req.user.id);

        return res.status(200).send({
            status: "success",
            message: "Listado de usuarios que me siguen.",
            follows,
            total,
            pages: Math.ceil(total/itemsPerPage),
            user_following: followUserIds.following,
            user_follow_me: followUserIds.followers 
        });
    });
}

// exportar acciones
module.exports = {
    pruebaFollow,
    save,
    unfollow,
    following,
    followers
}




