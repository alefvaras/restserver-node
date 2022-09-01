const { Router } = require('express');
const { usuarioGet, usuarioPost, usuarioPut, usuarioDelete, usuarioPath } = require('../controllers/user');
const router = Router();



router.get('/', usuarioGet)


router.post('/', usuarioPost)
router.put('/:id', usuarioPut)
router.delete('/:id', usuarioDelete)
router.patch('/', usuarioPath)

module.exports= router;