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
/* const PORT = args.port; */
const PORT = 8080;

const clusterMode = process.argv[4] == "CLUSTER";


const { Server: SocketServer } = require("socket.io");
const { Server: HttpServer } = require("http");
const { formatMessage } = require("./utils/utils")
const Messages = require("./db/chat/messages");
const messages = new Messages("./db/chat/messages.json");
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);
const users = [];




io.on("connection", (socket) => {
    console.log("Nuevo usuario conectado");
    const mensajes = messages.getAll()
    socket.emit("messages", mensajes);
    socket.on("new-message", (data) => {
        const newUser = {
            id: socket.id,
            username: data.user
        }
        users.push(newUser)
        const author = users.find(user => user.id === socket.id);
        const newMessage = formatMessage(socket.id, author.username, data.text);
        const addMessage = messages.save(newMessage)
        io.emit("chat-message", newMessage);
    });
});





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
        consoleLogger.info("Worker", worker.process.pid, "died", new Date().toLocaleDateString())
    })
    cluster.fork()
} else {
    httpServer.listen(PORT, () => {
        logger.trace(`Servidor conectado en ${envConfig.DATASOURCE} y escuchando en http://${envConfig.HOST}:${PORT}`)
    });
}



