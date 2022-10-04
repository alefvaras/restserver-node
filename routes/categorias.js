const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, categoriaoGet, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { validateCategory } = require('../helpers/db-validators');
const { validateJwt, isAdminRol } = require('../middlewares');
const { validateFileds } = require('../middlewares/validate-fields');

const router = Router();


router.get('/', [


],categoriaoGet)


//id middleware para ver si id existe
router.get('/:id', [
    check('id','no es id de mongo').isMongoId(),
    check('id').custom(validateCategory),
    validateFileds
],obtenerCategoria)



router.post('/', [

    validateJwt,
    check('nombre','nombre es obligatorio').not().isEmpty(),
    check('id','no es id de mongo').isMongoId(),
    validateFileds
], crearCategoria)

router.put('/:id', [
    validateJwt,
    check('id','no es id de mongo').isMongoId(),
    check('id').custom(validateCategory),
   
    validateFileds
],actualizarCategoria)


router.delete('/:id', [

    validateJwt,
    isAdminRol,
    check('id','no es id de mongo').isMongoId(),
    check('id').custom(validateCategory),
    validateFileds
],borrarCategoria)

module.exports= router;
