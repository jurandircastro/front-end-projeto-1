'use strict';
angular.module('TVeManager')
  .controller('JuridicoCPBController', JuridicoCPBController);

function JuridicoCPBController ($scope, StorageService, JuridicoService, Upload) {

  $scope.addTopico = () => {
    let idProjeto = StorageService.getItem('idProjeto');
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

  let getTopico = () => {
    let idProjeto = StorageService.getItem('idProjeto');
    JuridicoService.getTopico(idProjeto).then((data) => {
        $scope.topicos = data.data;
    })
    .catch((err) => {
        $scope.errors = err.data;
    });
  }

  let getCPB_CRT = () => {
    let idProjeto = StorageService.getItem('idProjeto');
    JuridicoService.getCPBeCRT(idProjeto).then((data) => {
        $scope.cpb_crt = data.data;
        console.log(data.data);
    })
    .catch((err) => {
        $scope.errors = err.data;
    });
  }

  $scope.addCPBeCRT = () => {
    let juridico = {
        "name": $scope.juridico.name,
        "cpb": $scope.juridico.cpb,
        "crt": $scope.juridico.crt,
        "project_id": StorageService.getItem('idProjeto'),
        "validity": $scope.juridico.validity
      }
    JuridicoService.novoCPBeCRT(juridico).then((data) => {
        console.log(data);
        getCPB_CRT();
        })
        .catch((err) => {
            $scope.errors = err.data;
      });
  };
  getCPB_CRT();
  getTopico();
}
