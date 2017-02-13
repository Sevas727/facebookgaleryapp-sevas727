/**
 * Created by User on 07.02.2017.
 */

import angular from "angular";

export default angular.module('facebookApiSvc', [])

.service('facebookApiSvc', function($facebook, $location) {

    this.isAuth = false;

        this.login = () => {
            const self = this;
            $facebook.login()
                .then(function(response) {
                    if(response.status == "connected"){
                        self.isAuth = true;
                        $location.path("/albums");
                        sessionStorage.setItem('access_token', response.authResponse.accessToken);
                    }
                });

        },

        this.logout = () => {
            const self = this;
            $facebook.logout()
                .then(function(response) {
                        self.isAuth = false;
                        $location.path("/auth");
                        sessionStorage.setItem('access_token', "");
                });
        },

        this.check = function() {
            if(this.isAuth == true){
                return true;
            } else {
                return false
            };

            $facebook.getLoginStatus()
                .then((response)=>{
                    return response;
                    if(response.status == "connected"){
                        return true;
                    }
                    return false;
                });

        },

        this.refresh = function() {
            $facebook.api("/me").then(
                function(response) {
                },
                function(err) {
                    $location.path("/");
                });
        },

        this.getPhotos = function ($scope) {

            if ($scope.flagEndPhotoDownload) return;

            $scope.flagEndPhotoDownload = true;

            if(!$scope.images){

                $facebook.api($scope.albumId + '/photos/?fields=images,id,name,created_time&order=reverse_chronological&limit='+$scope.photoLimit)

                    .then(function (response) {
                        $scope.images = response.data;
                    })
            } else {

                $facebook.api($scope.albumId + '/photos/?fields=images,id,name,created_time&order=reverse_chronological&limit='+$scope.photoLimit+'&offset='+ $scope.offset)
                    .then(function (response) {

                        var newImages = response.data;
                        $scope.images = $scope.images.concat(newImages);
                        $scope.offset += newImages.length;

                    })
            }

            $scope.flagEndPhotoDownload = false;

            return $scope;

        },

        this.getName = function () {
            return $facebook.api('/me')
                .then(function (response) {
                    return response.name;
                });
        },


        this.getAlbums = function () {
            return $facebook.api('/me/albums?fields=picture,name,count,created_time,updated_time')
                .then(function (response) {
                    return response.data;
                });
        },
        this.getAlbumsID = function () {
            return $facebook.api('me/albums')
                .then(function (response) {
                    return response.data;
                });
        },

        this.getImage = function(imgId){

            return $facebook.api('/' + imgId + '/?fields=images,name')
                .then(function (response) {
                    return response;
                })
        }
});
