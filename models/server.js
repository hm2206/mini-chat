const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');
const Sockets = require('./sockets');


class Server {

    constructor() {
        
        this.app = express();
        this.port = process.env.PORT || 3000;

        // Http Server
        this.server = http.createServer(this.app);

        // Configuración de sockets
        this.io = socketIo(this.server);

    }

    middlewares () {
        // servir directorio estatico
        this.app.use(express.static(path.resolve(__dirname, '../public')));
    }

    configSockets () {
        new Sockets(this.io);
    }

    // correr el servidor
    execute = () => {

        // inicializar middlewares
        this.middlewares();

        // inicializar sockets
        this.configSockets();

        this.server.listen(this.port, () => {
            console.log(`Run server on port: ${this.port}`)
        });
    }

}


module.exports = Server;