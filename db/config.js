const env = require("../config");
const firebaseConfig = require("./firebase/firebase.config.json")

module.exports = {
    mongodb: {
        connectTo: (database) => `mongodb+srv://FG-Projects:${env.DB_PASSWORD}@fg-cluster.byfsgny.mongodb.net/${database}?retryWrites=true&w=majority`,
    },
    
    file: {
        products: './db/data/products.json',
        carts: './db/data/cart.json',
    },
    firebase: {
        credentials: firebaseConfig,
    },
}