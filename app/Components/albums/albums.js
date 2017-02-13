/**
 * Created by User on 07.02.2017.
 */

export default (function() {
    return angular.module('albums',[])

        .config(($stateProvider) => {
            $stateProvider
                .state('albums', {
                    url: '/albums',
                    template:  '<albums/>',
                });
        })

        .component('albums', {
            template: require('./albums.html'),
            controllerAs: 'vm',
            controller: function ($rootScope, facebookApiSvc) {

                let vm = this;

                $rootScope.section = 'view';

                facebookApiSvc.getName()
                    .then(function(data) {
                        vm.userName = data;
                    });
                facebookApiSvc.getAlbums()
                    .then(function(data) {
                        vm.albums = data;
                    });
            }
        });
})();

