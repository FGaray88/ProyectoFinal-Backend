const express = require('express');
const errorMiddleware = require('./middleware/error.middleware');
const apiRoutes = require('./routers/app.routers');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) =>{res.json("Bienvenido");});

app.use("/api", apiRoutes);

app.get("*", (req, res) => {
    res.status(404).send("<h1 style='color:red;'> La pagina que busca no existe </h1>")
});

app.use(errorMiddleware);

module.exports = app;