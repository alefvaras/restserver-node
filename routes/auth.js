const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validateFileds } = require('../middlewares/validate-fields');

const router = Router();


router.post('/login', [

    check('correo','correo es obligatorio').isEmail(),
    check('password','contraseña es obligatorio').not().isEmpty(),
    validateFileds
],login)

router.post('/google', [

    check('id_token','token de google es requerido').not().isEmpty(),
    validateFileds
],googleSignIn)

module.exports= router;