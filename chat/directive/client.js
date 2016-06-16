function Client() {

}

/**
 * 该用户上线后,会向其他用户推送 用户上线
 * @param  {[type]} letter  [description]
 * @param  {[type]} session [description]
 * @return {[type]}         [description]
 */
Client.prototype.user_presence = function(letter, session) {
    delete letter.directive.client.sign_in;
    letter.directive.client.user_presence = null;

    // console.log(session.socket === session.)

    // 目前是所有在线的人都会收到该信息
    session.sessionsMap.forEach(function(temp_session, key) {
        if (session.sessionid === key) {
            // 自己客户端的session
            // 这样实现,当用户多的时候, 会变得很浪费,因为只有一条数据才会满足这种情况
        } else {
            temp_session.deliver(letter);
        }

    });

};

/**
 * 用户登录
 * @param  {[type]} letter  [description]
 * @param  {[type]} session [description]
 * @return {[type]}         [description]
 */
Client.prototype.sign_in = function(letter, session) {
    session.setUser(letter.user);
    this.user_presence(letter, session);
};

var client = new Client();

module.exports = client;
