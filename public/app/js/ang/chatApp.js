var middle = require('../middle');
var chat = require('../chat');

var chatApp = angular.module('chatApp', []);
console.log(237894897234234);
chatApp.controller('sign', function($scope, $http) {



    $scope.signUser = function() {

        if (undefined === $scope.username || $scope.username.trim() === '') {
            alert('请输入用户名');
        } else {
            $("#init").modal('hide');
            chat.signinuser.username = $scope.username;
            middle.my_connect.sign_in($scope.username);
        }

    };

});

module.exports = chatApp;
