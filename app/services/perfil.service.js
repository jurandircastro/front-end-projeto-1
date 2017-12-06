'use strict';

angular.module('TVeManager')
  .factory('PerfilService', PerfilService);

function PerfilService($http, $q, httpRequest) {
  setProfileImage:(data) =>{
      const url = '/set_profile_image';
      const method = 'POST';
      return httpRequest(url, method, data, $q, $http);
  };
}
