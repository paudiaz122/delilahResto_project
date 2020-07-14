const express = require('express');

//POSTS
server.post('/orders', (req, res) =>{
    res.json('Crear un pedido');
});


//GETS
server.get('/orders', (req, res) =>{
    res.json('Obtener pedidos');
});