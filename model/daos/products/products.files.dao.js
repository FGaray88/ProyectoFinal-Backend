const FilesContainer = require('../../containers/containerFiles');
const dbConfig = require('../../../db/config');

const archivo = dbConfig.file.products;

class ProductsFilesDao extends FilesContainer {
    constructor() {
        super(archivo);
    }
}

module.exports = ProductsFilesDao;