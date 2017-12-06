'use strict';

angular.module('TVeManager')
  .factory('ConteudoAudioService', ConteudoAudioService);

function ConteudoAudioService($http, $q, httpRequest, StorageService) {
  const factory = {
    novoAudio: (data) => {
      const url = '/new_audio';
      const method = 'POST';
      return httpRequest(url, method, data, $q, $http);
    },
    getAudios: (projeto_id) => {
      const url = '/list_all_audio_by_project/' + projeto_id;
      const method = 'GET';
      return httpRequest(url, method, null, $q, $http);
    },
    setPath: (data) => {
      const url = '/insert_path_audio';
      const method = 'POST';
      return httpRequest(url, method, data, $q, $http);
    },
    deleteAudio: (data) => {
      const url = '/delete_audio';
      const method = 'POST';
      return httpRequest(url, method, data, $q, $http);
    }
  };
  return factory;
}
