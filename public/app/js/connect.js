var my_config = require('./config');
var chat = require('./chat');
var middle = require('./middle');

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
socket.on('letter', function(letter) {
    console.log(letter);
    // letter = JSON.parse(letter);

    var key = Object.keys(letter.directive)[0];

    if (directive[key] === undefined) {
        console.log('directive ' + key + ' 未实现');
    } else {
        directive[key](letter);

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
my_connect.deliver = function(letter) {
    socket.emit("letter", JSON.stringify(letter));

    console.log("deliver = " + JSON.stringify(letter));
};

my_connect.sendToUser = function(letter) {
    my_connect.deliver(letter);
};

my_connect.sign_in = function(username) {
    var letter = {
        directive: {
            client: {
                sign_in: null
            }
        },
        user: {
            username: username
        }
    };
    my_connect.deliver(letter);
};

my_connect.user_presence = function(letter) {

};

/**
 * 通知服务器 本人用户名字
 * @param  {[type]} username [description]
 * @return {[type]}          [description]
 */
my_connect.setUsername = function(username) {
    // letter 如果不指定收件人,则 postoffice 处理
    // var letter = {};
    var letter = {
        directive: {
            set: {
                username: username
            }
        }
    };
    my_connect.deliver(letter);

};

function Directive() {

}

Directive.prototype.client = function(letter) {
    var client = {};
    client.user_presence = function(letter) {
        var user = letter.user;

        chat.users.push(user);
        middle.userAvatarComponent.userListScope.$apply();
    };
    client.init_userList = function(letter) {

        // 这样使用  第二个参数是参数数组, 而其正好就是一个数组
        Array.prototype.push.apply(chat.users, letter.directive.client.init_userList);

        chat.users.forEach(function(user) {
            user.avatar = genereateAvatarImg();
        });

        console.log(chat.users);
        middle.userAvatarComponent.userListScope.$apply();

    };
    var key = Object.keys(letter.directive.client);
    client[key](letter);

};

// 随机生成一个用户的头像
function genereateAvatarImg() {
    return '/public/app/img/avatar/avatar' + (Math.floor(Math.random() * 5) + 1) + '.png';
}

Directive.prototype.receive = function(letter) {
    var message = letter.message;
};

var directive = new Directive();

module.exports = my_connect;
