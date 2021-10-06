const { response } = require('express');
const bcrypt = require('bcryptjs');
const Users = require('../models/userModel');
const {generarJWT} = require('../helpers/jwt');


const createUser = async(req, res = response) => {

    console.log(req.body);
    const {email, password} = req.body;

    try {
        let user =  await Users.findOne({email});
        
        if(user) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            });
        }
        
        user = new Users(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        await user.save();

        //Generar JWT
        const token = await generarJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
    
};


const loginUser = async(req, res = response) => {

    const {email, password} = req.body;

    try {
        
        const user =  await Users.findOne({email});
        
        if(!user) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario no existe con ese correo'
            });
        }

        //Confirmar el passwords
        const validPassword = bcrypt.compareSync(password, user.password);

        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        //Generar JWT
        const token = await generarJWT(user.id, user.name);


        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const revalidToken = async (req, res = response) => {

    const {uid, name} = req;

    //Generar JWT
    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        token
    })
    
};

module.exports = {
    createUser,
    loginUser,
    revalidToken
}