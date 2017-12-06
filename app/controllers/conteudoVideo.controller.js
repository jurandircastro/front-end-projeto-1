'use strict';

angular.module('TVeManager')
  .controller('ConteudoVideoController', ConteudoVideoController);


function ConteudoVideoController ($rootScope, $scope, ConteudoVideoService, StorageService, Upload, ComunicacaoService) {

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
        setPathVideo(resp.data);
    }, function (resp) {
        console.log('Error status: ' + resp.status);
    }, function (evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    });
  };

  $scope.videoAtual = (data) =>{

    let video = JSON.stringify(data);

    StorageService.removeItem('video');
    StorageService.setItem('video', video);

    StorageService.removeItem('videoName');
    StorageService.setItem('videoName', video.name);

    StorageService.removeItem('idVideo');
    StorageService.setItem('idVideo', data._id);
  };

  $scope.novoVideo = () => {
    let projetoAtual = StorageService.getItem('idProjeto');
    let sendVideo ={
    	"project_id": projetoAtual,
      "video_path": "",
      "video_name": $scope.NovoVideo.name
    };

    ConteudoVideoService.novoVideo(sendVideo).then((data) => {
      let topico = {
            "name": data.data.name,
            "file_id": data.data._id
        };
        ComunicacaoService.putTopico(topico).then((data) => {
            getVideos();
        });
    })
    .catch((err) => {
        $scope.errors = err.data;
    });
  }

  let setPathVideo = (file) => {
    let video = JSON.parse(StorageService.getItem('video'));
    // let path = file.path.replace('app\\public\\', '')
    let path = file.path;
    if (path.includes('app/public/')){
        path = file.path.replace('app/public/', '');
    }else{
        path = file.path.replace('app\\public\\', '');
    }
    let updateVideo = {
      "video_id": video,
      "video_path": path
    };
    ConteudoVideoService.setPath(updateVideo).then((data) => {
        getVideos();
    })
    .catch((err) => {
        $scope.errors = err.data;
    });
  }

  let getVideos = () => {
    let projetoAtualId = StorageService.getItem('idProjeto');
    ConteudoVideoService.getVideos(projetoAtualId).then((data) => {
        $scope.videos = data.data;
        console.log(data.data);
    })
    .catch((err) => {
        $scope.errors = err.data;
    });
  }

  $scope.deleteVideo = () => {
    let videoAtual = JSON.parse(StorageService.getItem('video'));
    let sendVideo ={"name": videoAtual.name}
    console.log(sendVideo);
    ConteudoVideoService.deleteVideo(sendVideo).then((data) => {
        console.log(data);
        getVideos();

    }).catch((err) => {
        $scope.errors = err.data;
    });
  }

  getVideos();
}
