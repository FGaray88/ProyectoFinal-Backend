const express = require("express")


const {
    createNewCart, 
    deleteCartById, 
    getProductsInCart, 
    addProductAtCart, 
    deleteProductOnCart
} = require("../../controllers/cart.api")

const router = express.Router();

    router.post("/", createNewCart);
    router.delete("/:id", deleteCartById);
    router.get("/:id/productos", getProductsInCart);
    router.post("/:id/productos", addProductAtCart);
    router.delete("/:id/productos/:productId", deleteProductOnCart);

module.exports = router;