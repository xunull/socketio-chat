// 以下四个集合保存的是 当前 系统中登录着的用户

// 保存已经登陆成功的socket,key为user的id
var sockets_byuserid = {};
// 保存已经登录成功的socket,key为socket的id
var sockets_bysocketid = {};
// 保存用户, key为socket的id
var users_bysocketid = {};
// 保存用户，key为user的id
var users_byuserid = {};


var sessions = {};
exports.sessions = sessions;

sessions.sockets_byuserid = sockets_byuserid;
sessions.sockets_bysocketid = sockets_bysocketid;
sessions.users_byuserid = users_byuserid;
sessions.users_bysocketid = users_bysocketid;
