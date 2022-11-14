const MemoryContainer = require("../../containers/containerMemory");

const archivo = "./db/data/products.json"

class ProductsMemoryDao extends MemoryContainer {
    constructor() {
        super(archivo);
    }
}

module.exports = ProductsMemoryDao;