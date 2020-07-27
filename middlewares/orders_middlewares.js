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

orders_middlewares.isProductAvailable = (req, res, next) => {
    const productsArray = req.body.productsArray;

    const notAvailable = productsArray.filter(product => product.isAvailable === false);

    if(notAvailable.length > 0) {
        res.status(404).json({
            message: 'Some products are not available.',
            notAvailable
        });
    } else {
        next();
    }
}

module.exports = orders_middlewares;