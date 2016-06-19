$(function() {

    // 没有<> 就变成选取元素了
    var templateDiv = $("<div>");

    var chatMsgRight,
        chatMsgLeft;

    // TODO 防止缓存的问题
    templateDiv.load('/public/res/template/template.html', function() {
        console.log('template 加载完毕');

        chatMsgRight = templateDiv.find("#msg-right>div");
        chatMsgLeft = templateDiv.find("#msg-left>div");

    });

    var msg_input = $("#msg-input");

    $("#msg-input").on('keydown', function(event) {
        if (event.keyCode === 13) {
            // 回车
            say();
        }
    });

    $("#say").click(function() {
        say();
    });

    function say() {
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
            my_connect.sendToUser(letter);
        }
    }

    var msg_end = $("#msg_end");

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

});


var chat = {};
chat.users = [];
chat.currentChat = {
    username: null,
    chatname: null
};

chat.signinuser = {
    username: null
};

function consoleDate() {
    var date = new Date();
    console.log(date.toString()); // Wed Jun 15 2016 11:03:11 GMT+0800 (CST)
    console.log(date.toTimeString()); // 11:03:11 GMT+0800 (CST)
    console.log(date.toUTCString()); // Wed, 15 Jun 2016 03:03:11 GMT 标准时间
    console.log(date.toLocaleTimeString()); // 上午11:03:11
    console.log(date.toLocaleString()); // 2016/6/15 上午11:03:11
    console.log(date.toDateString()); // Wed Jun 15 2016
    console.log(date.toISOString()); // 2016-06-15T03:03:11.225Z
    console.log(date.toLocaleDateString()); // 2016/6/15
}
