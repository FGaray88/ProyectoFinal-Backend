const FilesContainer = require('../../containers/containerFiles');
const dbConfig = require('../../../db/config');

const HTTP_STATUS = require('../../../constants/api.constants');
const { HttpError } = require('../../../utils/api.utils');

const archivo = dbConfig.file.carts;

class CartsFilesDao extends FilesContainer {
    constructor() {
        super(archivo);
    }

    async validate(data, id) {
        const idProd = await data.productos.map(elem => elem.id.toString());
        const isInCart = idProd.includes(id);

        if (!isInCart){
            return null
        } else {
            const filter = data.productos.filter(product => product.id != id);
            return filter;
        }
        
    }
}

module.exports = CartsFilesDao;