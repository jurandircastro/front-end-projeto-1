'use strict';

angular.module('TVeManager')
  .factory('GrupoService', GrupoService);

function GrupoService($http, $q, httpRequest, StorageService) {
  
  const factory = {
    putGrupo: (data) => {
      const url = '/add_group_to_project  ';
      const method = 'POST';
      return httpRequest(url, method, data, $q, $http);
    },
    getGrupo: (idProjeto) => {
      const url = '/list_all_groups_by_project/' + idProjeto;
      const method = 'GET';
      return httpRequest(url, method, null, $q, $http);
    },
    getUsuario: () => {
      const url = '/list_all_users';
      const method = 'GET';
      return httpRequest(url, method, null, $q, $http);
    },
     putUsuario: (data) => {
      const url = '/add_user_to_group';
      const method = 'POST';
      return httpRequest(url, method, data, $q, $http);
    },
    deleteGrupo: (data) =>{
      const url = '/delete_group';
      const method = 'POST';
      return httpRequest(url, method, data, $q, $http);
    }
  };

  return factory;
}
