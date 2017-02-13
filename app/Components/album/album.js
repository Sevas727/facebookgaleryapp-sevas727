import angular from "angular";
import uiRouter from 'angular-ui-router';

export default angular.module('album',[uiRouter])

    .config(($stateProvider) => {

            $stateProvider
                .state('album', {
                    url: '/album/{albumId}/{albumName}/',
                    template:  '<album/>',
                });
    })

    .component('album', {
        template: require('./album.html'),
        controllerAs: 'vm',
        controller: function($rootScope, facebookApiSvc, $stateParams) {

            let vm = this;
            
            $rootScope.section = 'view';
            vm.albumId = $stateParams.albumId;
            vm.albumName = $stateParams.albumName;
            vm.flagEndPhotoDownload = false;
            vm.photoLimit = 50;
            vm.offset = 50;

            vm = facebookApiSvc.getPhotos(vm);

            vm.scroll = function(elem){

                elem.height(document.documentElement.clientHeight - 210);
                elem[0].onscroll = function() {

                    var raw = elem[0];
                    var elemHeight = document.documentElement.clientHeight - 210;
                    elem.height(elemHeight);

                    if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight - 1) {

                        vm = facebookApiSvc.getPhotos(vm);
                    }
                }
            }
            vm.scroll($(".images--list"));
        }
    })
    .run(function($templateCache) {
        $templateCache.put("popover.html", require("../../templates/popover.html"));
    });
