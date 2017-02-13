/**
 * Created by User on 07.02.2017.
 */
import angular from "angular";
import uiRouter from 'angular-ui-router';

export default angular.module('menu', [uiRouter])
    .component('menu', {
            template: require("./menu.html"),
            controllerAs: 'vm',
            controller: function($rootScope, facebookApiSvc){
                this.section = $rootScope.section;
                this.logout = facebookApiSvc.logout;

            }
    });
