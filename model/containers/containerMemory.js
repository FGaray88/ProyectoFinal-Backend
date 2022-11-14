const fs = require("fs")
const { HTTP_STATUS } = require("../../constants/api.constants");
const { HttpError } = require("../../utils/api.utils");

class Container {
    constructor(archivo) {
        this.archivo = archivo
    }
    
    static async connect() {
        return {
            success: true,
        }
    }

    save(object) {
            let objAddId;
            const data = leerArchivo(this.archivo);
            const mapeo = data.map((product) => product.id);
            const mayorId = Math.max(...mapeo);
            const nuevoID = mayorId+1;
            nuevoID === -Infinity ? objAddId = 1 : objAddId = nuevoID;
            const objAddedId = {...object, id:objAddId};
            data.push(objAddedId);
            escribirArchivo(this.archivo, JSON.stringify(data))
            return objAddId;
        }


    getById(Number) {
        const data = leerArchivo(this.archivo)
        const found = data.find(p => p.id === +(Number));
        if(found === undefined){
            const message = `this resource does not exist in our records`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }else {
            return found;
        }
    }

    updateById(number, product) {
        const data = leerArchivo(this.archivo);
        const productIndex = data.findIndex((product) => product.id === +(number));
        if (productIndex < 0){
            const message = `this resource does not exist in our records`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }
        const updatedProduct = {
            ...product,
            id: data[productIndex].id
        };
        data[productIndex] = updatedProduct;
        escribirArchivo(this.archivo, JSON.stringify(data))

        
    }

    getAll() {
        const data = leerArchivo(this.archivo);
        return data;
    }

    deleteById(Number) {
        const data = leerArchivo(this.archivo)
        const found = data.find(p => p.id === +(Number));
        if(found === undefined){
            const message = `this resource does not exist in our records`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }
        const filtro = data.filter(product => product.id !== +(Number));
        escribirArchivo(this.archivo, JSON.stringify(filtro))
        return {
            deletedCount: 1
        };
    }

    deleteAll() {
        const nuevoArray = []
        escribirArchivo(this.archivo, nuevoArray)
    }
}



leerArchivo = (archivo) => {
    const data = fs.readFileSync(archivo,"utf-8");
    const dataParse = JSON.parse(data);
    return dataParse;
}

escribirArchivo = (archivo, data) => {
        fs.writeFileSync(archivo, data)
}



module.exports = Container