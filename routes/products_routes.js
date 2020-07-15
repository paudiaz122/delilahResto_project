const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/users_controllers');
const productControllers = require('../controllers/products_controllers');
const productMiddlewares = require('../middlewares/products_middlewares');

router.get('/products', productControllers.getProductsData);
router.post('/products', userControllers.validateAdminUser, productMiddlewares.requireProductData, productControllers.newProduct);
router.put('/products/:idProduct', userControllers.validateAdminUser, productMiddlewares.requireProductData, productControllers.modifyProduct);
router.delete('/products/:idProduct', userControllers.validateAdminUser, productMiddlewares.requireProductData, productControllers.deleteProduct);

module.exports = router;