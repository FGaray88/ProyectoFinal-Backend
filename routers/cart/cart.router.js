const express = require("express")
const CartController = require("../../controllers/cart.controller");
const cartModel = new CartController()


const router = express.Router();

    router.post("/", cartModel.createNewCart);
    router.delete("/:id", cartModel.deleteCartById);
    router.get("/:id/productos", cartModel.getProductsInCart);
    router.post("/:id/productos", cartModel.addProductAtCart); // Falla en mongo
    router.delete("/:id/productos/:productId", cartModel.deleteProductOnCart); // Falla en mongo

module.exports = router;