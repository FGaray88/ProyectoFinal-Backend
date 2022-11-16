const { Schema } = require("mongoose");
const MongoContainer = require("../../containers/containerMongo");


const collection = "carts";
const cartsSchema = new Schema({
    timestamp: { type: String },
    productos: { type: Array }
});

class CartsMongoDao extends MongoContainer {
    constructor() {
        super(collection, cartsSchema);
    }

    async validate(data, id) {
        const idProd = await data.productos.map(elem => elem._id);
        
        console.log("idProd: ", data);
        const isInCart = idProd.includes(id);
        console.log("isInCart: "+isInCart);
        if (!isInCart){
            return null
        } else {
            const filter = data.productos.filter(product => product.id != +id);
            return filter;
        }
        
    }

}

module.exports = CartsMongoDao;