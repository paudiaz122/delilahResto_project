const projectDatabase = require('../config/database');
const orders_controllers = {};

orders_controllers.newOrder = async (req, res) => {
    const loggedUser = res.locals.userPayload;
    const dbProducts = res.locals.products;
    const newOrder = {
        totalPrice: calculateTotalPrice(dbProducts, req.body.productsArray),
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
    const ordersProductsArray = makeArrayForOrdersProducts(newOrderId, dbProducts, req.body.productsArray);

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

orders_controllers.deleteOrder = async (req, res) => {
    const deletedOrder = await projectDatabase.ordersModel
    .destroy({ where: { id: res.locals.order } })
    .catch(err => catchDatabaseEror(err, res));

    res.status(200).json({
        message: 'Order deleted.',
        deletedOrder
    });
};

//Funciones auxiliares
const catchDatabaseEror = (err, res) => {
    res.status(500).json({
        message: 'Hubo un error con la base de datos.',
        error: err
    });
};

function calculateTotalPrice(dbProducts, bodyProducts) {
    let total = 0;

    bodyProducts.forEach(bodyProduct => {
        productFound = dbProducts.find(dbProduct => dbProduct.id === bodyProduct.id);
        total = total + productFound.price * bodyProduct.quantity;
    });

    return total;
}

function makeArrayForOrdersProducts(orderId, dbProducts, bodyProducts) {
    let arrayForDb = [];

    for(let i = 0; i < bodyProducts.length; i++) {
        productFound = dbProducts.find(dbProduct => dbProduct.id === bodyProducts[i].id);
        const productos = {
            productQuantity: bodyProducts[i].quantity,
            subtotalPrice: bodyProducts[i].quantity * productFound.price,
            orderId: orderId,
            productId: bodyProducts[i].id,
        }
        arrayForDb[i] = productos;
    }
    return arrayForDb;
}

module.exports = orders_controllers;