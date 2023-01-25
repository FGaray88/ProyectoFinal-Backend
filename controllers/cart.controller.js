const { HTTP_STATUS } = require("../constants/api.constants");
const { successResponse } = require("../utils/api.utils");
const { CartsDao } = require("../model/daos/app.daos")
const { ProductsDao } = require("../model/daos/app.daos")
const moment = require("moment");

const products = new ProductsDao()
const cart = new CartsDao();


class CartController {

    async createNewCart(req, res, next) {
        try{
            const newCart = {         
                timestamp: moment().format("h:mm a"),
                productos: []
            }
            const addCart = await cart.save(newCart);
            const response = successResponse(addCart);
            return res.status(HTTP_STATUS.OK).json(response);
        } 
        catch (error){ 
            next(error);
        }
    }

    async deleteCartById (req, res, next){
        const { id } = req.params;
        try{
            const data = await cart.deleteById(id);
            if (data===null) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ success: false, error: 'No existe un carrito con ese ID' });
            };
            return res.status(HTTP_STATUS.OK).json(successResponse(data));
        }
        catch(error) {
            next(error);
        };
    }

    async getProductsInCart (req, res, next){
        const { id } = req.params;
        try {
            const selectedCart = await cart.getById(id);
            if(selectedCart===null){
                res.status(HTTP_STATUS.NOT_FOUND).json({ success: false, error: 'No existe un carrito con ese ID' });
            }
            res.status(HTTP_STATUS.OK).json(successResponse(selectedCart.productos));
        }
        catch (error){
            next(error);
        }
    }

    async addProductAtCart (req, res, next){
        const { id, productID } = req.params;
        try {
            const dataProduct = await products.getById(productID);
            const dataCart = await cart.getById(id);
            dataCart.productos.push(dataProduct);
            await cart.updateById(id, dataCart);
            /* return res.status(HTTP_STATUS.OK).json(successResponse(dataCart)); */
            res.redirect("/cart");
        }
        catch(error){
            next(error);
        }
    }
    
    async deleteProductOnCart (req, res, next){
        const { id, productId } = req.params;
        try {
            const dataCart = await cart.getById(id);
            const validated = await cart.validate(dataCart, productId);
            if(validated==null){
                return res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, error: 'No existe un producto con ese ID en este Carrito' });
            }
            dataCart.productos = validated;
            await cart.updateById(id, dataCart);
            /* return res.status(HTTP_STATUS.OK).json({ success: true, result: "Producto eliminado del carrito"}); */
            res.redirect("/cart")
        }
        catch(error){
            next(error);
        }
    }
}



module.exports = new CartController();