
angular.module('TVeManager')
  .controller('NavbarController', NavbarController);

function NavbarController ($scope, StorageService, ProjetoService) {

    let getProject = () => {
        ProjetoService.getProjeto().then((data) => {
            $scope.projetos = data.data;

        })
        .catch((err) => {
            $scope.errors = err.data;
        });
    }

    getProject();
}
