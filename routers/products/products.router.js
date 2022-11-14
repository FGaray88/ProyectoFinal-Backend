const express = require("express")
const ProductsController = require("../../controllers/products.controller")
const productModel = new ProductsController()

const router = express.Router();
    router.get('/', productModel.getProducts);
    router.get("/:id", productModel.getProductsById);
    router.post('/', productModel.addProduct);
    router.put('/:id', productModel.updateProductById);
    router.delete('/:id', productModel.deleteProductById);

module.exports = router;