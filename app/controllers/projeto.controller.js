'use strict';

angular.module('TVeManager')
  .controller('ProjetoController', ProjetoController);

function ProjetoController ($rootScope , $scope, StorageService, $state, ProjetoService) {

  let getProject = () => {
    $scope.usuarioAtual = JSON.parse(StorageService.getItem('user'));
    ProjetoService.getProjeto().then((data) => {
      $scope.projects = data.data;

      })
      .catch((err) => {
        $scope.errors = err.data;
     });
  }

  $scope.logout = () => {
    StorageService.removeItem('nome');
    StorageService.removeItem('token');
    StorageService.removeItem('fotoPerfil');
    StorageService.removeItem('id');
  }

  $scope.addProject = () => {
    let fuckFoto;
    console.log($scope.image_path);
    if($scope.image_path == null){
      fuckFoto = "http://tvestore.hospedagemdesites.ws/wp-content/uploads/2015/10/inf23.png";
    }else{
      fuckFoto = "data:" + $scope.image_path.filetype + ";base64," + $scope.image_path.base64;
    }
    let project = {
        "name": $scope.project.name,
        "producer_name": $scope.project.producer_name,
        "description": $scope.project.description,
        "start_date": $scope.project.start_date,
        "end_date": $scope.project.end_date,
        "adminId":StorageService.getItem('id'),
        "image_path": fuckFoto

        };
    ProjetoService.putProjeto(project).then((data) => {
      getProject();

      delete $scope.project;
      $scope.projetoForm.$setPristine();

    }).catch((err) => {
      $scope.errors = err.data;
    });
  }

  $scope.projetoAtual = (data) => {
    let project = JSON.stringify(data);
    StorageService.removeItem('project');
    StorageService.setItem('project', project);

    StorageService.removeItem('nomeProjeto');
    StorageService.setItem('nomeProjeto', data.name);

    StorageService.removeItem('idProjeto');
    StorageService.setItem('idProjeto', data._id);

    delete $scope.newProject;
    $scope.newProject = data;
  }

  $scope.atualizarFotoPerfil = () => {
    let fuckFoto = "data:" + $scope.fotoPerfilHome.filetype + ";base64," + $scope.fotoPerfilHome.base64;
    let usuario = { "user_id":  $scope.usuarioAtual._id, "image_path": fuckFoto };
    // delete $rootScope.usuarioAtualNav.image_path;
    // $rootScope.usuarioAtualNav.image_path = fuckFoto;
    delete $scope.usuarioAtual.image_path;
    $scope.usuarioAtual.image_path = fuckFoto;

    let user = JSON.parse(StorageService.getItem('user'));
    user.image_path = fuckFoto
    StorageService.setItem('user', JSON.stringify(user));

    ProjetoService.putUserImage(usuario).then((data) => {

    }).catch((err) => {
      $scope.errors = err.data;
    });
  }

  $scope.deleteProject = () => {
      let idProjeto = StorageService.getItem('idProjeto');

      let project ={"_id": idProjeto}

      ProjetoService.deleteProjeto(project).then((data) => {
        getProject();

    }).catch((err) => {
      $scope.errors = err.data;
    });

  }

  $scope.updateProject = () => {
    let projetoAlterado = $scope.newProject;
    let foto;

    if($scope.image_path == null){
      foto = $scope.newProject.image_path;
      console.log("null");
    }else{
      foto = "data:" + $scope.image_path.filetype + ";base64," + $scope.image_path.base64;
      console.log("alterou");
    }

    let newProject = {
    "project_id": StorageService.getItem('idProjeto'),
    "project_update":
      {
        "name": projetoAlterado.name,
        "producer_name": projetoAlterado.producer_name,
        "description": projetoAlterado.description,
        "start_date": projetoAlterado.start_date,
        "end_date": projetoAlterado.end_date,
        "image_path": foto
      }
    }
     ProjetoService.alterarProjeto(newProject).then((data) => {
        getProject();

      }).catch((err) => {
      $scope.errors = err.data;
    });
  }

  getProject();
}
