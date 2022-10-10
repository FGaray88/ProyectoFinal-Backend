const Container = require("../model/container"); 
const products = new Container("./model/products.json");
const moment = require("moment");

const getProducts = (req, res) => {
    const data = products.getAll()
    res.json(data);
}

const getProductsById = (req, res) => {
    const { id } = req.params;
    const data = products.getById(+(id))
    if (data === null) {
        res.status(404).json({ success: false, error: 'No se ha encontrado el producto' });
    }
    res.send(data)
}

const addProduct = (req, res) => {
    const { nombre, descr, precio, picture, stock, timestamp, codigo } = req.body;
    if (!nombre || !descr || !precio || !picture || !stock || !codigo) {
        return res.status(400).json({ succes: false, error: 'Wrong body format' });
    }
    const newProduct = {
        nombre,
        descr,
        precio: +(precio),
        picture,
        stock,
        timestamp: moment().format("h:mm a"),
        codigo,
    };
    products.save(newProduct)
    return res.json({ success: true, result: newProduct });
}

const upProductById = (req, res) => {
    const { params: { productId }, body: { nombre, descr, precio, picture, stock, timestamp, codigo } } = req;
    if (!nombre || !descr || !precio || !picture || !stock || !codigo) {
        return res.status(400).json({ success: false, error: 'Wrong body format' });
    };
    const newProduct = {
        nombre,
        descr,
        precio,
        picture,
        stock,
        timestamp: moment().format("h:mm a"),
        codigo
    };
    const upProduct = products.updateById(+(productId), newProduct)
    if (upProduct === null) return res.status(404).json({ success: false, error: `Product with id: ${productId} does not exist!` });
    return res.json({ success: true, result: newProduct });
}

const deleteProductById = (req, res) => {
    const { productId } = req.params;
    const data = products.deleteById(+(productId))
    if (data===null) return res.status(404).json({ success: false, error: `Product with id ${productId} does not exist!`});
    return res.json({ success: true, result: 'product correctly eliminated' });
}


module.exports = {
    getProducts, getProductsById, addProduct, upProductById, deleteProductById
}