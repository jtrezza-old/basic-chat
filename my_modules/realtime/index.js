'use strict'

const socketio = require('socket.io');

module.exports = function(server)
{
    /**
     * Here we attach the socket to the server. socket.io accepts a parameter to be an
     * instance of http.Server, we can't pass app to it. app is an express request handler function
     */
    const io = socketio(server);

    io.on('connection', onConnection);

    function onConnection(socket)
    {
        console.log(`User connected ${socket.id}`);

        socket.on('disconnect', function(){
            console.log('user disconnected');
        });

        socket.on('chat-message', function(msg){
            socket.emit('msg-from-server', msg);
            socket.broadcast.emit('msg-from-server', msg);
        });
    }
}