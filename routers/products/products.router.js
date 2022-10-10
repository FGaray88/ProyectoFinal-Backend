const express = require("express")
const router = express.Router();
const {
  getProducts,
  getProductsById,
  addProduct,
  upProductById,
  deleteProductById
} = require("../../controllers/productos.api")


    router.get('/', getProducts);
    router.get("/:id", getProductsById);
    router.post('/', addProduct);
    router.put('/:productId', upProductById);
    router.delete('/:productId', deleteProductById);

module.exports = router;