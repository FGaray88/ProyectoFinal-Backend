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
        const idProd = await data.productos.map(elem => elem._id.toString());
        const isInCart = idProd.includes(id);

        if (!isInCart){
            return null
        } else {
            const filter = data.productos.filter(product => product._id != id);
            return filter;
        }
        
    }

}

module.exports = CartsMongoDao;