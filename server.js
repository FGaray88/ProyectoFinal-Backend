const app = require("./app");
const envConfig = require("./config");
const cluster = require("cluster");
const os = require("os");
const {
    logger,
    consoleLogger,
} = require("./logger/logger")

const minimist = require("minimist")
const args = minimist(process.argv.slice(2), {
    default: {
        port: 8080,
    },
    alias: {
        p: "port",
    }    
});
const PORT = args.port;
/* const PORT = process.env.PORT || 8080; */

const clusterMode = process.argv[4] == "CLUSTER";



if (!clusterMode){
    consoleLogger.info("Modo Fork");
}

if (clusterMode && cluster.isPrimary) {
    consoleLogger.info("Modo Cluster");
    const NUM_WORKERS = os.cpus().length;
    for (let i = 0; i < NUM_WORKERS; i++){
        cluster.fork();
    }
    cluster.on("exit", worker => {
        consoleLogger("Worker", worker.process.pid, "died", new Date().toLocaleDateString())
    })
    cluster.fork()
} else {
    app.listen(PORT, () => {
        logger.trace(`Servidor conectado en ${envConfig.DATASOURCE} y escuchando en http://${envConfig.HOST}:${PORT}`)
    });
}



