const fs = require("fs")

class Container {
    constructor(archivo) {
        this.archivo = archivo
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
        const found = data.find(p => p.id === Number);
        if(found === undefined){
            return null;
        }else {
            const filtro = data.filter(product => product.id ===Number);
            return filtro;
        }
    }

    updateById(number, product) {
        const data = leerArchivo(this.archivo);
        const productIndex = data.findIndex((product) => product.id === +(number));
        if (productIndex < 0) return null;
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
        const found = data.find(p => p.id === Number);
        if(found === undefined){
            return null;
        }else {
            const filtro = data.filter(product => product.id !==Number);
            escribirArchivo(this.archivo, JSON.stringify(filtro))
        }
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