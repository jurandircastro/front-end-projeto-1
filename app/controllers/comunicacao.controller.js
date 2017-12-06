'use strict';

angular.module('TVeManager')
  .controller('ComunicacaoController', ComunicacaoController);

function ComunicacaoController ($scope, StorageService, $state, ComunicacaoService) {

    let getTopico = () => {
        ComunicacaoService.getTopico().then((data) => {
            let allTopicos = data.data;
            ComunicacaoService.getGrupo().then((data) => {
                let usuarioAtual = JSON.parse(StorageService.getItem('user'));
                let arrayGrupos = data.data;
                let groupId = []
                arrayGrupos.forEach(function(group){
                 let user =  group.users.filter(function(user){
                        return user._id == usuarioAtual._id;
                   });
                    if (user.length > 0){
                        groupId.push(group.group._id);
                    }
                });
            })
            .catch((err) => {
            $scope.errors = err.data;
            });

        $scope.topicos = data.data;
        })
        .catch((err) => {
            $scope.errors = err.data;
        });
    }

    $scope.nomeProjeto = StorageService.getItem('nomeProjeto');

    $scope.hideChat;

    $scope.topicoAtual = (data) => {
        if (data != null){
          StorageService.removeItem('idTopico');
          StorageService.setItem('idTopico', data._id);
          StorageService.removeItem('nameTopico');
          StorageService.setItem('nameTopico', data.name);
          $scope.nameTopico = StorageService.getItem('nameTopico');
          $scope.hideChat = true;

          getMensagem();
        }
    }

    $scope.addMensagem = (data) =>{
        let usuario = JSON.parse(StorageService.getItem('user'));
        let idTopico = StorageService.getItem('idTopico');
        let mensagem = {
            "text": $scope.mensagem,
            "user_id":usuario._id,
            "communication_id": idTopico,
            "date": dataAtualizada
        };
        console.log(mensagem);
        if($scope.mensagem){
            ComunicacaoService.putMensagem(mensagem).then((data) => {
              console.log(data);
                $scope.mensagem = null;
                getMensagem();
            });
        }
    }

    $scope.addTopico = () => {
        getGrupo();
        let topico = {
            "name":$scope.communication.name,
            "project_id":StorageService.getItem('idProjeto')
        }

        ComunicacaoService.putTopico(topico).then((data) => {

            selectGrupo.forEach(function(grupo){
                let enviarGrupo = {
                    "communication_id":data.data._id,
                    "group_id": grupo.group.id
                };

                addGrupo(enviarGrupo);

               });

            getTopico();
            delete $scope.communication;
            $scope.contatoForm.$setPristine();
          }).catch((err) => {
             $scope.errors = err.data;
      });
    }

    let getMensagem = () =>{
        let id = StorageService.getItem('idTopico');
        ComunicacaoService.getMensagem(id).then((data) => {
            $scope.mensagens = data.data;
            console.log($scope.mensagens);
            $('#campoMensagem').val('');
        })
        .catch((err) => {
            $scope.errors = err.data;
        });
    }

    let getGrupo = () => {
        ComunicacaoService.getGrupo().then((data) => {
            let arrayGrupos = data.data;
            let arrayGruposListar = [];

            for (var i = 0; i < arrayGrupos.length; i++) {
                arrayGruposListar.push(arrayGrupos[i]);
            }
            $scope.grupos = arrayGruposListar;
        })
        .catch((err) => {
        $scope.errors = err.data;
        });
    }

    let addGrupo = (grupo) =>{
      ComunicacaoService.putGrupo(grupo).then((data) => {
            selectGrupo = [];
            getTopico();
        });
    }

    let selectGrupo = [];

    $scope.getSelect = (data) =>{
        selectGrupo.push(data);
        let allGrupos = $scope.grupos;
        delete $scope.grupos;
        let grupos =  allGrupos.filter(function(grupo){
            return grupo != data;
        });
        $scope.grupos = grupos;
    }

    $scope.adicionarGrupos = () =>{

        $scope.grupos.forEach(function(grupo){
            let newGrupo = grupo;
            selectGrupo.push(newGrupo);
        });
        delete $scope.grupos;
    }

    let dataAtualizada;

    $scope.dataAtual = () => {
        let data = new Date();

        let dia = data.getDate();

        let mes = data.getMonth() + 1;
        if (mes < 10) {
           mes = "0" + mes;
       }
       let ano = data.getFullYear();
       let horas = new Date().getHours();
       if (horas < 10) {
           horas = "0" + horas;
       }
       let minutos = new Date().getMinutes();
       if (minutos < 10) {
           minutos = "0" + minutos;
       }
       let result = dia+"/"+mes+"/"+ano+" - "+horas + "h" + minutos;

       dataAtualizada = result;
    }

    getGrupo();
    getTopico();
}
