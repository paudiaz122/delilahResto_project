const projectDatabase = require('../config/database');
const orders_controllers = {};

const catchDatabaseEror = (err, res) => {
    res.status(500).json({
        message: 'Hubo un error con la base de datos.',
        error: err
    });
};

orders_controllers.newOrder = async (req, res) => {
    const loggedUser = res.locals.payloadUsuario;
    const newOrder = {
        userId: loggedUser.userId,
        totalPrice: calculateTotalPrice(req.body.products),
        paymentMethod: req.body.paymentMethod,
        state: 'Realizado',
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    //Nueva orden en la BDD
    const newOrderDB = await projectDatabase.ordersModel.create(newOrder)
    .catch(err => catchDatabaseEror(err, res));

    //Guardo info de la orden
    const newOrderId = newOrderDB.id;
    const ordersProductsArray = makeArrayForOrdersProducts(newOrderId, req.body.products);

    //Inserto en BDD
    
};

orders_controllers.getOrdersData = (req, res) => {

};

orders_controllers.modifyOrderStatus = (req, res) => {

};

function calculateTotalPrice(productsArray) {
    let total = 0;

    productsArray.forEach(product => {
        total = total + product.price * product.quantity;
    });

    return total;
}

function makeArrayForOrdersProducts(orderId, productsArray) {
    let arrayForDb = [];

    for(let i = 0; i < productsArray.length; i++) {
        const productos = {
            productQuantity: productsArray[i].quantity,
            subtotalPrice: productsArray[i].quantity * productsArray[i].price,
            orderId: orderId,
            productId: productsArray[i].id
        }

        arrayForDb[i] = productos;
    }

    return arrayForDb;
}

module.exports = orders_controllers;