'use strict';

angular.module('TVeManager')
  .controller('GrupoController', GrupoController);

function GrupoController ($rootScope ,$scope, StorageService, $state, GrupoService) {
  
    let idProjeto = StorageService.getItem('idProjeto');

    let getGrupo = () => {
        GrupoService.getGrupo(idProjeto).then((data) => {
            $scope.grupos = data.data;
      })
        .catch((err) => {
        $scope.errors = err.data;
        });
    };

    let usuariosSelecionados = [];

    $scope.grupoAtual = (grupo) => {
            StorageService.removeItem('idGrupo');
            StorageService.setItem('idGrupo', grupo.group.id);
    }

    let getUsuario = () => {
        GrupoService.getUsuario().then((data) => {
            let usuarioAtual = JSON.parse(StorageService.getItem('user'));
            let arrayUsuarios = data.data;
            let arrayUsuariosListar = [];
            for (var i = 0; i < arrayUsuarios.length; i++) {
                if(arrayUsuarios[i]._id != usuarioAtual._id){
                    arrayUsuariosListar.push(arrayUsuarios[i]);
                }
            }
           $scope.usuarios = arrayUsuariosListar;
        })
        .catch((err) => {
        $scope.errors = err.data;
        });
    };

    $scope.getSelect = (data) => {
        usuariosSelecionados.push(data); 
        let allUsers = $scope.usuarios;
        delete $scope.usuarios;
        let users =  allUsers.filter(function(user){
            return user != data;
        }); 
        $scope.usuarios = users;   
    }

    $scope.excluiGrupo = () => {
      let idGrupo = StorageService.getItem('idGrupo');  
      let json = {
        "group_id": idGrupo
      }
      GrupoService.deleteGrupo(json).then((data) => {
          getGrupo();
      })
      .catch((err) => {
        $scope.errors = err.data;
      });
    }

    $scope.addGrupo = () => {
        let new_grupo = $scope.grupo;
        let admin = JSON.parse(StorageService.getItem('user'));
        let projectId = StorageService.getItem('idProjeto');
       let grupo = {
            name: new_grupo.name,
            admin_id: admin._id,
            project_id: projectId,
            users_ids:[]
        }
        GrupoService.putGrupo(grupo).then((data) => {
              let grupoSalvo = data.data;
              usuariosSelecionados.forEach(function(usuario){
                let enviarUsuario = {
                   "user_id":usuario._id,
                   "group_id":grupoSalvo._id
                };
                addUsuarioGrupo(enviarUsuario);
                $('#campoNome').val('');
                getUsuario();
               });  
            }).catch((err) => {
             $scope.errors = err.data;
        });
    }

    let addUsuarioGrupo = (usuario) =>{
      GrupoService.putUsuario(usuario).then((data) => {
          usuariosSelecionados = [];
          getGrupo();
      });
    }

    getGrupo();
    getUsuario();
}