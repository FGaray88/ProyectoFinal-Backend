const Container = require("..//model/container"); 
const cart = new Container("./model/cart.json");
const products = new Container("./model/products.json");
const moment = require("moment");


/* const getProductsById = (req, res) => {

} */


const createNewCart = (req, res) => {
    const newCart = {         
        timestamp: moment().format("h:mm a"),
        productos: []
    }
    const addCart = cart.save(newCart)
    return res.json({ success: true, result: "se agrego un nuevo carrito con ID "+ addCart});
}

const deleteCartById = (req, res) => {
    const { id } = req.params;
    if (isNaN(+id) || +id < 0 || +id % 1 !== 0) {
        return res.status(400).json({ success: false, error: 'Id must be a positive integer valid number' });
    }
    const data = cart.deleteById(+(id))
    if (data===null) {
        res.status(404).json({ success: false, error: 'No existe un carrito con ese ID' });
    }
    return res.json({ success: true, result: "Carrito eliminado con exito" });
}

const getProductsInCart = (req, res) => {
    const { id } = req.params;
    const selectedCart = cart.getById(+(id))
    if(selectedCart===null){
        res.status(404).json({ success: false, error: 'No existe un carrito con ese ID' });
    }
    const data = selectedCart[0].productos
    res.json(data);
}

const addProductAtCart = (req, res) => {
    const { id } = req.params;
    const { productID } = req.body 
    if (isNaN(+id) || +id < 0 || +id % 1 !== 0) {
        return res.status(400).json({ success: false, error: 'Id must be a positive integer valid number' });
    }
    if (isNaN(+productID) || +productID < 0 || +productID % 1 !== 0) {
        return res.status(400).json({ success: false, error: 'productId must be a positive integer valid number' });
    }
    const dataProduct = products.getById(+(productID))[0]
    const dataCart = cart.getById(+(id))[0]
    dataCart.productos.push(dataProduct)
    cart.updateById(+(id), dataCart)
    return res.json({ success: true, result: "Producto agregado al carrito"});
}

const deleteProductOnCart = (req, res) => {
    const { id, productId } = req.params;
    if (isNaN(+id) || +id < 0 || +id % 1 !== 0) {
        return res.status(400).json({ success: false, error: 'Id must be a positive integer valid number' });
    }
    if (isNaN(+productId) || +productId < 0 || +productId % 1 !== 0) {
        return res.status(400).json({ success: false, error: 'productId must be a positive integer valid number' });
    }
    const dataCart = cart.getById(+(id))[0]
    const idProd = dataCart.productos.map(elem => elem.id)
    const isInCart = idProd.includes(+(productId))
    if (!isInCart){
        return res.status(404).json({ success: false, error: 'No existe un producto con ese ID en este carrito' });
    }
    const filter = dataCart.productos.filter(product => product.id !== +(productId))
    dataCart.productos = filter
    cart.updateById(+(id), dataCart)
    return res.json({ success: true, result: "Producto eliminado del carrito"});
}

module.exports = {
    createNewCart, deleteCartById, getProductsInCart, addProductAtCart, deleteProductOnCart
}