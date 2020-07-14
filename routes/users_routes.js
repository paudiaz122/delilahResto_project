const express = require('express');
const JWT = require('jsonwebtoken');
const controller = require('../controllers/users_controllers');
let lastId = 0;

//Al conectar con la BD eliminarlo
const users = [];

/**
 * @TODO: Validar que el usuario tenga nombre, apellido, email y contraseña.
 * Crear usuario.
 */
server.post('/users', (req, res) => {
    const user = req.body;

    user.id = ++lastId;
    //Al conectar con la BD cambiar la siguiente linea
    users.push(user);

    res.status(201).json(user);
});

/**
 * Login
 */
server.post('/login', validarCredencialesUsuario, (req, res) => {
    const user = users.find(user => user.email === req.body.email && user.password === req.body.password);
    const token = JWT.sign({
        nombre: user.nombre, 
        apellido: user.apellido,
        email: user.email,
        id: user.id,
        esAdmin: user.esAdmin
    }, JWTSign);

    res.status(200).json({
        token
    });
});

/**
 * Obtener listado de usuario
 */
server.get('/users', validarUsuarioAdministrador, (req, res) => {
    res.status(200).json(users);
});


/**
 * #2
 * 
 * @TODO: Validar que exista un usuario con ese email.
 * @TODO: Validar los datos que se intentan modificar.
 * 
 * Modificar usuario.
 */
/*
server.patch('/users/:userEmail', (req, res) => {
    const userEmail = req.params.userEmail;
    let userIndex;
    const user = users.find((user, index) => {
        if (user.email === userEmail) {
            userIndex = index;
            return user;
        }
    });

    users[userIndex] = {
        ...user,
        ...req.body
    };

    res.status(200).json(users[userIndex]);
});
*/

/**
 * #3
 * 
 * @TODO: Validar que exista un usuario con ese email.
 * @TODO: Validar los datos que se intentan modificar.
 * 
 * Definir permisos para un usuario (admin true/false).
 */
/*
server.patch('/users/:userEmail/admin', (req, res) => {
    const userEmail = req.params.userEmail;
    const esAdmin = req.body.esAdmin;
    let userIndex;
    
    users.find((user, index) => {
        if (user.email === userEmail) {
            userIndex = index;
            return true;
        }
    });

    users[userIndex].esAdmin = true;

    res.status(200).json(users[userIndex]);
});
*/