const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagen, mostrarArchivo, actualizarImagenCloudinary } = require('../controllers/uploads');
const { validatColeccionesPermitidas } = require('../helpers/db-validators');

const { validateFileds } = require('../middlewares/validate-fields');

const router = Router();


router.post('/',cargarArchivo)

    
router.put('/:coleccion/:id',[

    check('id','no es id de mongo').isMongoId(),
    check('coleccion').custom(c=>validatColeccionesPermitidas(c,['usuarios','productos'])),
validateFileds
],
actualizarImagenCloudinary)

router.get('/:coleccion/:id',[
    check('id','no es id de mongo').isMongoId(),
    check('coleccion').custom(c=>validatColeccionesPermitidas(c,['usuarios','productos'])),
validateFileds
],
mostrarArchivo)

  
  

module.exports= router;