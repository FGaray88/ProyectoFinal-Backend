const express = require("express")
const productsRoutes = require("./products/products.router")
const apiRoutes = require('./api/api.routes');
const cartRoutes = require("./cart/cart.router")
const infoRoutes = require('./info/info');
const auth = require('../middlewares/auth');
const path = require('path');
const {
    consoleLogger,
    errorLogger,
} = require("../logger/logger")
const router = express.Router();
const { CartsDao } = require("../model/daos/app.daos");
const { ProductsDao } = require("../model/daos/app.daos");
const Cart = new CartsDao();
const Products = new ProductsDao();



// Middlewares



// Routes
router.use("/info", infoRoutes);
router.use("/products", productsRoutes)
router.use("/api", apiRoutes);
router.use("/cart", cartRoutes);

router.get('/', async (req, res) => {
    consoleLogger.info("peticion a /, metodo get")
    const user = req.user;
    if (user) {
        return res.redirect("/profile")
    }
    else {
        return res.sendFile(path.resolve(__dirname, '../public/login.html'));
    }
});

router.get('/cart', async (req, res) => {
    try {
        const cartId = req.user.cart
        const cart = await Cart.getById(cartId)
        res.render('cart.ejs', { cart });
        /* res.redirect(`/cart/${cartId}/productos`) */
    }
    catch(error) {
        errorLogger.error(error);
    }
});

router.get('/productos', async (req, res) => {
    try {
        const user = req.user;
        const products = await Products.getAll();
        res.render('products/products.ejs', { products, user });
        /* res.redirect(`/cart/${cartId}/productos`) */
    }
    catch(error) {
        errorLogger.error(error);
    }
});

router.get('/profile', auth, async (req, res) => {
    consoleLogger.info("peticion a /profile, metodo get")
    const user = req.user;
    if (!user) { res.redirect('/'); }
    res.render('home.ejs', { sessionUser: user.username });
});

router.get('/register', async (req, res) => {
    consoleLogger.info("peticion a /register, metodo get")
    res.sendFile(path.resolve(__dirname, '../public/register.html'));
});

router.get('/logout', async (req, res) => {
    consoleLogger.info("peticion a /logout, metodo get")
    consoleLogger.info("User logued out");

    const user = await req.user;
    try {
        req.session.destroy(err => {
            if (err) {
                errorLogger.error(err);
                res.clearCookie('my-session');
            }
            else {
                res.clearCookie('my-session');
            }
            res.redirect('/')
        })
    }
    catch (err) {
        errorLogger.error(err);
    }
    
});

router.get('/signin-error', async (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/signin-error.html'));
});

router.get('/signup-error', async (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/signup-error.html'));
});



module.exports = router;
