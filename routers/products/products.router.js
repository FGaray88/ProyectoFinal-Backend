
const express = require("express")
const products = require("../../controllers/products.controller")


const router = express.Router();

router.get("/", products.getProducts);
router.get("/:id", products.getProductsById);
router.post("/", products.addProduct);
router.put("/:id", products.updateProductById);
router.delete("/:id", products.deleteProductById);

module.exports = router;


