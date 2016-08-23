/**
 * Created by Seva on 27.07.2016.
 */

angular.module('album', [])
    .component('album', {
        templateUrl: 'templates/album.html',
        controller: ['$scope', '$routeParams', 'facebookApiSvc',
            function albumsController($scope, $routeParams, $facebookApiSvc) {

                facebookApiSvc.refresh();

                $scope.section = 'view';
                $scope.albumId = $routeParams.albumId;
                $scope.albumName = $routeParams.albumName;
                $scope.flagEndPhotoDownload = false;
                $scope.photoLimit = 50;
                $scope.offset = 50;

                $scope = facebookApiSvc.getPhotos($scope);

                $scope.scroll = function(elem){

                    elem.height(document.documentElement.clientHeight - 210);
                    elem[0].onscroll = function() {

                        var raw = elem[0];
                        var elemHeight = document.documentElement.clientHeight - 210;
                        elem.height(elemHeight);

                        if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight - 1) {

                            $scope = facebookApiSvc.getPhotos($scope);

                        }
                    }
                }

                $scope.scroll($(".images--list"));


            }]
    });
