var middle = require('./middle');
var chatApp = require('./ang/chatapp');

var chat = require('./chat');
var userAvatarComponent = require('./ang/useravatar.component');
middle.userAvatarComponent = userAvatarComponent;

$(function() {

    $("#init").modal('show');

});
