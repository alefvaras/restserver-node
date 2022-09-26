const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validateFileds } = require('../middlewares/validate-fields');

const router = Router();


router.post('/login', [

    check('correo','correo es obligatorio').isEmail(),
    check('password','contraseña es obligatorio').not().isEmpty(),
    validateFileds
],login)

module.exports= router;