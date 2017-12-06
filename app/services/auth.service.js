'use strict';

angular.module('TVeManager')
  .factory('AuthService', AuthService);

function AuthService($http, $q, httpRequest) {
  const factory = {
    login: (data) => {
      const url = '/authenticate_user';
      const method = 'POST';
      return httpRequest(url, method, data, $q, $http);
    }
  };
  return factory;
}
