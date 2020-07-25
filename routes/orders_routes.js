const express = require('express');
const router = express.Router();
const userMiddlewares = require('../middlewares/users_middlewares');
const orderControllers = require('../controllers/orders_controllers');
const orderMiddlewares = require('../middlewares/orders_middlewares');
const generalMiddlewares = require('../middlewares/general_middlewares');

//Acceso público
router.post('/',
    generalMiddlewares.validateToken,
    generalMiddlewares.checkBody,
    orderMiddlewares.requireOrderData,
    orderControllers.newOrder
);

//Acceso público y privado
router.get('/',
    generalMiddlewares.validateToken,
    orderControllers.getOrdersData
);

//Acceso privado
router.put('/:id',
    generalMiddlewares.validateToken,
    generalMiddlewares.isAdminUser,
    generalMiddlewares.checkBody,
    orderMiddlewares.requireOrderStatus,
    orderControllers.modifyOrderStatus
);

module.exports = router;