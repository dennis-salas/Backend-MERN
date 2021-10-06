/*
    rutas de Usuarios /Auth
    host + api/auth
*/

const {Router} = require('express');
const {check} = require('express-validator');
const  {validarCampos} = require('../milddlewares/validar-campos');
const { validarJWT } = require('../milddlewares/validar-jwt');
const router = Router();

const {createUser, loginUser,  revalidToken} = require('../controllers/auth')

router.post(
    '/new', 
    [//middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({min:6}),
        validarCampos
    ],
    createUser);

router.post(
    '/', 
    [//middlewares
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({min:6}),
        validarCampos
    ],
    loginUser);


router.get('/renew', validarJWT, revalidToken);

module.exports = router;