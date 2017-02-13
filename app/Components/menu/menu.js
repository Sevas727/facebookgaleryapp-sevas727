/**
 * Created by User on 07.02.2017.
 */

export default (function() {
    return angular.module('menu', [])
        .component('menu', {
            template: require("./menu.html"),
            controllerAs: 'vm',
            controller: function($rootScope, facebookApiSvc){
                this.section = $rootScope.section;
                this.logout = facebookApiSvc.logout;

            }
        });
})();
