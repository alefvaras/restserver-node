const { Router } = require('express');
const { check } = require('express-validator');
const { usuarioGet, usuarioPost, usuarioPut, usuarioDelete, usuarioPath } = require('../controllers/user');
const { isRolevalidate, emailExist, idExist } = require('../helpers/db-validators');
// const { validateFileds } = require('../middlewares/validate-fields');
// const { validateJwt } = require('../middlewares/validate-jwt');
// const { isAdminRol, tieneRol } = require('../middlewares/validate-roles');

const {validateFileds,validateJwt,tieneRol} =require('../middlewares');
const Role = require('../models/role');
const router = Router();



router.get('/', usuarioGet)


router.post('/', [
    check('nombre', 'nombre es obligatorio').not().isEmpty(),
    check('password', 'password mayor a 6 letreas').isLength({ min: 6 }),
    check('correo', 'correo invalido formato').isEmail(),
    // check('rol','no es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(isRolevalidate),
    check('correo').custom(emailExist),
    validateFileds
],
    usuarioPost)
router.put('/:id', [
    check('id', 'no es un id valido').isMongoId(),
    check('id').custom(idExist),
    check('rol').custom(isRolevalidate),
    validateFileds
], usuarioPut)
router.delete('/:id', [
    validateJwt,
    // isAdminRol,
    tieneRol('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'no es un id valido').isMongoId(),
    check('id').custom(idExist),
    validateFileds
], usuarioDelete)
router.patch('/', usuarioPath)

module.exports = router;