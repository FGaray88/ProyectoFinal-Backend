const MemoryContainer = require("../../containers/containerMemory");

const archivo = "./db/data/cart.json"

class CartsMemoryDao extends MemoryContainer {
    constructor() {
        super(archivo);
    }
}

module.exports = CartsMemoryDao;