/**
 * Created by User on 09.02.2017.
 */
import angular from "angular";
import uiRouter from 'angular-ui-router';

export default angular.module('photo',[uiRouter])

    .config(($stateProvider) => {

        $stateProvider
            .state('photo', {
                url: '/photo/{imgId}/{imgCreatedTime}/{albumName}/{albumId}/',
                template:  '<photo/>',
            });
    })

    .component('photo', {
        template: require('./photo.html'),
        controllerAs: 'vm',
        controller: function($stateParams, facebookApiSvc) {

            let vm = this;

            vm.section = 'view';
            vm.albumId = $stateParams.albumId;
            vm.albumName = $stateParams.albumName;
            vm.imgId = $stateParams.imgId;
            vm.imgCreatedTime = $stateParams.imgCreatedTime;
            vm.imgName;

            vm.closestResolution = function(imagesArr){

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

            facebookApiSvc.getImage(vm.imgId)
                .then((response) => {
                    vm.imgName = response.name;
                    vm.images = response.images;
                    vm.imgSrc = vm.closestResolution(vm.images);
                })

        }
    })