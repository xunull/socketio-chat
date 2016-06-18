var userListScope;

angular.module('chatApp').component('userList', {
    // templateaUrl: '/public/res/js/ang/useravatar.template.html',
    // controller: function UserListController($scope) {
    //     // // this.users = chat.users;
    //     // $scope.users =chat.users;
    //     // $scope.users = [{
    //     //   username:'1111'
    //     // }];
    //     // // console.log(this);
    //     // userListScope = $scope;
    //     //
    //     this.users = [{
    //       username:'afdadda'
    //     }];
    //
    //
    //     console.log('12121212121');
    // }

    template: "<div>" +
        "<div ng-repeat='user in users'>" +
        "<img  class='user-avatar' src='/public/res/img/avatar/avatar0.png' alt='' />" +
        "<span>{{user.username}}</span>" +
        "</div>" +
        "</div>",
    controller: function PhoneListController($scope) {
        // this.users = [{
        //     username: 'sdfdsfsdfdsf'
        // }];

        $scope.users = chat.users;
        userListScope = $scope;
    }
});
