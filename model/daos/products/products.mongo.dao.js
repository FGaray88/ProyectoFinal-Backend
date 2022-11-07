const { Schema } = require("mongoose");
const MongoContainer = require("../../containers/containerMongo");


const collection = "products";
const productsSchema = new Schema({
    name: { type: String},
    thumbnail: { type: String},
    price: { type: Number},
    description: { type: String},
    stock: { type: Number},
    timestamp: { type: Date},
    code: { type: Number}
});

class ProductsMongoDao extends MongoContainer {
    constructor() {
        super(collection, productsSchema);
    }
}

module.exports = ProductsMongoDao;