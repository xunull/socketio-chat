var config = require('./config');
var Connect = require('./connect');
var middle = require('./middle');

// 没有<> 就变成选取元素了
var templateDiv = $("<div>");

// 自己的聊天消息
var chatMsgRight;
// 他人的聊天消息
var chatMsgLeft;
// 聊天窗口
var chatWindow;

// TODO 防止缓存的问题
templateDiv.load('/public/app/template/template.html', function() {

    chatMsgRight = templateDiv.find("#msg-right>div");
    chatMsgLeft = templateDiv.find("#msg-left>div");
    chatWindow = templateDiv.find("#chatWindow>div");

    // 加载完在赋值
    chat.chatWindow = chatWindow;

});

var msg_input;




var msg_end;

// 聊天框显示出最新的
function msgScrollEnd() {
    msg_end[0].scrollIntoView();
}

/**
 * 自己的消息
 * 一条消息需要名字,时间,头像,内容
 * @return {[type]} [description]
 */
function insertChatMsgRight(content) {
    var date = new Date();
    var clone = chatMsgRight.clone();
    clone.find(".direct-chat-timestamp").html((new Date()).toLocaleTimeString());
    clone.find(".direct-chat-text").html(content);
    msg_end.before(clone);
}

/**
 * 对方的消息
 * @return {[type]} [description]
 */
function insertChatMsgLeft(content) {
    var date = new Date();
    var clone = chatMsgLeft.clone();
    clone.find(".direct-chat-timestamp").html((new Date()).toLocaleTimeString());
    clone.find(".direct-chat-text").html(content);
    msg_end.before(clone);
}

function Chat() {
    this.connect = null;
    this.users = [];
    this.currentChat = {
        username: null,
        chatname: null
    };
    this.signinuser = {
        username: null
    };
    // key username value chat window  dom
    this.chatWindowDom = new Map();
}

Chat.prototype.toggleChatView = function(user) {
    var chat = this;
    console.log(chat.chatWindow);
    console.log(this);

    console.log(chat);
    var userDom = chat.chatWindowDom.get(user.username);

    if (userDom === undefined || userDom === null) {
        userDom = chat.chatWindow.clone();
        chat.chatWindowDom.set(user.username, userDom);
        userDom.find('#chatWindow-username').html(user.username);
        userDom.find('#msg-input').on('keydown', function(event) {

            if (event.keyCode === 13) {
                // 回车
                chat.say();
            }
        });

        userDom.find('.say').click(function() {
            chat.say();
        });

    } else {
        console.log('userdom is not null');
    }

    msg_input = userDom.find("#msg-input");
    msg_end = userDom.find("#msg_end");

    $('#chatWindowDiv').replaceWith(userDom);
};

Chat.prototype.say = function() {
    var msg = msg_input.val();
    if (msg !== '') {
        msg_input.val(null);
        insertChatMsgRight(msg);
        msgScrollEnd();

        var letter = {
            directive: {
                send: {
                    message: null
                }
            },
            message: {
                sendUser: chat.signinuser.username,
                content: msg
            }
        };
        if (chat.currentChat.username !== null) {
            // 单聊
            letter.message.receiveUser = chat.currentChat.username;
            letter.message.type = 'one';
        } else {
            // 群聊
            letter.message.receiveUser = chat.currentChat.chatname;
            letter.message.type = 'some';
        }

        // 发送到服务器
        this.connect.sendToUser(letter);
    }
};

Chat.prototype.refreshUserList = function() {
    middle.userAvatarComponent.userListScope.$apply();
};

Chat.prototype.signIn = function(username) {
    this.connect.sign_in(username);
};

var chat = new Chat();
var connect = new Connect(chat);
chat.connect = connect;

// 连接server
connect.connect(config.communication_server_host);

module.exports = chat;
