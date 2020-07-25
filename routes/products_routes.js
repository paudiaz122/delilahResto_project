const express = require('express');
const router = express.Router();
const userMiddlewares = require('../middlewares/users_middlewares');
const productControllers = require('../controllers/products_controllers');
const productMiddlewares = require('../middlewares/products_middlewares');
const generalMiddlewares = require('../middlewares/general_middlewares');

//Acceso público
router.get('/', productControllers.getProductsData);

//Acceso privado
router.post('/',
    generalMiddlewares.validateToken,
    generalMiddlewares.isAdminUser,
    generalMiddlewares.checkBody,
    productMiddlewares.requireProductData,
    productControllers.newProduct
);

//Acceso privado
router.put('/:id',
    generalMiddlewares.validateToken,
    generalMiddlewares.isAdminUser,
    generalMiddlewares.checkBody,
    productMiddlewares.requireProductData,
    productControllers.modifyProduct
);

//Acceso privado
router.delete('/:id',
    generalMiddlewares.validateToken,
    generalMiddlewares.isAdminUser,
    generalMiddlewares.checkBody,
    productMiddlewares.requireProductData,
    productControllers.deleteProduct
);

module.exports = router;