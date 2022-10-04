const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerProducto, crearProducto, actualizarProducto, borrarProducto, productoGet } = require('../controllers/productos');

const { validateCategory, validateProducto } = require('../helpers/db-validators');
const { validateJwt, isAdminRol } = require('../middlewares');
const { validateFileds } = require('../middlewares/validate-fields');

const router = Router();


router.get('/', [


],productoGet)


//id middleware para ver si id existe
router.get('/:id', [
    check('id','no es id de mongo').isMongoId(),
    // check('id').custom(validateCategory),
    validateFileds
],obtenerProducto)



router.post('/', [

    validateJwt,
    check('nombre','nombre es obligatorio').not().isEmpty(),
    validateFileds
], crearProducto)

router.put('/:id', [
    validateJwt,
    check('id','no es id de mongo').isMongoId(),
    check('id').custom(validateProducto),
   
    validateFileds
],actualizarProducto)


router.delete('/:id', [

    validateJwt,
    isAdminRol,
    check('id','no es id de mongo').isMongoId(),
    check('id').custom(validateProducto),
    validateFileds
],borrarProducto)

module.exports= router;