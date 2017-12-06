'use strict';

angular.module('TVeManager')
  .controller('ConteudoAudioController', ConteudoAudioController);


function ConteudoAudioController ($rootScope, $scope, ConteudoAudioService, StorageService, Upload, ComunicacaoService) {

  $scope.submit = function() {
      if ($scope.form.file.$valid && $scope.file) {
        console.log($scope.file);
        $scope.upload($scope.file);
      }
  };

  $scope.upload = function (file) {
    let projetoAtual = StorageService.getItem('idProjeto');
    Upload.upload({
        url: 'http://tve-manager-backend.jelasticlw.com.br/file',
        data: {file: file, 'project_id': projetoAtual}
    }).then(function (resp) {
      console.log(resp.data);
        setPathAudio(resp.data);
    }, function (resp) {
        console.log('Error status: ' + resp.status);
    }, function (evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    });
  };

  $scope.audioAtual = (data) =>{

    let audio = JSON.stringify(data);

    StorageService.removeItem('audio');
    StorageService.setItem('audio', audio);

    StorageService.removeItem('audioName');
    StorageService.setItem('audioName', audio.name);

    StorageService.removeItem('idAudio');
    StorageService.setItem('idAudio', data._id);
  };

  $scope.novoAudio = () => {
    let projetoAtual = StorageService.getItem('idProjeto');
    let sendAudio ={
    	"project_id": projetoAtual,
      "audio_path": "",
      "audio_name": $scope.NovoAudio.name
    };
    ConteudoAudioService.novoAudio(sendAudio).then((data) => {
      
          let topico = {
            "name": data.data.name,
            "file_id": data.data._id
          };
          ComunicacaoService.putTopico(topico).then((data) => {
            getAudios();
        });
    })
    .catch((err) => {
        $scope.errors = err.data;
    });
  }

  let setPathAudio = (file) => {
    let audio = JSON.parse(StorageService.getItem('audio'));
    // let path = file.path.replace('app\\public\\', '')
    let path = file.path;
    if (path.includes('app/public/')){
        path = file.path.replace('app/public/', '');
    }else{
        path = file.path.replace('app\\public\\', '');
    }
    let updateAudio = {
      "audio_id":audio,
      "audio_path":path
    };
    console.log(updateAudio);
    ConteudoAudioService.setPath(updateAudio).then((data) => {
      console.log(data);
        getAudios();
    })
    .catch((err) => {
        $scope.errors = err.data;
    });
  }


  let getAudios = () => {
    let projetoAtualId = StorageService.getItem('idProjeto');
    ConteudoAudioService.getAudios(projetoAtualId).then((data) => {
        $scope.audios = data.data;
    })
    .catch((err) => {
        $scope.errors = err.data;
    });
  }

  $scope.deleteAudio = () => {
    let audioAtual = JSON.parse(StorageService.getItem('audio'));
    let sendAudio ={ "name": audioAtual.name}
    ConteudoAudioService.deleteAudio(sendAudio).then((data) => {
        getAudios();
    }).catch((err) => {
        $scope.errors = err.data;
    });
  }

  getAudios();
}
