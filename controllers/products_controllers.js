const projectDatabase = require('../config/database');
const products_controllers = {};

products_controllers.getProductsData = async (req, res) => {
    const productos = await projectDatabase.productsModel.findAll()
    .catch((err) =>{
        res.status(500).json({
            message: 'No se pudieron obtener los productos.',
        });
    });
    res.status(200).json({
        quantity: productos.length,
        productos
    });
};

products_controllers.newProduct = (req, res) => {

};

products_controllers.modifyProduct = (req, res) => {

};

products_controllers.deleteProduct = (req, res) => {

};

module.exports = products_controllers;