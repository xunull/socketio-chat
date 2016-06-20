var middle = require('./middle');
var chatApp = require('./ang/chatapp');

var userAvatarComponent = require('./ang/useravatar.component');
middle.userAvatarComponent = userAvatarComponent;
var my_connect = require('./connect');
middle.my_connect = my_connect;

$(function() {

    $("#init").modal('show');

});
