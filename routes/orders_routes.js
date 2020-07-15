const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/users_controllers');
const orderControllers = require('../controllers/orders_controllers');
const orderMiddlewares = require('../middlewares/orders_middlewares');

router.get('/orders/:id', orderControllers.getMyOrdersData); //???
router.post('/orders', orderMiddlewares.requireOrderData, orderControllers.newOrder);
router.get('/orders', userControllers.validateAdminUser, orderControllers.getOrdersData);
router.put('/orders', userControllers.validateAdminUser, orderControllers.requireOrderStatus, orderControllers.modifyOrderStatus);

module.exports = router;