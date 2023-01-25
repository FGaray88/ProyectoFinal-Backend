const express = require("express")
const cartController = require("../../controllers/cart.controller");





const router = express.Router();

    router.post("/", cartController.createNewCart);
    router.delete("/:id", cartController.deleteCartById);
    router.get("/:id/productos", cartController.getProductsInCart);
    router.post("/:id/:productID", cartController.addProductAtCart);
    router.delete("/:id/productos/:productId", cartController.deleteProductOnCart);
    
    /* pequeña trampa para eliminar productos en cart ya que en el form no puedo utilizar metodo delete */
    router.post("/:id/delete/:productId", cartController.deleteProductOnCart);

module.exports = router;