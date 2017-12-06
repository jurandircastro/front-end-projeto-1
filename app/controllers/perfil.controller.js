'use strict';

angular.module('TVeManager')
  .controller('PerfilController', PerfilController);

function PerfilController ( $scope, StorageService, PerfilService) {

  $scope.setProfileIMG = () => {
      $scope.usuarioAtual = JSON.parse(StorageService.getItem('user'));

      let newName;

      if($scope.newName == null){
        newName = usuarioAtual.name;
      }
      else{
        newName = $scope.newName;
      }

      let userUpdateImage = {
        user_id:$scope.usuarioAtual.id,
        image_path:$scope.novafoto,
        newName: newName
      }

      PerfilService.setProfileImage(userUpdateImage).then((data) => {
          console.log(data);
      })

      .catch((err) => {
      $scope.errors = err.data;
      });
  }
}
