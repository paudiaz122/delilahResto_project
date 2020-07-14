const express = require('express');

//POSTS
server.post('/products', (req, res) =>{
    res.json('Agrego un producto');
});

//GETS
server.get('/products', (req, res) =>{
    res.json('Obtengo todos los productos');
});

//PATCHS
server.patch('/products/:idProduct', (req, res) =>{
    res.json('Modifico un producto');
});