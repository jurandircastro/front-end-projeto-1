'use strict';

angular.module('TVeManager')
  .factory('ComunicacaoService', ComunicacaoService);

function ComunicacaoService($http, $q, httpRequest, StorageService) {
  const factory = { 
    putTopico: (data) => {
      const url = '/new_communication';
      const method = 'POST';
      return httpRequest(url, method, data, $q, $http);
    },
    getTopico: () => {
      const url = '/list_all_communications_by_project/' + StorageService.getItem('idProjeto');
      const method = 'GET';
      return httpRequest(url, method, null, $q, $http);
    },
    putMensagem: (data) => {
      const url = '/new_message';
      const method = 'POST';
      return httpRequest(url, method, data, $q, $http);
    },
    getMensagem: (idTopico) => {
      const url = '/list_all_messages_by_communication/' + idTopico;
      const method = 'GET';
      return httpRequest(url, method, null, $q, $http);
    },
    getGrupo: () => {
      const url = '/list_all_groups_by_project/' + StorageService.getItem('idProjeto');
      const method = 'GET';
      return httpRequest(url, method, null, $q, $http);
    },
    getUsuario: () => {
      const url = '/list_all_users';
      const method = 'GET';
      return httpRequest(url, method, null, $q, $http);
    },
    putGrupo: (data) => {
      const url = '/add_group_to_communication';
      const method = 'POST';
      return httpRequest(url, method, data, $q, $http);
    },
    getTopicoFile: (idFile) => {
      const url = '/list_communication_by_file/' + idFile;
      const method = 'GET';
      return httpRequest(url, method, null, $q, $http);
    }
  };

  return factory;
}
