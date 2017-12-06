'use strict';

angular.module('TVeManager')
  .controller('ConteudoVideoChatController', ConteudoVideoChatController);


function ConteudoVideoChatController ($scope, StorageService, $sce, ComunicacaoService) {

    let video = JSON.parse(StorageService.getItem('video'));
    $scope.config = {
      preload: "none",
      sources: [
          {src: $sce.trustAsResourceUrl("http://tve-manager-backend.jelasticlw.com.br/" + video.path), type: "video/mp4"},
      ],
      theme: {
          url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
      }
  };

    let getTopico = () => {
        ComunicacaoService.getTopicoFile(video._id).then((data) => {
            StorageService.removeItem('idTopicoVideo');
            StorageService.setItem('idTopicoVideo', data.data._id);
            getMensagem();
        })
        .catch((err) => {
            $scope.errors = err.data;
        });
  }

  $scope.addMensagem = (data) =>{
    let usuario = JSON.parse(StorageService.getItem('user'));
    let idTopico = StorageService.getItem('idTopicoVideo');
    let mensagem = {
        "text":$scope.mensagem ,
        "user_id":usuario._id,
        "communication_id": idTopico
    };
    console.log(mensagem);
    ComunicacaoService.putMensagem(mensagem).then((data) => {
        console.log(data);
        getMensagem();
    });
  }

  let getMensagem = () =>{
    let idTopico = StorageService.getItem('idTopicoVideo');
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
