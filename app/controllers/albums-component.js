/**
 * Created by Seva on 27.07.2016.
 */

angular.module('albums',[])

    .component('albums', {
        templateUrl: 'templates/albums.html',
        controller: ['$scope', 'facebookApiSvc',
            function albumsController($scope, $facebookApiSvc) {

                facebookApiSvc.refresh();

                $scope.section = 'view';

                facebookApiSvc.getName()
                .then(function(data) {
                    $scope.userName = data;
                });

                facebookApiSvc.getAlbums()
                    .then(function(data) {
                        $scope.albums = data;
                    });
            }]
    });
