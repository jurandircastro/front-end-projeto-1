'use strict';

angular.module('TVeManager')
  .controller('ConteudoAudioChatController', ConteudoAudioChatController);


function ConteudoAudioChatController ($scope, StorageService, ComunicacaoService) {

    let audio = JSON.parse(StorageService.getItem('audio'));

    $scope.songs = [
       {
           id: audio._id,
           title: audio.name,
           url: 'http://tve-manager-backend.jelasticlw.com.br/' + audio.path
       }
     ];


  let getTopico = () => {
    console.log(audio);
        ComunicacaoService.getTopicoFile(audio._id).then((data) => {
            StorageService.removeItem('idTopicoAudio');
            StorageService.setItem('idTopicoAudio', data.data._id);
            getMensagem();
        })
        .catch((err) => {
            $scope.errors = err.data;
        });
  }

  $scope.addMensagem = (data) =>{
    let usuario = JSON.parse(StorageService.getItem('user'));
    let idTopico = StorageService.getItem('idTopicoAudio');
    let mensagem = {
        "text":$scope.mensagem ,
        "user_id": usuario._id,
        "communication_id": idTopico
    };
    console.log(mensagem);
    ComunicacaoService.putMensagem(mensagem).then((data) => {
        getMensagem();
    });
  }

  let getMensagem = () =>{
    let idTopico = StorageService.getItem('idTopicoAudio');
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
