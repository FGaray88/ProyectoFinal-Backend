const express = require("express");
const PORT = process.env.PORT || 8080;
const app = express();
const apiRoutes = require("./routers/app.routers");
const envConfig = require("./config")



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/* app.use(express.static("public")); */



app.get("/", (req, res) =>{
    res.json("Bienvenido");
});
app.use("/api", apiRoutes);
app.get("*", (req, res) => {
    res.status(404).send("<h1 style='color:red;'> La pagina que busca no existe </h1>")
});


const DATASOURCE_BY_ENV =  {
    mongo: require("./model/containers/containerMongo"),
    firebase: require("./model/containers/containerFirebase")
};

const dataSource = DATASOURCE_BY_ENV[envConfig.DATASOURCE]


const connectedServer = app.listen(PORT, () => {
    console.log(`servidor funcionando en puerto ${PORT}`);
});

connectedServer.on("error", (error) => {
    console.log(error.message);
});