const express = require("express");
const router = express.Router();
const allproducts = require("../controllers/products");

router.get('/products', allproducts.form);
router.post('/products/add_product', allproducts.add_product);
router.get('/products/add_product', allproducts.add_product_page);

router.get('/products/get_products', allproducts.get_products);
router.get('/products/getByname/:name', allproducts.getByname);
router.delete('/products/deleteproduct/:id', allproducts.deleteproduct);
router.put('/products/updateproduct/:id', allproducts.updateproduct);

module.exports = router;