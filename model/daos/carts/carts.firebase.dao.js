const FirebaseContainer = require("../../containers/containerFirebase");

const collection = "carts";

class CartsFirebaseDao extends FirebaseContainer {
    constructor() {
        super(collection);
    }
}

module.exports = CartsFirebaseDao;