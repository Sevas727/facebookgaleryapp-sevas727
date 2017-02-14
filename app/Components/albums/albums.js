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
            controller: function (facebookApiSvc) {

                let vm = this;
                    vm.section = 'view';

                getName();
                getAlbums();

                function getName() {
                    facebookApiSvc.getName()
                        .then(function (data) {
                            vm.userName = data;
                        });
                }

                function getAlbums() {
                    facebookApiSvc.getAlbums()
                        .then(function(data) {
                            vm.albums = data;
                        });
                }
            }
        });
})();

