const express = require('express');
const router = express.Router();
const userMiddlewares = require('../middlewares/users_middlewares');
const orderControllers = require('../controllers/orders_controllers');
const orderMiddlewares = require('../middlewares/orders_middlewares');
const generalMiddlewares = require('../middlewares/general_middlewares');

router.post('/', generalMiddlewares.checkBody, orderMiddlewares.requireOrderData, orderControllers.newOrder);
router.get('/', userMiddlewares.validateAdminUser, orderControllers.getOrdersData);
router.put('/', userMiddlewares.validateAdminUser, generalMiddlewares.checkBody, orderMiddlewares.requireOrderStatus, orderControllers.modifyOrderStatus);

module.exports = router;