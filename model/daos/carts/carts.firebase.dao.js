const FirebaseContainer = require("../../containers/containerFirebase");

const collection = "carts";

class CartsFirebaseDao extends FirebaseContainer {
    constructor() {
        super(collection);
    }

    async validate(data, id) {
        const idProd = await data.productos.map(elem => elem.id);
        const isInCart = idProd.includes(id);

        if (!isInCart){
            return null
        } else {
            const filter = data.productos.filter(product => product.id != id);
            return filter;
        }
        
    }
}

module.exports = CartsFirebaseDao;