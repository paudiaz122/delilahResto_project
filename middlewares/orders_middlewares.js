const products_middlewares = require("./products_middlewares");

const orders_middlewares = {};

orders_middlewares.requireOrderData = (req, res, next) => {
    const totalPrice = req.body.totalPrice;
    const paymentMethod = req.body.paymentMethod;
    const state = req.body.state;

    if(typeof(totalPrice) !== 'number') {
        res.status(400).json({
            message: 'There was a problem with the price provided'
        });
    } else if (typeof(paymentMethod) !== 'string') {
        res.status(400).json({
            message: 'There was a problem with the payment method provided'
        });
    } else if (typeof(state) !== 'string') {
        res.status(400).json({
            message: 'There was a problem with the state provided'
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

module.exports = orders_middlewares;