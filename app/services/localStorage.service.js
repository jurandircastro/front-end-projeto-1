'use strict';

angular.module('TVeManager')
  .factory('StorageService', StorageService);

function StorageService() {
  const factory = {
    toJSON: (item) => {
       return JSON.stringify(item);
    },

    fromJSON: (item) => {
       return JSON.parse(item);
    },

    setItem: (key, item) => {
       if (typeof(item) == 'object') item = this.toJSON(item);
       localStorage.setItem(key, item);
    },

    getItem: (key) => {
       return localStorage.getItem(key);
    },

    removeItem: (key) => {
       localStorage.removeItem(key);
    }
  };

  return factory;
}
