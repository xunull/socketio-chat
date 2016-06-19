define(['angular'], function(angular) {

    var chatApp = angular.module('chatApp', []);

    var user = {};

    chatApp.controller('sign', function($scope, $http) {

        $scope.signUser = function() {

            if (undefined === $scope.username || $scope.username.trim() === '') {
                alert('请输入用户名');
            } else {
                user.username = $scope.username;
                $("#init").modal('hide');
                chat.signinuser.username = $scope.username;
                my_connect.sign_in($scope.username);
            }
        };
    });
});
