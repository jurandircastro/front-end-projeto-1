'use strict';

angular.module('TVeManager')
  .factory('ConteudoVideoService', ConteudoVideoService);

function ConteudoVideoService($http, $q, httpRequest, StorageService) {
  const factory = {
    novoVideo: (data) => {
      const url = '/new_Video';
      const method = 'POST';
      return httpRequest(url, method, data, $q, $http);
    },
    getVideos: (projeto_id) => {
      const url = '/list_all_Video_by_project/' + projeto_id;
      const method = 'GET';
      return httpRequest(url, method, null, $q, $http);
    },
    setPath: (data) => {
      const url = '/insert_path_video';
      const method = 'POST';
      return httpRequest(url, method, data, $q, $http);
    },
    deleteVideo: (data) => {
      const url = '/delete_video';
      const method = 'POST';
      return httpRequest(url, method, data, $q, $http);
    }
  };
  return factory;
}
