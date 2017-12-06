'use strict';

angular.module('TVeManager')
  .factory('ProjetoService', ProjetoService);

function ProjetoService($http, $q, httpRequest) {
  const factory = {
    getProjeto: () => {
      const url = '/list_all_projects';
      const method = 'GET';
      return httpRequest(url, method, null, $q, $http);
    },
    putProjeto:(data) =>{
        const url = '/new_project';
        const method = 'POST';
        return httpRequest(url, method, data, $q, $http);
    },
    putUserImage:(data) =>{
      const url = '/edit_user';
      const method = 'POST';
      return httpRequest(url, method, data, $q, $http);
    },
    deleteProjeto:(data) =>{
      const url = '/delete_project';
      const method = 'POST';
      return httpRequest(url, method, data, $q, $http);
    },
    alterarProjeto:(data) =>{
      const url = '/edit_project';
      const method = 'POST';
      return httpRequest(url, method, data, $q, $http);
    },
    updateImageProject:(data) =>{
      const url = '/edit_image_project';
      const method = 'POST';
      return httpRequest(url, method, data, $q, $http);
    }
  };
  return factory;
}
