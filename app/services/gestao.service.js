'use strict';

angular.module('TVeManager')
  .factory('GestaoService', GestaoService);

function GestaoService($http, $q, httpRequest, StorageService) {
  const factory = {
    putItem:(data) =>{
        const url = '/add_item_to_management';
        const method = 'POST';
        return httpRequest(url, method, data, $q, $http);
    },
    putAtividade: (data) =>{
        const url = '/add_activity_to_item';
        const method = 'POST';
        return httpRequest(url, method, data, $q, $http);
    },
    putGestao:(data) =>{
        const url = '/add_management_to_project';
        const method = 'POST';
        return httpRequest(url, method, data, $q, $http);
    },
    getGestao: () => {
      const url = '/list_all_management_by_project/' + StorageService.getItem('idProjeto');
      const method = 'GET';
      return httpRequest(url, method, null, $q, $http);
    },
    getItem: () => {
      const url = '/list_all_itens_by_management/' + StorageService.getItem('idGestao');
      const method = 'GET';
      return httpRequest(url, method, null, $q, $http);
    },
    getAtividade: () => {
      const url = '/list_all_activitys_by_item/' + StorageService.getItem('idItem');
      const method = 'GET';
      return httpRequest(url, method, null, $q, $http);
    },
    putGrupoAtividade:(data) =>{
        const url = '/add_group_to_activity';
        const method = 'POST';
        return httpRequest(url, method, data, $q, $http);
    },
    getGrupo: () => {
      const url = '/list_all_groups_by_project/' + StorageService.getItem('idProjeto');
      const method = 'GET';
      return httpRequest(url, method, null, $q, $http);
    },
    getAllItem: () => {
      const url = '/list_all_itens_by_project/' + StorageService.getItem('idProjeto');
      const method = 'GET';
      return httpRequest(url, method, null, $q, $http);
    },
    putAtividadeFinalizada:(data) =>{
        const url = '/change_done_by_activity';
        const method = 'POST';
        return httpRequest(url, method, data, $q, $http);
    },
    putCorItens:(data) =>{
      const url = '/add_percentage_itens';
      const method = 'POST';
      return httpRequest(url, method, data, $q, $http);
    }
  };
  return factory;
}
