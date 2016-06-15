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
        msg_input.val(null);
        insertChatMsgRight(msg);
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
        $(".direct-chat-messages").append(clone);
    }

    /**
     * 对方的消息
     * @return {[type]} [description]
     */
    function insertChatMsgLeft() {

    }

});

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
