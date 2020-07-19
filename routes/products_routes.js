const express = require('express');
const router = express.Router();
const userMiddlewares = require('../middlewares/users_middlewares');
const productControllers = require('../controllers/products_controllers');
const productMiddlewares = require('../middlewares/products_middlewares');
const generalMiddlewares = require('../middlewares/general_middlewares');

router.get('/', productControllers.getProductsData);

router.post('/',
    userMiddlewares.validateAdminUser,
    generalMiddlewares.checkBody,
    productMiddlewares.requireProductData,
    productControllers.newProduct
);

router.put('/:id',
    userMiddlewares.validateAdminUser,
    generalMiddlewares.checkBody,
    productMiddlewares.requireProductData,
    productControllers.modifyProduct
);

router.delete('/:id',
    userMiddlewares.validateAdminUser,
    generalMiddlewares.checkBody,
    productMiddlewares.requireProductData,
    productControllers.deleteProduct
);

module.exports = router;