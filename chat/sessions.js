/**
 * 此session 当一个客户端成功连接到后台的时候被创建
 * 并且在其他地方会以 username 为key 引用此session
 */
function Session() {
    var session = new Map();
    this.session = session;
}

// 以下几项并没有放入map中,防止被set 覆盖掉

Session.prototype.setUser = function(user) {
    this.user = user;
};

Session.prototype.setSocket = function(socket) {
    this.socket = socket;
};

/**
 * 保存一个属性
 * @param  {[type]} key   [description]
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
Session.prototype.set = function(key, value) {
    this.session.set(key, value);
};

/**
 * 获取一个属性
 * @param  {[type]} key [description]
 * @return {[type]}     [description]
 */
Session.prototype.get = function(key) {
    return this.setsion.get(key);
};


/**
 * 销毁此session
 * @return {[type]} [description]
 */
Session.prototype.invalidate = function() {

};
