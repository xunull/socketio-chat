function Pubsub() {
    this.handlers = {};
}

Pubsub.prototype = {
    on: function(eventType, handler) {
        var self = this;
        if (!(eventType in self.handlers)) {
            self.handlers[eventType] = [];
        }
        self.handlers[eventType].push(handler);
        return this;
    },
    emit: function(eventType) {
        var self = this;
        if (self.handlers[eventType] !== undefined) {
            var handlerArgs = arguments.slice(1);
            for (var i = 0; i < self.handlers[eventType].length; i++) {
                // 调用方法传递参数
                // 参数都来自于发出事件时的参数
                self.handlers[eventType][i].apply(self, handlerArgs);
            }
        } else {
            // 没有此事件的监听者
        }
        return this;
    },
    addEvent: function(eventType) {
        if (!(eventType in this.handlers)) {
            this.handlers[eventType] = [];
        }
        return this;
    }
};

var pubsub = new Pubsub();
// 初始化事件
pubsub.addEvent("signinBack");
pubsub.addEvent("signoutBack");
pubsub.addEvent("msgfromUser");
pubsub.addEvent('chat');

// 连接到指定主机
var socket = io(my_config.communication_server_host);

// 以下是socketio 的内部事件
socket.on('connect', function() {
    console.log("已连接到服务器");

});

socket.on('event', function(data) {

});

socket.on('disconnect', function() {

});

socket.on('error', function(obj) {
    console.log(obj);
});

socket.on('reconnect', function(number) {
    console.log(number);
});

socket.on('reconnecting', function(number) {
    console.log(number);
});

socket.on('reconnet_error', function(obj) {
    console.log(obj);
});

/**
 * letter 是自定义的消息事件
 */
socket.on('letter', function(content) {
    console.log(content);
    // content = JSON.parse(content);
    switch (content.optype) {

    }
});

/**
 * 聊天消息回调
 * @param content
 */
function chatBack(content) {
    pubsub.emit('chat', content);
}

/**
 * 登录事件回调
 * @param content
 */
function signInBack(content) {
    console.log("sign in success!");
    pubsub.emit("signinBack", content);
}

/**
 * 登出事件回调
 * @param content
 */
function signOutBack(content) {
    pubsub.emit("signoutBack", content);
}

var my_connect = {};

/**
 * content 是json 对象
 * @param optype
 * @param content
 */
my_connect.deliver = function(content) {
    socket.emit("letter", JSON.stringify(content));

    console.log("deliver = " + JSON.stringify(content));
};

my_connect.sendToUser = function(msg) {
    var letter = {};
    letter.optype = 3001;
    letter.msg = msg;
    my_connect.deliver(letter);
};
