const envConfig = require("../../config");

let ProductsDao;
let CartsDao;

switch(envConfig.DATASOURCE) {
    case "mongo":
        ProductsDao = require("./products/products.mongo.dao");
        CartsDao = require("./carts/carts.mongo.dao");
        break;
    case "firebase":
        ProductsDao = require("./products/products.firebase.dao");
        CartsDao = require("./carts/carts.firebase.dao");
        break;
    case "file":
        ProductsDao = require("./products/products.file.dao");
        CartsDao = require("./carts/carts.file.dao");
        break;    
}

module.exports = {
    ProductsDao,
    CartsDao
}
