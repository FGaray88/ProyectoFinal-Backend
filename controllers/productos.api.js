const ProductsDao = require("../model/containers/containerFirebase")
const moment = require("moment");


const products = new ProductsDao()

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
    const { name, description, price, thumbnail, stock, code } = req.body;
    if (!name || !description || !price || !thumbnail || !stock || !code) {
        return res.status(400).json({ succes: false, error: 'Wrong body format' });
    }
    const newProduct = {
        name,
        description,
        price: +(price),
        thumbnail,
        stock,
        timestamp: moment().format("h:mm a"),
        code,
    };
    products.save(newProduct)
    return res.json({ success: true, result: newProduct });
}

const updateProductById = (req, res) => {
    const { params: { productId }, body: { name, description, price, thumbnail, stock, code } } = req;
    if (!name || !description || !price || !thumbnail || !stock || !code) {
        return res.status(400).json({ success: false, error: 'Wrong body format' });
    };
    const newProduct = {
        name,
        description,
        price,
        thumbnail,
        stock,
        timestamp: moment().format("h:mm a"),
        code
    };
    const updateProduct = products.updateById(+(productId), newProduct)
    if (updateProduct === null) return res.status(404).json({ success: false, error: `Product with id: ${productId} does not exist!` });
    return res.json({ success: true, result: newProduct });
}

const deleteProductById = (req, res) => {
    const { productId } = req.params;
    const data = products.deleteById(+(productId))
    if (data===null) return res.status(404).json({ success: false, error: `Product with id ${productId} does not exist!`});
    return res.json({ success: true, result: 'product correctly eliminated' });
}


module.exports = {
    getProducts, getProductsById, addProduct, updateProductById, deleteProductById
}