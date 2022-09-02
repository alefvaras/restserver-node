const { Router } = require('express');
const { check } = require('express-validator');
const { usuarioGet, usuarioPost, usuarioPut, usuarioDelete, usuarioPath } = require('../controllers/user');
const router = Router();



router.get('/', usuarioGet)


router.post('/',[
    check('correo','correo invalido formato').isEmail()]
    , usuarioPost)
router.put('/:id', usuarioPut)
router.delete('/:id', usuarioDelete)
router.patch('/', usuarioPath)

module.exports= router;