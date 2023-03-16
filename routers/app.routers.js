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
const { sendMailNewSelling } = require("../nodemailer/gmail");
const { sendMailVenta } = require("../nodemailer/ethereal");
const { sendSMS, sendWspMessage } = require("../twilio/sms");


const Cart = new CartsDao();
const Products = new ProductsDao();



// Middlewares



// Routes
router.use("/info", infoRoutes);
router.use("/products", productsRoutes)
router.use("/api", apiRoutes);
router.use("/cart", cartRoutes);



router.get('/', async (req, res) => {
    const user = req.user;
    try {
        if (user) {
            return res.redirect("/profile")
        }
        else {
            return res.sendFile(path.resolve(__dirname, '../public/login.html'));
        }
    }
    catch(error) {
        errorLogger.error(error);
    }
});

router.get('/login', async (req, res) => {
    return res.sendFile(path.resolve(__dirname, '../public/login.html'));
});



router.get('/cart', async (req, res) => {
    try {
        const cartId = req.user.cart
        const cart = await Cart.getById(cartId)
        const user = req.user;
        res.render('cart.ejs', { cart, user, sessionUser: user });
    }
    catch(error) {
        errorLogger.error(error);
    }
});

router.get('/productos', async (req, res) => {
    try {
        const user = req.user;
        const products = await Products.getAll();
        res.render('products/products.ejs', { products, user, sessionUser: user });
    }
    catch(error) {
        errorLogger.error(error);
    }
});

router.get('/profile', auth, async (req, res) => {
    const user = req.user;
    try {
        if (!user) { res.redirect('/'); }
        res.render('home.ejs', { sessionUser: user });
    }
    catch(error) {
        errorLogger.error(error);
    }
});

router.get('/register', async (req, res) => {
    try {
        res.sendFile(path.resolve(__dirname, '../public/register.html'));
    }
    catch(error) {
        errorLogger.error(error);
    }
});

router.get('/logout', async (req, res) => {
    consoleLogger.info("User logued out");
    const user = req.user;
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

router.post('/checkout', async (req, res) => {
    const user = req.user;
    const cartId = req.user.cart
    
    try {
        const cart = await Cart.getById(cartId)
        await sendMailNewSelling(user, cart)
        await sendMailVenta(user, cart)
        await sendSMS(user.phone)
        await sendWspMessage(user.phone)
        res.render('checkout.ejs');
    } catch (error) {
        errorLogger.error(error);
    }
});

router.get('/signin-error', async (req, res) => {
    try {
        res.sendFile(path.resolve(__dirname, '../public/signin-error.html'));
    }
    catch (error) {
        errorLogger.error(error);
    }
});

router.get('/signup-error', async (req, res) => {
    try {
        res.sendFile(path.resolve(__dirname, '../public/signup-error.html'));
    }
    catch (error) {
        errorLogger.error(error);
    }
});



module.exports = router;
