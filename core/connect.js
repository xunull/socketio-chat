/**
 * 此文件连接chat 和 socketio
 */

var io_server = require('socket.io');
var logger = require('../common/logger');
var config = require('../config');

var Session = require('../chat/session');
var Directive = require('../chat/directive');
var xredis = require('../core/redis');
var directive;

var io;

var sessionsMap = new Map();

module.exports = SocketioServer;

function SocketioServer(http) {
    // io = io_server(http);
    io = io_server(config.socketio.port);
    directive = new Directive(io);

    io.on('connection', function(socket) {
        logger.debug('a client connected, socket id is ' + socket.id);

        // 初始化此连接的session
        var session = new Session();
        initSession(session);

        // letter 事件是本系统内的消息事件
        socket.on('letter', function(letter) {
            directive.handle(letter, session);
        });

        socket.on('error', function(err) {
            console.log('socket id is ' + socket.id + ' has error');
            console.log(err);
        });

        socket.on('disconnect', function() {
            console.log('a client disconnect, socket id is ' + socket.id);
        });

    });
}

function initSession(session) {
    sessionsMap.set(socket.id, session);
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
