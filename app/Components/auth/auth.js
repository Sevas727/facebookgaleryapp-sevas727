/**
 * Created by User on 07.02.2017.
 */

export default (function() {
    return angular.module('auth', [])

        .config(($stateProvider) => {

            $stateProvider
                .state('auth', {
                    url: '/auth',
                    template:  '<auth></auth>',
                });
        })

        .component('auth', {
            template: require("./auth.html"),
            controllerAs: 'vm',
            controller: function(facebookApiSvc){

                this.login = facebookApiSvc.login;

            },
            /*bindings: {
             count: '='
             }*/
        });
})();
