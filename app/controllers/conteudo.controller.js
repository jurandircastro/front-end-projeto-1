'use strict';

angular.module('TVeManager')
  .controller('ConteudoController', ConteudoController);

function ConteudoController ($rootScope, $scope, ConteudoService, StorageService, Upload, ComunicacaoService) {

  $scope.submit = () =>{
      if ($scope.form.file.$valid && $scope.file) {
           $scope.upload($scope.file);
      }
  };

  $scope.upload = function (file) {
    let projetoAtual = StorageService.getItem('idProjeto');
    Upload.upload({
        url: 'http://tve-manager-backend.jelasticlw.com.br/file',
        data: {file: file, 'project_id': projetoAtual}
    }).then(function (resp) {
        setPathScreenPlay(resp.data);
    }, function (resp) {
        console.log('Error status: ' + resp.status);
    }, function (evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    });
  };

  $scope.roteiroAtual = (data) =>{
    let roteiro = JSON.stringify(data);

    StorageService.removeItem('roteiro');
    StorageService.setItem('roteiro', roteiro);

    StorageService.removeItem('roteiroName');
    StorageService.setItem('roteiroName', roteiro.name);

    StorageService.removeItem('idRoteiro');
    StorageService.setItem('idRoteiro', data._id);

  };

  $scope.novoRoteiro = () => {
    let projetoAtual = StorageService.getItem('idProjeto');
    let sendRoteiro = {
    	"project_id": projetoAtual,
        "screenplay_path": "",
        "screenplay_name": $scope.NovoRoteiro.name
    };
    ConteudoService.novoRoteiro(sendRoteiro).then((data) => {
        let topico = {
            "name": data.data.name,
            "file_id": data.data._id
        };
        ComunicacaoService.putTopico(topico).then((data) => {
            getRoteiros();
        });
    })
    .catch((err) => {
        $scope.errors = err.data;
    });
  }

  let setPathScreenPlay = (file) => {
    let roteiro = JSON.parse(StorageService.getItem('roteiro'));
    // let path = file.path.replace('app\\public\\', '')
    let path = file.path;
    if (path.includes('app/public/')){
        path = file.path.replace('app/public/', '');
    }else{
        path = file.path.replace('app\\public\\', '');
    }
    let updateRoteiro = {
      "screenplay_id":roteiro,
      "screenplay_path":path
    };
    ConteudoService.setPath(updateRoteiro).then((data) => {
        getRoteiros();
    })
    .catch((err) => {
        $scope.errors = err.data;
    });
  }

  let getRoteiros = () => {
    let projetoAtualId = StorageService.getItem('idProjeto');
    ConteudoService.getRoteiros(projetoAtualId).then((data) => {
        $scope.roteiros = data.data;
    })
    .catch((err) => {
        $scope.errors = err.data;
    });
  }

  $scope.deleteRoteiro = () => {
    let roteiroAtual = JSON.parse(StorageService.getItem('roteiro'));
    let sendRoteiro ={"name": roteiroAtual.name}
    ConteudoService.deleteRoteiro(sendRoteiro).then((data) => {
        getRoteiros();
    }).catch((err) => {
        $scope.errors = err.data;
    });
  }

  getRoteiros();
}
