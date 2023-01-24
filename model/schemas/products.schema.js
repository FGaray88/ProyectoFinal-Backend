const mongoose = require("mongoose");
const { Schema } = mongoose;

const productsCollection = "productos";

const ProductsSchema = new Schema ({
    name: { type: String, required: true },
    thumbnail: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now() },
    code: { type: String, required: true }
});

const ProductsModel = mongoose.model(productsCollection, ProductsSchema);

module.exports = ProductsModel;