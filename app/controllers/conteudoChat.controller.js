'use strict';

angular.module('TVeManager')
  .controller('ConteudoChatController', ConteudoChatController);


function ConteudoChatController ($scope, StorageService, ComunicacaoService) {

  let roteiro= JSON.parse(StorageService.getItem('roteiro'));

  $scope.pdfUrl = 'http://tve-manager-backend.jelasticlw.com.br/'+roteiro.path;

  let getTopico = () => {
    ComunicacaoService.getTopicoFile(roteiro._id).then((data) => {
        StorageService.removeItem('idTopicoConteudo');
        StorageService.setItem('idTopicoConteudo', data.data._id);
        getMensagem();
    })
    .catch((err) => {
        $scope.errors = err.data;
    });
  }

  $scope.addMensagem = (data) =>{
    let usuario = JSON.parse(StorageService.getItem('user'));
    let idTopico = StorageService.getItem('idTopicoConteudo');
    let mensagem = {
        "text":$scope.mensagem ,
        "user_id":usuario._id,
        "communication_id": idTopico
    };
    ComunicacaoService.putMensagem(mensagem).then((data) => {
        getMensagem();
    });
  }

  let getMensagem = () =>{
    let idTopico = StorageService.getItem('idTopicoConteudo');
    ComunicacaoService.getMensagem(idTopico).then((data) => {
        $scope.mensagens = data.data;
        $('#campoMensagem').val('');
    })
    .catch((err) => {
        $scope.errors = err.data;
    });
  }


  getTopico();

}
