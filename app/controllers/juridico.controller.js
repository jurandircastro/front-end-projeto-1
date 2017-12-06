'use strict';
angular.module('TVeManager')
  .controller('JuridicoController', JuridicoController);

function JuridicoController ($scope, StorageService, JuridicoService, Upload) {

  let idProjeto = StorageService.getItem('idProjeto');

  $scope.juridicoCheck = false;

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
        setPathJuridico(resp.data);
        console.log(resp.data);
    }, function (resp) {
        console.log('Error status: ' + resp.status);
    }, function (evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    });
  };

  $scope.addTopico = () => {
    let topico = {
      "name": $scope.topicoJuridico.name,
      "project_id": idProjeto
    }
    JuridicoService.novoTopico(topico).then((data) => {
        getTopico();
    })
    .catch((err) => {
        $scope.errors = err.data;
    });
  };

  $scope.getJuridicoAtual = (data) => {
    let juridico = JSON.stringify(data);

    StorageService.removeItem('juridico');
    StorageService.setItem('juridico', juridico);

    StorageService.removeItem('juridicoName');
    StorageService.setItem('juridicoName', juridico.name);
  };


  $scope.topicoAtual = (data) => {
      if (data != null){
        StorageService.removeItem('idTopicoJuridico');
        StorageService.setItem('idTopicoJuridico', data._id);
        $scope.hideJuridico = true;
      }
      getJuridico();
  }

  let getTopico = () => {
      JuridicoService.getTopico(idProjeto).then((data) => {
            $scope.topicos = data.data;
        })
        .catch((err) => {
            $scope.errors = err.data;
        });
  }

  $scope.addJuridico = () => {
    console.log('opa');
    let idTopico = StorageService.getItem('idTopicoJuridico');
    let juridico = {
        "name": $scope.juridico.name,
        "topic_id": idTopico,
        "file_path": "",
        "type": $scope.juridico.type,
        "observations": $scope.juridico.observations
    }
    JuridicoService.novoJuridico(juridico).then((data) => {
      getJuridico();
    })
    .catch((err) => {
        $scope.errors = err.data;
    });
  };

  let setPathJuridico = (file) => {
    let juridico = JSON.parse(StorageService.getItem('juridico'));
    // let path = file.path.replace('app\\public\\', '')
    let path = file.path;
    if (path.includes('app/public/')){
        path = file.path.replace('app/public/', '');
    }else{
        path = file.path.replace('app\\public\\', '');
    }
    let updateJuridical = {
      "juridical_id": juridico,
      "juridical_path": path
    };
    JuridicoService.setPath(updateJuridical).then((data) => {
      console.log('negas 2', data);
        getJuridico();
    })
    .catch((err) => {
        $scope.errors = err.data;
    });
  }

  let getJuridico = () => {
    let idTopicoJuridico = StorageService.getItem('idTopicoJuridico');
    JuridicoService.getJuridico(idTopicoJuridico).then((data) => {
          $scope.juridicos = data.data;
          console.log(data.data);
      })
      .catch((err) => {
          $scope.errors = err.data;
      });
  }

  $scope.addAlarme = () => {
    let idJuridico = StorageService.getItem('idJuridico');
    let alarme = {
      "juridical_id": idJuridico,
      "alarm": {"data": $scope.alarm.data, "horary": $scope.alarm.horary}
    }
    JuridicoService.novoAlarme(alarme).then((data) => {
      getJuridico();
    })
    .catch((err) => {
        $scope.errors = err.data;
    });
  }

  $scope.juridicoAtual = (data) => {
    
    if (data != null){
      StorageService.removeItem('idJuridico');
      StorageService.setItem('idJuridico', data._id);
    }
    $scope.hideJuridico = true;
    getJuridico();
  }

  $scope.click = () => {
    if($scope.juridicoCheck){
        $scope.juridicoCheck = false;
    }else{
        $scope.juridicoCheck = true;
      }
  }

  getTopico();
}
