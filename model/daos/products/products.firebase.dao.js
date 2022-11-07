const FirebaseContainer = require("../../containers/containerFirebase");

const collection = "productos";

class ProductsFirebaseDao extends FirebaseContainer {
    constructor() {
        super(collection);
    }
}

module.exports = ProductsFirebaseDao;