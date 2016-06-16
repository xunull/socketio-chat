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

// var haha = 0;
// setInterval(function() {
//     ++haha;
//     chat.users.push({
//         username: haha
//     });
//     console.log(chat.users);
// }, 3000);

chatApp.controller('userList', function($scope, $http) {
    $scope.users = chat.users;
});
