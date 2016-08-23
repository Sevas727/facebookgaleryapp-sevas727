/**
 * Created by Seva on 27.07.2016.
 */

// Register `album` component, along with its associated controller and template

angular.module('photo',[])
    .component('photo', {
        templateUrl: 'templates/photo.html',
        controller: ['$scope', '$routeParams', 'facebookApiSvc',
            function photoController($scope, $routeParams, $facebookApiSvc) {

                facebookApiSvc.refresh();

                $scope.section = 'view';
                $scope.albumId = $routeParams.albumId;
                $scope.albumName = $routeParams.albumName;
                $scope.imgId = $routeParams.imgId;
                $scope.imgCreatedTime = $routeParams.imgCreatedTime;
                $scope.imgName;

                $scope.closestResolution = function(imagesArr){

                    if(imagesArr.length == 0) return;

                    var closestLeft,
                        closestRight,
                        number = window.innerWidth,
                        current;

                    for (var i = 0; i < imagesArr.length; i++) {
                        current = imagesArr[i].width;
                        if (imagesArr[i].width < number && (typeof closestLeft === 'undefined' || closestLeft.width < imagesArr[i].width)) {
                            closestLeft = imagesArr[i];
                        } else if (imagesArr[i].width > number && (typeof closestRight === 'undefined' || closestRight.width > imagesArr[i].width)) {
                            closestRight = imagesArr[i];
                        }
                    }

                    return closestLeft.source;

                }

                facebookApiSvc.getImage($scope.imgId)
                    .then(function (response) {
                        $scope.imgName = response.name;
                         $scope.images = response.images;
                        $scope.imgSrc = $scope.closestResolution($scope.images);
                        })

            }]
    });
