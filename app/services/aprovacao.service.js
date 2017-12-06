'use strict';

angular.module('TVeManager')
  .factory('AprovacaoService', AprovacaoService);

function AprovacaoService($http, $q, httpRequest, StorageService) {
  const factory = {
    novoAprovacaoFile: (data) => {
      const url = '/new_acceptance';
      const method = 'POST';
      return httpRequest(url, method, data, $q, $http);
    },
    getAprovacaoFiles: (projeto_id) => {
      const url = '/list_all_acceptance_by_project/' + projeto_id;
      const method = 'GET';
      return httpRequest(url, method, null, $q, $http);
    },
    deleteAprovacaoFiles: (data) => {
      const url = '/delete_acceptance/';
      const method = 'POST';
      return httpRequest(url, method, data, $q, $http);
    },
    setPath: (data) => {
      const url = '/insert_path_acceptance';
      const method = 'POST';
      return httpRequest(url, method, data, $q, $http);
    },
  };
  return factory;
}
