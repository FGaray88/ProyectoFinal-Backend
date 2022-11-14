const envConfig = require("../config")
const firebaseConfig = require("./firebase/firebase.config.json");


module.exports = {
    file: {
        products: "./data/products.json",
        carts: "./data/cart.json"
    },
    mongodb: {
        uri: `mongodb+srv://FG-Projects:${envConfig.DB_PASSWORD}@fg-cluster.byfsgny.mongodb.net/ecommerce?retryWrites=true&w=majority`
    },
    firebase: {
        credentials: firebaseConfig
    }

}