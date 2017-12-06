'use strict';

angular.module('TVeManager')
  .factory('JuridicoService', JuridicoService);

function JuridicoService($http, $q, httpRequest, StorageService) {

  const factory = {
     novoJuridico: (data) => {
      const url = '/add_juridical_to_topic';
      const method = 'POST';
      return httpRequest(url, method, data, $q, $http);
    },
    novoAlarme: (data) => {
      const url = '/add_alarm_to_juridical';
      const method = 'POST';
      return httpRequest(url, method, data, $q, $http);
    },
    novoTopico: (data) => {
      const url = '/add_topic_to_project';
      const method = 'POST';
      return httpRequest(url, method, data, $q, $http);
    },
    getJuridico: (topic_id) => {
      const url = '/list_all_juridical_by_topic/' + topic_id;
      const method = 'GET';
      return httpRequest(url, method, null, $q, $http);
    },
    getTopico: (projeto_id) => {
      const url = '/list_all_topics_by_project/' + projeto_id;
      const method = 'GET';
      return httpRequest(url, method, null, $q, $http);
    },
    setPath: (data) => {
      const url = ' /insert_path_juridical';
      const method = 'POST';
      return httpRequest(url, method, data, $q, $http);
    },
    novoCPBeCRT: (data) => {
      const url = '/add_CPB_CRT_to_project';
      const method = 'POST';
      return httpRequest(url, method, data, $q, $http);
    },
    getCPBeCRT: (project_id) => {
      const url = '/list_all_CPB_CRT_by_project/' + project_id;
      const method = 'GET';
      return httpRequest(url, method, null, $q, $http);
    }
    
  };

  return factory;
}
