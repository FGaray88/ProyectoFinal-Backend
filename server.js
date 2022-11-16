const app = require("./app");
const envConfig = require("./config");
const PORT = process.env.PORT || 8080;

const DATASOURCE_BY_ENV = {
    mongo: require('./model/containers/containerMongo'),
    firebase: require('./model/containers/containerFirebase'),
    file: require('./model/containers/containerMemory')
};

const dataSource = DATASOURCE_BY_ENV[envConfig.DATASOURCE]


app.listen(PORT, () => {
    dataSource.connect().then(() => {
        console.log(`Server is up and running on port: `, PORT);
        console.log("Connected to " + envConfig.DATASOURCE);
    })
});