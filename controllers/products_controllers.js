const projectDatabase = require('../config/database');
const products_controllers = {};

const catchDatabaseEror = (err, res) => {
    res.status(500).json({
        message: 'Hubo un error con la base de datos.',
        error: err
    });
};

products_controllers.getProductsData = async (req, res) => {
    const productos = await projectDatabase.productsModel.findAll()
    .catch(err => catchDatabaseEror(err, res));

    res.status(200).json({
        quantity: productos.length,
        productos
    });
};

products_controllers.newProduct = async (req, res) => {
    const newProduct = await projectDatabase.productsModel.create(req.body)
    .catch(err => catchDatabaseEror(err, res));

    res.status(201).json({
        message: 'Product created.',
        newProduct
    });
};

products_controllers.modifyProduct = async (req, res) => {
    const modifiedProduct = await projectDatabase.productsModel
    .update(
        req.body,
        { where: { id: req.params.id } }
    ).catch(err => catchDatabaseEror(err, res));

    res.status(200).json({
        message: 'Product modified.',
        modifiedProduct
    });
};

products_controllers.deleteProduct = async (req, res) => {
    const deletedProduct = await projectDatabase.productsModel
    .destroy({ where: { id: req.params.id } })
    .catch(err => catchDatabaseEror(err, res));

    res.status(200).json({
        message: 'Product deleted.',
        deletedProduct
    });
};

module.exports = products_controllers;