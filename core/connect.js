/**
 * 此文件连接chat 和 socketio
 */

var io_server = require('socket.io');
var logger = require('../common/logger');
var config = require('../config');

var My_connect = require('../chat/handler');
var xredis = require('../core/redis');
var my_connect;

var io;

module.exports = SocketioServer;

function SocketioServer(http) {
    // io = io_server(http);
    io = io_server(config.socketio.port);
    my_connect = new My_connect(io);

    io.on('connection', function(socket) {
        console.log('a web client connected, socket id is ' + socket.id);

        socket.on('letter', function(letter) {

            my_connect.handle(letter, socket);

        });

        socket.on('error', function(err) {
            console.log('socket id is ' + socket.id + ' has error');
            console.log(err);
        });

        socket.on('disconnect', function() {
            console.log('a web clientt disconnect, socket id is ' + socket.id);

        });

    });
}

/**
 * 关闭socketio
 * @return {[type]} [description]
 */
SocketioServer.prototype.shutdown = function() {

};

/**
 * 重启socketio
 * @return {[type]} [description]
 */
SocketioServer.prototype.restart = function() {

};
