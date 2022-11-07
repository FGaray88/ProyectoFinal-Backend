const mongoose = require("mongoose");
const ProductsModel = require("./products.schema");


const DATABASE = "ecommerce";
const PASS = "ingrese aqui la contraseña";

// Conexion a MongoDB Atlas
const URI = `mongodb+srv://FG-Projects:${PASS}@fg-cluster.byfsgny.mongodb.net/${DATABASE}?retryWrites=true&w=majority`;

// Conexion a localhost
/* const URI = `mongodb://localhost:27017/${DATABASE}`; */

( async () => {
    try {
        await mongoose.connect(URI);
        console.log("Connected to Database!");

        const product = {
            name: "producto nuevo",
            thumbnail: "url de imagen de nuevo producto",
            price: 1000,
            description: "descripcion de nuevo producto",
            stock: 700,
            timestamp: Date.now(),
            code: "codigo de nuevo producto"
        };

        await new ProductsModel(product).save();
        console.log("Documento insertado");

        const students = await StudentModel.find().lean();
        console.table(students)

    }
    catch (error) {
        console.log(error.message);
    }
})();