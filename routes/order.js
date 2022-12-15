const express = require("express");
const router = express.Router();
const order = require("../controllers/order");

router.post('/order/create_order', order.create_order);
router.delete('/order/deletebyusername/:name', order.deletebyusername);
router.put('/order/:id', order.updatebyid);
router.get('/order', order.getorderspage);
router.get('/order/getorders', order.get_orders);
router.get('/order/:id', order.getorder);

router.post('/order/:id', order.deleteorder);


module.exports = router;