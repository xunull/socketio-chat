var chatApp = angular.module('chatApp', []);

var user = {};

chatApp.controller('sign', function($scope, $http) {

    $scope.signUser = function() {

        if (undefined === $scope.username || $scope.username.trim() === '') {
            alert('请输入用户名');
        } else {
            user.username = $scope.username;
            $("#init").modal('hide');
            // my_connect.setUsername($scope.username);
            my_connect.sign_in($scope.username);
        }
    };
});

var chat = {};
chat.users = [];

// 暴露 userList 的$scope 给外界使用
var userListScope;

chatApp.controller('userList', function($scope, $http) {
    userListScope = $scope;
    $scope.users = chat.users;
});
