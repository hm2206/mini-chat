

class Sockets {

    constructor(io) {
        this.io = io;
        // executar socket events
        this.socketEvents();
    }

    socketEvents () {
        this.io.on('connection', (socket) => {

            let current_date = new Date();

            socket.emit('init', {
                success: true,
                message: "Hola terrícola :3",
                data: current_date
            });

            socket.on('client@message', (data) => {
                this.io.emit('server@message', { ...data, date: current_date });
            });

        });
    }

}


module.exports = Sockets;