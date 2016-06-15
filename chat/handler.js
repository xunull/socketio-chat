var xredis = require('../core/redis');
var logger = require('../common/logger');
var _ = require('lodash');

// socket.io  的 io 对象
var myio = {};

module.exports = MyConnect;

function MyConnect(io) {
    this.io = io;
    myio = io;

}

MyConnect.prototype = {
    handle: function(letter, socket) {
        letter = JSON.parse(letter);
        console.log(letter);
        var keys = _.keys(letter.directive);
        console.log(keys);
    }
};
