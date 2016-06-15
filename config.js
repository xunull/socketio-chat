var config = {
    debug: true,
    port: 15321,
    redis: {
        port: 12312,
        host: "127.0.0.1",
        pwd:123456,
        opts: {}
    },
    socketio:{
      port:23234
    }
};

module.exports = config;
