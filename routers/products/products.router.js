const express = require("express")
const router = express.Router();
const {
  getProducts,
  getProductsById,
  addProduct,
  updateProductById,
  deleteProductById
} = require("../../controllers/productos.api")


    router.get('/', getProducts);
    router.get("/:id", getProductsById);
    router.post('/', addProduct);
    router.put('/:productId', updateProductById);
    router.delete('/:productId', deleteProductById);

module.exports = router;