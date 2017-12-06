'use strict';

angular.module('TVeManager')
  .controller('AuthController', AuthController);

function AuthController ($rootScope,$scope, $state, AuthService, StorageService) {

  $scope.logIn = () => {
    let user = {
      login: $scope.usuario.login,
      password: $scope.usuario.password
    }

    AuthService.login(user).then((data) => {
      let user = JSON.stringify(data.data.User);
   
      if(data.data.success){
        StorageService.setItem('user', user);
        $state.go('home');
        $rootScope.usuarioAtualNav = JSON.parse(StorageService.getItem('user'));
      }else{
        $scope.userFail = true;
      }
    })
    .catch((err) => {
      $scope.errors = err.data;

    });
  };

}
