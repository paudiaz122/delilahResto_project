const JWT = require('jsonwebtoken');
const JWTSign = 'mySUPERpass.12';
const users_controllers = {};
let lastId = 0;

/** Midlewares controladores */
users_controllers.validateUserCredentials = (req, res, next) => {
    const usuario = req.body;
    const existeUsuario = users.find(user => user.email === usuario.email && user.password === usuario.password);

    if (existeUsuario) {
        next();
    } else {
        res.status(404).json({
            mensaje: 'Usuario o contraseña incorrectos'
        });
    }
};

users_controllers.registerUser = (req, res, next) => {

};

users_controllers.validateAdminUser = (req, res, next) => {
    try {
        const auth = req.headers.authorization;
        console.log(req.headers)
        const verify = JWT.verify(auth, JWTSign);

        if (verify.esAdmin) {
            next();
        } else {
            res.status(403).json({
                mensaje: 'Permisos no válidos'
            });
        }
    }
    catch (err) {
        res.status(401).json({
            mensaje: 'Token no válido'
        });
    }
};

module.exports = users_controllers;