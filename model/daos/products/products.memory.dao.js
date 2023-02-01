const MemoryContainer = require("../../containers/containerMemory");

const data = []

class ProductsMemoryDao extends MemoryContainer {
    constructor() {
        super(data);
    }
}

module.exports = ProductsMemoryDao;