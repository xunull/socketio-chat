var userListScope;

angular.module('chatApp').component('userList', {
    template: `<div>
                  <div ng-repeat='user in users'>
                      <img class="user-avatar" src="/public/res/img/avatar/avatar0.png" alt="" />
                      <span>{{user.username}}</span>
                  </div>
                </div>`,
    controller: function PhoneListController($scope) {

        // 使用scope 是因为 在外界改变了 users 的值 为了使用 $scope.$apply方法
        $scope.users = chat.users;
        userListScope = $scope;
    }
});
