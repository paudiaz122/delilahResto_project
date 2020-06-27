const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
//const myDatabase = new Sequelize('mysql://user:pass@host:port/database');
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
server.get('/ejemplo', miMiddleware, (req, res) =>{
    res.json('Todo ok!');
});

/** Artículos */

server.get('/articulos', (req, res) =>{
    res.json('Artículos');
});

server.get('/articulos', (req, res) =>{
    res.json('Artículos');
});

/** Pedidos */

server.get('/pedidos', (req, res) =>{
    res.json('Pedidos');
});

/** Usuarios */

server.get('/usuarios', (req, res) =>{
    res.json('Todos los usuarios');
});

server.get('/usuarios/:idUsuario', (req, res) =>{
    res.json('Usuario con un id determinado');
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