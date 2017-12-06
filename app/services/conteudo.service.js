'use strict';

angular.module('TVeManager')
  .factory('ConteudoService', ConteudoService);

function ConteudoService($http, $q, httpRequest, StorageService) {
  const factory = {
    novoRoteiro: (data) => {
      const url = '/new_screenplay';
      const method = 'POST';
      return httpRequest(url, method, data, $q, $http);
    },
    getRoteiros: (projeto_id) => {
      const url = '/list_all_screenplay_by_project/' + projeto_id;
      const method = 'GET';
      return httpRequest(url, method, null, $q, $http);
    },
    putTopico: (data) => {
      const url = '/new_communication';
      const method = 'POST';
      return httpRequest(url, method, data, $q, $http);
    },
    putMensagem: (data) => {
      const url = '/new_message';
      const method = 'POST';
      return httpRequest(url, method, data, $q, $http);
    },
    getMensagem: () => {
      const url = '/list_all_messages_by_communication/' + StorageService.getItem('idTopico');
      const method = 'GET';
      return httpRequest(url, method, null, $q, $http);
    },
    setPath: (data) => {
      const url = '/insert_path_screenplay';
      const method = 'POST';
      return httpRequest(url, method, data, $q, $http);
    },
    deleteRoteiro: (data) => {
      const url = '/delete_screenPlay';
      const method = 'POST';
      return httpRequest(url, method, data, $q, $http);
    },
  };
  return factory;
}
