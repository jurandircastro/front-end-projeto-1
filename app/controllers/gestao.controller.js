'use strict';

angular.module('TVeManager')
  .controller('GestaoController', GestaoController);

function GestaoController ($rootScope ,$scope, StorageService, Gantt, $state, GestaoService) {

    let gantt = [];

    $scope.booleanGrupo;

    $scope.clickItem = false;

    $scope.addGestao = () => {
        let gestao = {
            "name": $scope.gestao.name,
            "project_id": StorageService.getItem('idProjeto')
        }
        GestaoService.putGestao(gestao).then((data) => {
            getGestao();
            listarCalendario();
            delete $scope.gestao.name;
            $scope.gestaoForm.$setPristine();

        }).catch((err) => {

        });
    }

    $scope.cancelarAddGestao = () =>{
      delete $scope.gestao.name;
      $scope.gestaoForm.$setPristine();
    }

    let getGestao = () => {
        GestaoService.getGestao().then((data) => {
            $scope.gestaos = data.data;
            console.log(data.data);
      })
        .catch((err) => {
        $scope.errors = err.data;
        });
    };

    $scope.addItem = () => {
       let item = {
            "name": $scope.item.name,
            "management_id": StorageService.getItem('idGestao'),
            "start_date": $scope.item.start_date,
            "end_date": $scope.item.end_date,
            "project_id": StorageService.getItem('idProjeto')
        }
        GestaoService.putItem(item).then((data) => {
            getGestao();
            listarCalendario();
            delete $scope.item;
            $scope.itemForm.$setPristine();

        }).catch((err) => {

        });
    }

    $scope.cancelarAddItem = () =>{
      delete $scope.item;
      $scope.itemForm.$setPristine();
    }

    $scope.addAtividade = () => {
        let atividade = {
            "name": $scope.atividade.name,
            "item_id": StorageService.getItem('idItem'),
            "start_day": $scope.atividade.start_date,
            "end_day": $scope.atividade.end_date
        }
        GestaoService.putAtividade(atividade).then((data) => {
            let grupo = {
                "group_id": StorageService.getItem('idGrupoAtividade'),
                "activity_id": data.data._id
            }
            if(grupo.group_id){
            GestaoService.putGrupoAtividade(grupo).then((data) => {
                getAtividade();
                $scope.booleanGrupo = false;
            });
            }
            delete $scope.atividade;
            $scope.atividadeForm.$setPristine();
        }).catch((err) => {

        });
    }

    $scope.cancelarAddAtividade = () =>{
      delete $scope.atividade;
      $scope.atividadeForm.$setPristine();
    }

    let getItem = () => {
        GestaoService.getItem().then((data) => {
            $scope.itens = data.data;
      })
        .catch((err) => {
        $scope.errors = err.data;
        });
    };

    $scope.gestaoAtual = (gestao) => {
        StorageService.removeItem('idGestao');
        StorageService.setItem('idGestao', gestao.management._id);
    }

    $scope.itemAtual = (item) => {
        if($scope.clickItem === false){
            $scope.clickItem = true;
        }else{
            $scope.clickItem = false
        }
        StorageService.removeItem('idItem');
        StorageService.setItem('idItem', item._id);
        getAtividade();

    }

    $scope.grupoSelect = (data) => {
        StorageService.removeItem('idGrupoAtividade');
        StorageService.setItem('idGrupoAtividade', data.group.id);
        $scope.booleanGrupo = true;
    }

    let getAtividade = () => {
        GestaoService.getAtividade().then((data) => {
            $scope.atividades = data.data;
      })
        .catch((err) => {
        $scope.errors = err.data;
        });
    }

    let getGrupo = () => {
        GestaoService.getGrupo().then((data) => {
            $scope.grupos = data.data;
        })
        .catch((err) => {
        $scope.errors = err.data;
        });
    }

    let listarCalendario = () => {
        GestaoService.getAllItem().then((data) => {
            let itens = data.data;

        gantt = [];

        for(var i = 0; i < itens.length; i++){
            gantt.push({name: itens[i].name, height: '3em', sortable: false, classes: 'gantt-row-milestone', color: 'white', tasks: [], data: 'Can contain any custom data or object', idItem: itens[i]._id});
        }

         for(var i = 0; i < itens.length; i++){
             for(var j = 0; j < gantt.length; j++){
                 if(gantt[j].idItem == itens[i]._id){
                    gantt[j].tasks.push( {name: itens[i].name, color: itens[i].percentage, from: itens[i].start_date, to: itens[i].end_date, data: 'Can contain any custom data or object'});
                 }
            }
        }
        console.log('NEGAS ',gantt);
          $scope.data = gantt;
        })
        .catch((err) => {
            $scope.errors = err.data;
        });
    }


    $scope.atividadeFinalizada = (atividade) => {
        let atividadeFinalizada;
        let nAtividade = $scope.atividades.length;
        let atividadeConcluida = 0;
        let porcentagem;

        if(atividade.activity.done){
            atividadeFinalizada = false;
        }else{
            atividadeFinalizada = true;
        }
        let updateAtividade = {
            "activity_id": atividade.activity._id,
            "done": atividadeFinalizada
            }
        GestaoService.putAtividadeFinalizada(updateAtividade).then((data) => {
            GestaoService.getAtividade().then((data) => {
                $scope.atividades = data.data;
                for(var i = 0; i < $scope.atividades.length; i++){
                    if($scope.atividades[i].activity.done){
                        atividadeConcluida++;
                    }
                }
                porcentagem = atividadeConcluida * 100 / nAtividade;
                corAtividade(porcentagem);

            })
            .catch((err) => {
            $scope.errors = err.data;
           });
        });
    }

    let corAtividade = (porcentagem) => {
        let cor;
        if(porcentagem < 35){
            cor = "red";
        }else if(porcentagem > 35 && porcentagem < 75){
            cor = "yellow";
        }else{
            cor = "green";
        }
        let updateItem= {
            "id": StorageService.getItem('idItem'),
            "percentage": cor
        }
        GestaoService.putCorItens(updateItem).then((data) => {
            getGestao();
            listarCalendario();
        }).catch((err) => {

        });
    }

    listarCalendario();
    getGrupo();
    getGestao();
    getItem();

}
