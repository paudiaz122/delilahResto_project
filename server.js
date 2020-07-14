/** Imports and definitions */
const express = require('express');
const server = express();
const bodyParser = require('body-parser');

//Route imports
const ordersRoutes = require('./routes/orders_routes');
const productsRoutes = require('./routes/products_routes');
const usersRoutes = require('./routes/users_routes');

//Para cada petición que se haga a los siguientes endpoints, uso las rutas específicas
server.use('/orders', ordersRoutes);
server.use('/products', productsRoutes);
server.use('/users', usersRoutes);

/** Middlewares */
server.use(bodyParser.json());

server.use((err, req, res, next) => {
    if(!err) return next();

    console.log('Error, algo salió mal', err);
    res.status(500).send('Error');
});

/** Server */
server.listen(3000, () => {
    console.log('Server initializing...');
});