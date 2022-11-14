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
}

module.exports = CartsMongoDao;