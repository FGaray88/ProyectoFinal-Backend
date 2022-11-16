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
            console.log(selectedCart)
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
        const { id } = req.params;
        const { productID } = req.body;
        try {
            const dataProduct = await products.getById(productID);
            const dataCart = await cart.getById(id);
            dataProduct.id = dataCart.productos.length+1
            console.log(dataProduct.id)
            dataCart.productos.push(dataProduct);
            await cart.updateById(id, dataCart);
            return res.status(HTTP_STATUS.OK).json(successResponse(dataCart));
        }
        catch(error){
            next(error);
        }
    }
    
    async deleteProductOnCart (req, res, next){
        const { id, productId } = req.params;
        /*  if (isNaN(+id) || +id < 0 || +id % 1 !== 0) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, error: 'Id must be a positive integer valid number' });
        }
        if (isNaN(+productId) || +productId < 0 || +productId % 1 !== 0) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, error: 'productId must be a positive integer valid number' });
        } */
        try {
            const dataCart = await cart.getById(id);
            const validated = await cart.validate(dataCart, productId);
            console.log(validated)
            

            
            /* const idProd = await dataCart.productos.map(elem => elem.id); */

            // que sucederia si importo envConfig y armo un if file productId = +(productID) y si if mongo productId sin parsear if firebase funciona bien con configuracion igual que memory ??
            /* const isInCart = idProd.includes(+(productId)); */
            
            /* if (!isInCart){
                return res.status(HTTP_STATUS.NOT_FOUND).json({ success: false, error: 'No existe un producto con ese ID en este carrito' });
            } */
            /* const filter = dataCart.productos.filter(product => product.id != productId);
            dataCart.productos = filter; */


            /* await cart.updateById(id, dataCart); */
            return res.status(HTTP_STATUS.OK).json({ success: true, result: "Producto eliminado del carrito"});
        }
        catch(error){
            next(error);
        }
    }
}



module.exports = CartController;