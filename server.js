/** Imports and definitions */
const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const projectDatabase = require('./config/database');

//Route imports
const ordersRoutes = require('./routes/orders_routes');
const productsRoutes = require('./routes/products_routes');
const usersRoutes = require('./routes/users_routes');

server.use(bodyParser.json());

//Para cada petición que se haga a los siguientes endpoints, uso las rutas específicas
server.use('/orders', ordersRoutes);
server.use('/products', productsRoutes);
server.use('/users', usersRoutes);

/** Server */
projectDatabase.sequelize.authenticate()
.then(() => {
    server.listen(3000, () => {
        console.log('Server initialized on port 3000');
    });
  })
  .catch(err => {
    console.log('Unable to connect to the database:', err);
  });