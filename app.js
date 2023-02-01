const express = require('express');
const errorMiddleware = require('./middlewares/error.middleware');
const apiRoutes = require('./routers/app.routers');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('./middlewares/passport.js');
const dbConfig = require('./db/config');
const SingletonClass = require("./model/singleton/singleton")

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    name: 'my-session',
    secret: 'top-secret-51',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    store: MongoStore.create({
        mongoUrl: dbConfig.mongodb.connectTo("Sessions")
    }),
    cookie: {
        maxAge: 3600000
    }
}));

app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use("/", apiRoutes);

app.get("/datos", async (req, res) => {
    const singleton = SingletonClass.getInstance();
    const data = singleton.getValue();

    res.status(200).json({ data });
});

app.get("*", (req, res) => {
    res.status(404).send("<h1 style='color:red;'> La pagina que busca no existe </h1>")
});

app.use(errorMiddleware);

module.exports = app;