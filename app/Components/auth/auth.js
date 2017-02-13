/**
 * Created by User on 07.02.2017.
 */
import angular from "angular";
import uiRouter from 'angular-ui-router';

export default angular.module('auth', [uiRouter])

    .config(($stateProvider, $urlRouterProvider) => {
        
        //$urlRouterProvider.otherwise('/');

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
