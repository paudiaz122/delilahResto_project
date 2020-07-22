const orders_middlewares = {};

orders_middlewares.requireOrderData = (req, res, next) => {
    const paymentMethod = req.body.paymentMethod;
    const productsArray = req.body.productsArray;

    if(typeof(paymentMethod) !== 'string') {
        res.status(400).json({
            message: 'There was a problem with the payment method provided'
        });
    } else if(productsArray.length === 0) {
        res.status(400).json({
            message: 'There was a problem with the products provided'
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