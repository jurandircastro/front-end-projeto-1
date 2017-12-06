'use strict';

angular.module('TVeManager')
  .controller('MenuController', MenuController);

function MenuController ($scope, StorageService) {

    let updateInformation = () => {
        $scope.project = JSON.parse(StorageService.getItem('project'));
      
    }

    updateInformation();
}
