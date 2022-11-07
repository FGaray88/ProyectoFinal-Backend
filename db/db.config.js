const envConfig = require("../config")
const firebaseConfig = require("./firebase/firebase.config.json");


module.exports = {
    mongodb: {
        uri: `mongodb+srv://FG-Projects:${envConfig.DB_PASSWORD}@fg-cluster.byfsgny.mongodb.net/?retryWrites=true&w=majority`
    },
    firebase: {
        credentials: firebaseConfig
    }
}