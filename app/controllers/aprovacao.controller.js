'use strict';

angular.module('TVeManager')
  .controller('AprovacaoController', AprovacaoController);


function AprovacaoController ($rootScope, $scope, AprovacaoService, StorageService, Upload) {

  $scope.submit = function() {
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
      console.log(resp.data);
        setPathAprovacao(resp.data);
    }, function (resp) {
        console.log('Error status: ' + resp.status);
    }, function (evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    });
  };

  $scope.aprovacaoAtual = (data) =>{

    let aprovacao = JSON.stringify(data);

    StorageService.removeItem('aprovacao');
    StorageService.setItem('aprovacao', aprovacao);

    StorageService.removeItem('aprovacaoName');
    StorageService.setItem('aprovacaoName', aprovacao.name);
  };


  $scope.novoAprovacao = () => {
    let projetoAtual = StorageService.getItem('idProjeto');
    let sendAprovacao =
    {
      "project_id": projetoAtual,
      "acceptance_path": "",
      "acceptance_name": $scope.NovoAprovacao.name
    };
    AprovacaoService.novoAprovacaoFile(sendAprovacao).then((data) => {
      getAprovacoes();
    })
    .catch((err) => {
        $scope.errors = err.data;
    });
  }

  $scope.deleteAprovacaoFiles = () => {
    let aprovacao = JSON.parse(StorageService.getItem('aprovacao'));
    console.log(aprovacao);
    let sendAprovacao =
    {
      "name": aprovacao.name,
    };
    AprovacaoService.deleteAprovacaoFiles(sendAprovacao).then((data) => {
        getAprovacoes();
    })
    .catch((err) => {
        $scope.errors = err.data;
    });
  }


  let setPathAprovacao = (file) => {
    let aprovacao = JSON.parse(StorageService.getItem('aprovacao'));
    // let path = file.path.replace('app\\public\\', '')
    let path = file.path;
    if (path.includes('app/public/')){
        path = file.path.replace('app/public/', '');
    }else{
        path = file.path.replace('app\\public\\', '');
    }
    let updateAprovacao = {
      "acceptance_id": aprovacao,
      "acceptance_path": path
    };
    AprovacaoService.setPath(updateAprovacao).then((data) => {
        getAprovacoes();
    })
    .catch((err) => {
        $scope.errors = err.data;
    });
  }

  let getAprovacoes = () => {
    let projetoAtualId = StorageService.getItem('idProjeto');
    AprovacaoService.getAprovacaoFiles(projetoAtualId).then((data) => {
        $scope.aprovacaos = data.data;
        console.log(data.data);
    })
    .catch((err) => {
        $scope.errors = err.data;
    });
  }
  getAprovacoes();
}
