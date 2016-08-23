/**
 * Created by Seva on 27.07.2016.
 */

angular.module('upload', [])
    .component('upload', {
        templateUrl: 'templates/upload.html',
        controller: ['facebookApiSvc', '$scope', '$facebook',
            function uploadController(facebookApiSvc, $scope) {

                facebookApiSvc.refresh();



                $scope.section = 'upload';
                $scope.currentAlbum = "";

                facebookApiSvc.getAlbumsID()
                    .then(function(data) {
                        $scope.albums = data;
                    });

                $scope.catchFile = function(file){

                }

                $scope.sendImg = facebookApiSvc.sendImg


            }]
    });
