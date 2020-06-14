const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
//const sequelize = new Sequelize('mysql://user:pass@host:port/database');
const server = express();

server.use(bodyParser.json());

/** Middleware */
function miMiddleware(req, res, next) {
    const {nombre, apellido} = req.body;
    if(!nombre || !apellido) {
        res.status(400)
            .json('Falta información');
    } else {
        next();
    }
}

/** Middleware para ruta específica */
server.post('/ejemplo', miMiddleware, (req, res) =>{
    res.json('Todo ok!');
});






/** Middleware general */
server.use((err, req, res, next) => {
    if(!err) return next();

    console.log('Error, algo salió mal', err);
    res.status(500).send('Error');
});

server.listen(3000, () => {
    console.log('Server initializing...');
});