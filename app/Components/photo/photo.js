/**
 * Created by User on 09.02.2017.
 */

export default (function() {
    return angular.module('photo',[])

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
                vm.imgName, vm.images, vm.imgSrc;
                vm.section = 'view';
                vm.albumId = $stateParams.albumId;
                vm.albumName = $stateParams.albumName;
                vm.imgId = $stateParams.imgId;
                vm.imgCreatedTime = $stateParams.imgCreatedTime;
                vm.closestResolution = closestResolution;

                getImage();

                function getImage() {
                    facebookApiSvc.getImage(vm.imgId)
                        .then((response) => {
                            vm.imgName = response.name;
                            vm.images = response.images;
                            vm.imgSrc = vm.closestResolution(vm.images);
                        })
                }

                
                function closestResolution(imagesArr) {

                    if (imagesArr.length == 0) return;

                    let closestLeft,
                        closestRight,
                        number = window.innerWidth,
                        current;

                    for (let i = 0; i < imagesArr.length; i++) {
                        current = imagesArr[i].width;
                        if (imagesArr[i].width < number && (typeof closestLeft === 'undefined' || closestLeft.width < imagesArr[i].width)) {
                            closestLeft = imagesArr[i];
                        } else if (imagesArr[i].width > number && (typeof closestRight === 'undefined' || closestRight.width > imagesArr[i].width)) {
                            closestRight = imagesArr[i];
                        }
                    }
                    return closestLeft.source;
                }
            }
        })
})();