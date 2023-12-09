/* const {Router} = require('express');
const router = Router();
*/

const express = require('express');
const multer = require('multer');
const ArticuloController = require('../controllers/articulo');

const router = express.Router();

const almacenamiento = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './imagenes/articulos/');
    },

    filename: function (req, file, cb) {
        // return 'archivo' + Date.now() + '.jpg';

        cb(null, "articulo" + Date.now() + file.originalname);
    }
})

const subidas = multer({storage: almacenamiento});

// rutas de prueba
router.get("/ruta-prueba", ArticuloController.prueba);
router.get("/curso", ArticuloController.curso);

// ruta utilidades
router.post('/crear', ArticuloController.crear);
router.get('/articulos/:ultimos?', ArticuloController.listar);
router.get('/articulo/:id', ArticuloController.uno);
router.delete('/articulo/:id', ArticuloController.borrar);
router.put('/articulo/:id', ArticuloController.editar);
router.post('/subir-imagen/:id', subidas.single("file0"), ArticuloController.subir);
router.get('/imagen/:fichero', ArticuloController.imagen);
router.get('/buscar/:busqueda', ArticuloController.buscador);

module.exports = router;