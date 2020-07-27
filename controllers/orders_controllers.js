const projectDatabase = require('../config/database');
const orders_controllers = {};

orders_controllers.newOrder = async (req, res) => {
    const loggedUser = res.locals.userPayload;
    const newOrder = {
        totalPrice: calculateTotalPrice(req.body.productsArray),
        paymentMethod: req.body.paymentMethod,
        state: 'Nuevo',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: loggedUser.id
    }

    //Nueva orden en la BDD
    const newOrderDB = await projectDatabase.ordersModel.create(newOrder)
    .catch(err => catchDatabaseEror(err, res));

    //Guardo info de la orden
    const newOrderId = newOrderDB.id;
    const ordersProductsArray = makeArrayForOrdersProducts(newOrderId, req.body.productsArray);

    //Inserto en BDD
    const orderProduct = await projectDatabase.ordersProductsModel.bulkCreate(ordersProductsArray)
    .catch(async err => {
        await projectDatabase.ordersModel.destroy({ where: { id: newOrderId } })
        .catch(err => {
            res.status(500).json({
                message: 'The order cannot be removed from the database.',
                err
            });
        });

        res.status(500).json({
            message: 'Products cannot be inserted into the database. The order was deleted from database.',
            err
        });
    });

    res.status(201).json({
        message: 'Order successfully created.',
        orderProduct,
        newOrder
    });
};

/**
 * Listar todas las ordenes (admin)
 * Listar ordenes de un usuario (no admin)
 */
orders_controllers.getOrdersData = async (req, res) => {
    const where = {};

    if(res.locals.userPayload.isAdmin) {
        const orders = await projectDatabase.ordersModel.findAll()
        .catch(err => catchDatabaseEror(err, res));

        res.status(200).json({
            message: 'You have access to all orders.',
            orders
        });
    } else {
        const orders = await projectDatabase.ordersModel.findAll({
            where: {userId: res.locals.userPayload.id}
        }).catch(err => catchDatabaseEror(err, res));

        res.status(200).json({
            message: 'You have access to your orders.',
            orders
        });
    }
};

orders_controllers.modifyOrderStatus = async (req, res) => {
    const newState = req.body.state;
    const newDate = new Date();

    const updatedOrder = await projectDatabase.ordersModel
    .update({ state: newState, updatedAt: newDate }, { where: { id: req.params.id } })
    .catch(err => catchDatabaseEror(err, res));

    res.status(200).json({
        message: 'Order updated.'
    });
};

//Funciones auxiliares
const catchDatabaseEror = (err, res) => {
    res.status(500).json({
        message: 'Hubo un error con la base de datos.',
        error: err
    });
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
            productId: productsArray[i].id,
        }
        arrayForDb[i] = productos;
    }
    return arrayForDb;
}

module.exports = orders_controllers;