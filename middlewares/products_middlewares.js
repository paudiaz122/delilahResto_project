const projectDatabase = require('../config/database');
const products_middlewares = {};

products_middlewares.validateProductId = async (req, res, next) => {
    const product = await projectDatabase.productsModel.findByPk(req.params.id);
    
    if(product) {
        res.locals.product = product;
        next();
    } else {
        res.status(404).json({
            message: 'The product does not exist.'
        });
    }
};

products_middlewares.requireProductData = (req, res, next) => {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const imgSrc = req.body.imgSrc;
    const isAvailable = req.body.isAvailable;

    if(typeof(name) !== 'string') {
        res.status(400).json({
            message: 'There was a problem with the name provided'
        });
    } else if (typeof(description) !== 'string') {
        res.status(400).json({
            message: 'There was a problem with the description provided'
        });
    } else if (typeof(price) !== 'number') {
        res.status(400).json({
            message: 'There was a problem with the price provided'
        });
    } else if (typeof(imgSrc) !== 'string') {
        res.status(400).json({
            message: 'There was a problem with the image source provided'
        });
    } else if (typeof(isAvailable) !== 'boolean') {
        res.status(400).json({
            message: 'There was a problem with the data provided'
        });
    } else {
        next();
    }
};

module.exports = products_middlewares;