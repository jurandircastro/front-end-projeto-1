'use strict';

angular.module('TVeManager').config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $urlRouterProvider.otherwise('/login');

  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'views/login.html',
    controller: 'AuthController'
  })
  .state('home', {
    url: '/home',
    templateUrl: 'views/home.html',
    controller: 'ProjetoController'
  })

  .state('grupos', {
    url: '/grupos',
    templateUrl: 'views/grupos-usuarios.html',
    controller: 'GrupoController'
  })

  .state('comunicacao', {
    url: '/comunicacao',
    templateUrl: 'views/comunicacao.html',
    controller: 'ComunicacaoController'
  })

  .state('aprovacao', {
    url: '/aprovacao',
    templateUrl: 'views/aprovacao.html',
    controller: 'AprovacaoController'
  })

  .state('conteudo', {
    url: '/conteudo',
    templateUrl: 'views/conteudo.html',
    controller: 'ConteudoController'
  })
  .state('conteudoChat', {
    url: '/conteudoChat',
    templateUrl: 'views/conteudoChat.html',
    controller: 'ConteudoChatController'
  })

  .state('conteudoAudio', {
    url: '/conteudoAudio',
    templateUrl: 'views/conteudoAudio.html',
    controller: 'ConteudoAudioController'
  })
  .state('conteudoAudioChat', {
    url: '/conteudoAudioChat',
    templateUrl: 'views/conteudoAudioChat.html',
    controller: 'ConteudoAudioChatController'
  })

  .state('conteudoVideo', {
    url: '/conteudoVideo',
    templateUrl: 'views/conteudoVideo.html',
    controller: 'ConteudoVideoController'
  })
  .state('conteudoVideoChat', {
    url: '/conteudoVideoChat',
    templateUrl: 'views/conteudoVideoChat.html',
    controller: 'ConteudoVideoChatController'
  })

  .state('gestao', {
    url: '/gestao',
    templateUrl: 'views/gestao.html',
    controller: 'GestaoController'
  })

   .state('navbar', {
    url: '/navbar',
    templateUrl: 'views/components/navbar.html',
    controller: 'NavbarController'
  })

  .state('juridico', {
    url: '/juridico',
    templateUrl: 'views/juridico.html',
    controller: 'JuridicoController'
  })

  .state('juridicoCPBeCRT', {
    url: '/juridicoCPBeCRT',
    templateUrl: 'views/juridicoCPBeCRT.html',
    controller: 'JuridicoCPBController'
  })

  .state('perfil', {
    url: '/perfil',
    templateUrl: 'views/perfil.html',
  })

  .state('projeto', {
    url: '/projeto',
    templateUrl: 'views/projeto.html',
    controller: 'MenuController'
  });

});
