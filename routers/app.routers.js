const express = require("express")
const productsRoutes = require("./products/products.router")
const cartRoutes = require("./cart/cart.router")

const router = express.Router();



// Middlewares
router.use("/products", productsRoutes)
router.use("/cart", cartRoutes)

// Routes
    


module.exports = router;
