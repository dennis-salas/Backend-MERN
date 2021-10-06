/*
    rutas de Eventos /Events
    host + api/events
*/

const {Router} = require('express');
const {validarJWT} = require('../milddlewares/validar-jwt');
const {check} = require('express-validator');
const  {validarCampos} = require('../milddlewares/validar-campos');
const router = Router();

const {getEventos, createEvento, updateEvento, deleteEvento} = require('../controllers/events');
const { isDate } = require('../helpers/isDate');


// Obtener eventos
router.get('/', getEventos);


//Todas tienene que pasar por la validacion del JWT
router.use(validarJWT);

//Crear un nuevo eventos
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos
   ],
    createEvento);

//Actualizar Evento
router.put(
    '/:id', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos
    ],
    updateEvento);

//Borrar evento
router.delete('/:id', deleteEvento);

module.exports = router;