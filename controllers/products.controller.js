const { successResponse } = require("../utils/api.utils");
const { HTTP_STATUS } = require("../constants/api.constants");
const { ProductsDao } = require("../model/daos/app.daos")
const moment = require("moment");


const products = new ProductsDao()

class ProductsController {
    async getProducts(req, res, next){
        try {
            const data = await products.getAll();
            res.status(HTTP_STATUS.OK).json(successResponse(data));
        }
        catch(error){
            next(error);
        }
    }

    async getProductsById(req, res, next){
        const { id } = req.params;
        try {
            const data = await products.getById(id)
            if (data === null) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ success: false, error: 'No se ha encontrado el producto' });
            }
            res.status(HTTP_STATUS.OK).json(successResponse(data))
        }
        catch(error){
            next(error);
        }
    }

    async addProduct (req, res, next){
        const { name, description, price, thumbnail, stock, code } = req.body;
        if (!name || !description || !price || !thumbnail || !stock || !code) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ succes: false, error: 'Wrong body format' });
        }
        try {
            const newProduct = {
                name,
                description,
                price: +(price),
                thumbnail,
                stock,
                timestamp: moment().format("h:mm a"),
                code,
            };
            await products.save(newProduct)
            return res.status(HTTP_STATUS.OK).json(successResponse(newProduct));
        }
        catch(error){
            next(error);
        }
    }
    
    async updateProductById (req, res, next){
        const { params: { id }, body: { name, description, price, thumbnail, stock, code } } = req;
        if (!name || !description || !price || !thumbnail || !stock || !code) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, error: 'Wrong body format' });
        };
        try {
            const newProduct = {
                name,
                description,
                price,
                thumbnail,
                stock,
                timestamp: moment().format("h:mm a"),
                code
            };
            const updateProduct = await products.updateById(id, newProduct)
            if (updateProduct === null) return res.status(HTTP_STATUS.NOT_FOUND).json({ success: false, error: `Product with id: ${id} does not exist!` });
            return res.status(HTTP_STATUS.OK).json(successResponse(newProduct));
        }
        catch(error){
            next(error);
        }
    }
    
    async deleteProductById (req, res, next){
        const { id } = req.params;
        try {
            const data = await products.deleteById(id)
            if (!data.deletedCount) return res.status(HTTP_STATUS.NOT_FOUND).json({ success: false, error: `Product with id ${id} does not exist!`});
            return res.status(HTTP_STATUS.OK).json({ success: true, result: 'product correctly eliminated' });
        }
        catch(error){
            next(error);
        }
    
    }

}

module.exports = ProductsController;