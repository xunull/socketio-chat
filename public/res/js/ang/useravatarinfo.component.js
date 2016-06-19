var userListScope;

angular.module('chatApp').component('userList', {
    template: `<div>
                  <div ng-click='toggleChat(user)' ng-repeat='user in users'>
                      <img class="user-avatar" ng-src='{{user.avatar}}' alt="" />
                      <span>{{user.username}}</span>
                  </div>
                </div>`,
    controller: function UserListController($scope) {

        // 使用scope 是因为 在外界改变了 users 的值 为了使用 $scope.$apply方法
        $scope.users = chat.users;
        userListScope = $scope;

        $scope.toggleChat = function(user) {

            chat.currentChat.username = user.username;
            console.log(chat.currentChat.username);
        };
    }
});
