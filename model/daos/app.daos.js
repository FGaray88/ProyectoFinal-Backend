const envConfig = require("../../config");

let ProductsDao;
let CartsDao;

/* const ProductsDao = require("./products/products.memory.dao");
const CartsDao = require("./carts/carts.memory.dao"); */

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
        ProductsDao = require("./products/products.memory.dao");
        CartsDao = require("./carts/carts.memory.dao");
        break;    
    default:
        throw new Error("Invalid Datasource");   
}

/* console.log("ProductsDao es: "+ProductsDao);
console.log("CartsDao es: "+CartsDao); */

module.exports = {
    ProductsDao,
    CartsDao
}
