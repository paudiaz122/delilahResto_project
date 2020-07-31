const projectDatabase = require('../config/database');
const { Op } = require("sequelize");
const orders_middlewares = {};

orders_middlewares.requireOrderData = (req, res, next) => {
    const paymentMethod = req.body.paymentMethod;
    const productsArray = req.body.productsArray;

    if(typeof(paymentMethod) !== 'string') {
        res.status(400).json({
            message: 'There was a problem with the payment method provided'
        });
    } else if(!Array.isArray(productsArray) || productsArray.length === 0) {
        res.status(400).json({
            message: 'Your order is empty!'
        });
    } else {
        next();
    }
};

orders_middlewares.requireOrderStatus = (req, res, next) => {
    const state = req.body.state;

    if(typeof(state) !== 'string') {
        res.status(400).json({
            message: 'There was a problem with the state provided'
        });
    } else {
        next();
    }
};

orders_middlewares.validateOrderId = async (req, res, next) => {
    const order = await projectDatabase.ordersModel.findByPk(req.params.id);
    
    if(order) {
        res.locals.order = order.id;
        next();
    } else {
        res.status(404).json({
            message: 'The order does not exist.'
        });
    }
};

orders_middlewares.isProductAvailable = async (req, res, next) => {
    const productsArray = req.body.productsArray;
    const productsIdArray = productsArray.map(product => product.id);

    const products = await projectDatabase.productsModel.findAll({
        where: {
            id: {
              [Op.or]: productsIdArray
            },
            isAvailable: true
        }
    });

    if(productsArray.length !== products.length) {
        res.status(404).json({
            message: 'Some products are not available.'
        });
    } else {
        res.locals.products = products;
        next();
    }
}

module.exports = orders_middlewares;