/**
 * Created by User on 07.02.2017.
 */

export default (function() {
    return angular.module('menu', [])
        .component('menu', {
            template: require("./menu.html"),
            controllerAs: 'vm',
            bindings: {
                section: '<'
            },
            controller: function(facebookApiSvc){

                let vm = this;
                vm.logout = facebookApiSvc.logout;
            }
        });
})();
